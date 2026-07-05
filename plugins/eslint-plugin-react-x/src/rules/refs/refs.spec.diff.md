# refs IMPL–SPEC Diff Report

**IMPL**: `refs.ts` + `lib.ts` (ESLint rule)\
**SPEC**: `refs.spec.md` (React Compiler `ValidateNoRefAccessInRender`)

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's HIR. It uses `computeUnconditionalBlocks` (post-dominator analysis) to determine which blocks always execute during render. It tracks ref accesses through `LoadLocal`/`StoreLocal` instruction propagation and has special handling for lazy initialization patterns.

The IMPL operates on the ESLint AST. It tracks `ref.current` MemberExpression accesses and identifies whether they are reads or writes. It uses parent-node traversal to detect if an access is inside a lazy-init null-check block or a nested function (effect/callback).

**Verdict**: The SPEC uses compiler-level control-flow analysis. The IMPL uses syntactic parent-node checks and naming conventions.

---

## 2. What Constitutes a "Ref"

| Source Category                                    | SPEC                                                 | IMPL                                                     |
| -------------------------------------------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| `useRef()` return value                            | Detected                                             | Detected via `isUseRefCall`                              |
| `createRef()` return value                         | Detected                                             | Detected via `isCreateRefCall`                           |
| React namespace `React.useRef()`                   | Detected                                             | Detected                                                 |
| Naming convention `*Ref` or `ref`                  | Detected with feature flag                           | Detected via `resolvedName.endsWith("Ref")`              |
| Inferred ref (e.g., `fooRef` from non-useRef call) | Detected with `@enableTreatRefLikeIdentifiersAsRefs` | Detected via `endsWith("Ref")` even if not from `useRef` |
| Prop named `ref` or `*Ref`                         | Detected                                             | Detected via naming convention                           |
| Variable initialized from `anotherRef.current`     | Detected                                             | Detected via `isInitializedFromRef`                      |

**Verdict**: The IMPL is more aggressive in detecting refs by naming convention (`endsWith("Ref")`), which can catch some inferred refs but may also have more false positives.

---

## 3. Lazy Initialization

The SPEC allows ref writes inside `if (ref.current == null)` or `if (ref.current === null)` blocks. It tracks lazy init through HIR block analysis.

The IMPL allows ref writes inside null-check if blocks via `isRefCurrentNullCheck`. It also supports inverted patterns (`if (!ref.current) return; ref.current = value;`).

**Key Differences:**

| Scenario                                                                              | SPEC                                                   | IMPL                                                                                                                |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `if (r.current == null) { r.current = 42; }`                                          | Allowed                                                | Allowed                                                                                                             |
| `if (r.current == null) { r.current = 42; r.current = 42; }`                          | **Second write disallowed**                            | **Second write disallowed** (`duplicateRefInit`)                                                                    |
| `if (r.current == null) { r.current = 1; } if (r.current == null) { r.current = 2; }` | **Second write disallowed**                            | **Second write disallowed** (`duplicateRefInit`, tracked per-ref across the whole component, not just per-if-block) |
| `if (r.current == null) { f(r.current); }`                                            | **Disallowed** (passing ref to function in init block) | **Allowed** (treated as lazy init)                                                                                  |
| `if (r.current == DEFAULT_VALUE) { r.current = 1; }`                                  | Allowed (conditional block) [NEEDS VERIFICATION]       | **Disallowed** (not a null check)                                                                                   |
| `if (!(r.current === null)) return; r.current = value;`                               | Allowed                                                | Allowed                                                                                                             |

**Verdict**: The IMPL now also rejects duplicate null-guarded initializations (Phase 4 of `refs.spec.md`), matching the SPEC for the single-assignment case. It is still more permissive about reads/function-calls performed inside an otherwise-valid guard block.

---

## 4. Nested Function / Callback Handling

The SPEC can track ref accesses through nested functions that are synchronously invoked during render (e.g., `const fn = () => ref.current; fn();`), via a `refMutatingFunctions`-style map (see Phase 2/3 of `refs.spec.md`).

The IMPL now builds an analogous map (`functionVarBindings` + `directCallSites`, combined into a per-boundary "reached during render" set via `computeReachedFunctions`) and only treats a nested function as a protective boundary if it is never actually called (directly, or through a simple variable alias) from somewhere that is itself reached during render. This closes the gap for patterns like:

```javascript
const setRef = () => {
  ref.current = false;
};
const changeRef = setRef;
changeRef(); // now flagged
```

**Remaining gap**: the IMPL deliberately does _not_ treat inline callbacks passed to array iteration methods (`.map`, `.forEach`, etc.) or to hooks (`useState`, `useReducer`, `useEffect`, ...) as "reached during render", because ESLint's existing test suite intentionally allows mutating/reading a ref inside such callbacks (a common, accepted pattern). The SPEC's HIR analysis, which has access to real calling-convention information for well-known APIs, is stricter here. Functions assigned to object/member-expression properties (`object.foo = () => ref.current`) are also not tracked, only plain variable bindings.

**Verdict**: The most common form of the gap (a locally-defined helper being called, possibly via alias, directly during render) is now closed. The array-method/hook-callback and member-expression-bound-function cases remain open by design.

---

## 5. refPassedToFunction Detection

The SPEC detects passing refs to functions in two ways:

1. Direct argument passing: `foo(ref)`
2. Indirect through JSX: `<Foo ref={ref.current} />`

The IMPL detects:

1. Direct argument passing to non-hook functions: `foo(ref)`
2. It explicitly allows `mergeRefs` calls
3. It does **not** distinguish render helpers from other functions

**Key Difference**: `props.render(ref)` is allowed by the SPEC (render helper pattern) [NEEDS VERIFICATION] but flagged by the IMPL as `refPassedToFunction`.

---

## 6. Nested Property Access

The SPEC detects writes to nested properties of ref values: `ref.current.inner = value`.

The IMPL only tracks direct `.current` assignments. `ref.current.inner = value` is treated as a read of `ref.current` (not a write), because the AssignmentExpression's left side is `ref.current.inner`, not `ref.current` directly.

**Verdict**: The IMPL misses nested property writes on refs.

---

## 7. Error Reporting

| Aspect                 | SPEC                                                           | IMPL                                                                          |
| ---------------------- | -------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| Read during render     | "Cannot access refs during render"                             | "Do not read 'ref.current' during render..."                                  |
| Write during render    | "Cannot update ref during render"                              | "Do not write to 'ref.current' during render..."                              |
| Ref passed to function | "Passing a ref to a function may read its value during render" | "Passing a ref to a function may cause its value to be read during render..." |

**Verdict**: Message intent is aligned across all three violation types.

---

## 8. Key Gaps and Deviations

1. **Lazy Init Block Strictness**: The SPEC disallows passing the ref to functions within a guard block; the IMPL still allows this (only the duplicate-assignment case is now caught, see §3).
2. **Nested Property Writes**: The IMPL does not detect `ref.current.inner = value` as a write; it reports it as a read.
3. **Render Helper False Positive**: The IMPL flags `props.render(ref)` as `refPassedToFunction`, but the SPEC allows passing refs to render helpers. [NEEDS VERIFICATION]
4. ~~**Synchronously Invoked Callbacks**~~: **Fixed** for direct/aliased calls to locally-defined helper functions (see §4). Still open for callbacks passed to array iteration methods or hooks, by design (see §4).
5. **State Initializer / Reducer Blind Spots**: The IMPL skips ref accesses inside `useState(() => ref.current)` and `useReducer(() => ref.current)` because they are nested functions. The SPEC catches these. Not fixed, to avoid conflating with the (allowed) reducer-function and effect-callback arguments of the same hooks.
6. ~~**MemberExpression.current Support**~~: **Fixed**. The IMPL now also recognizes `props.ref.current` (and other `*Ref` member-expression bases), not just `Identifier.current`. Lazy-init guard detection is not supported for this shape.
7. **Non-null Lazy Init Guards**: The IMPL only recognizes `== null` / `=== null` checks for lazy init. Guards like `if (r.current == DEFAULT_VALUE)` are not recognized.
8. **Duplicate Ref Initialization**: **Added**. The IMPL now reports `duplicateRefInit` when a ref is guarded-initialized more than once within the same component/hook, matching the SPEC's Validation Rule #3.
9. **Object/Member-Expression-Bound Functions**: The IMPL's reachability analysis (§4) only tracks functions bound to plain variables (`const fn = () => {...}`), not to object properties (`object.foo = () => {...}`).
