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

The SPEC allows ref writes inside `if (ref.current == null)` or `if (ref.current === null)` blocks. It tracks lazy init through HIR block analysis, and separately tracks which branch of the guard is provably-null (`safeBlock`, see Phase 4 of `refs.spec.md`).

The IMPL allows ref writes inside null-check if blocks via `getRefCurrentNullCheckBranch`, which determines - for both the standard and inverted/negated forms - which branch (`consequent` or `alternate`) is guaranteed to observe `ref.current` as `null`/`undefined`. It also supports inverted patterns (`if (!ref.current) return; ref.current = value;`).

**Key Differences:**

| Scenario                                                                              | SPEC                                                   | IMPL                                                                                                                |
| ------------------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------- |
| `if (r.current == null) { r.current = 42; }`                                          | Allowed                                                | Allowed                                                                                                             |
| `if (r.current == null) { r.current = 42; r.current = 42; }`                          | **Second write disallowed**                            | **Second write disallowed** (`duplicateRefInit`)                                                                    |
| `if (r.current == null) { r.current = 1; } if (r.current == null) { r.current = 2; }` | **Second write disallowed**                            | **Second write disallowed** (`duplicateRefInit`, tracked per-ref across the whole component, not just per-if-block) |
| `if (r.current == null) { f(r.current); }`                                            | **Disallowed** (passing ref to function in init block) | **Disallowed** (`readDuringRender`; only a direct write inside the null-guaranteed branch is exempted)              |
| `if (r.current == DEFAULT_VALUE) { r.current = 1; }`                                  | **Disallowed** (not a null guard, per Edge Cases)      | **Disallowed** (not a null check)                                                                                   |
| `if (!(r.current === null)) return; r.current = value;`                               | Allowed                                                | Allowed                                                                                                             |
| `if (r.current !== null) { return <div>{r.current}</div>; } r.current = compute();`   | Allowed (read of already-initialized value)            | Allowed (read is exempted only in the non-null branch of a guard)                                                   |

**Verdict**: The IMPL now matches the SPEC for the single-assignment case, the duplicate-initialization case, and the "reading/passing the provably-null value to a function inside the init branch" case: only a direct assignment to `ref.current` is treated as the (single) lazy initialization; any other use of `ref.current` inside the null-guaranteed branch (read, function call, etc.) is still reported. Reading the already-set value back in the _other_ branch (the common `if (x.current !== null) { return x.current; }` memoization idiom) remains allowed.

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

`functionVarBindings`/`directCallSites` also track functions bound to (and called through) simple object-member-expression targets, e.g.:

```javascript
const object = {};
object.foo = () => ref.current;
object.foo(); // now flagged
```

Separately, the lazy initializer function passed directly as `useState`'s first argument is now always treated as "reached during render" (since it unconditionally runs synchronously during the initial render), closing that part of the state-initializer gap (see §8, item 5).

**Remaining gap**: the IMPL deliberately does _not_ treat inline callbacks passed to array iteration methods (`.map`, `.forEach`, etc.) or to most other hooks (`useReducer`, `useEffect`, ...) as "reached during render", because ESLint's existing test suite intentionally allows mutating/reading a ref inside such callbacks (a common, accepted pattern). The SPEC's HIR analysis, which has access to real calling-convention information for well-known APIs, is stricter here.

**Verdict**: The most common forms of the gap (a locally-defined helper - bound to a variable or a simple object property - being called, possibly via alias, directly during render; and `useState`'s lazy initializer) are now closed. The array-method/hook-callback cases (other than `useState`'s initializer) remain open by design.

---

## 5. refPassedToFunction Detection

The SPEC detects passing refs to functions in two ways:

1. Direct argument passing: `foo(ref)`
2. Indirect through JSX: `<Foo ref={ref.current} />`

The IMPL detects:

1. Direct argument passing to non-hook functions: `foo(ref)`
2. It explicitly allows `mergeRefs` calls and calls to functions named `render` (render-prop style helpers, e.g. `props.render(ref)`)
3. It does **not** distinguish other render helpers from ordinary functions

**Verdict**: The common `props.render(ref)` render-prop pattern is now allowed, matching the SPEC. Render helpers under other names are still indistinguishable from ordinary functions and will be flagged.

---

## 6. Nested Property Access

The SPEC detects writes to nested properties of ref values: `ref.current.inner = value`.

The IMPL now also detects this via `isNestedRefCurrentWrite`: when the `ref.current` MemberExpression is (transitively, through further MemberExpressions) the target of an `AssignmentExpression` or `UpdateExpression`, it is reported as `writeDuringRender` rather than `readDuringRender`.

**Verdict**: Fixed. Nested property writes on refs are now correctly classified as writes.

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

1. ~~**Lazy Init Block Strictness**~~: **Fixed**. The IMPL is now direction-aware (see §3): only a direct write is exempted inside the branch guaranteed to see `ref.current` as null; reads and function calls there are reported, matching the SPEC.
2. ~~**Nested Property Writes**~~: **Fixed** (see §6). `ref.current.inner = value` is now reported as `writeDuringRender`.
3. ~~**Render Helper False Positive**~~: **Fixed** for the common `props.render(ref)` shape (see §5). Render helpers under other names are still indistinguishable from ordinary functions.
4. ~~**Synchronously Invoked Callbacks**~~: **Fixed** for direct/aliased calls to locally-defined helper functions, including functions bound to simple object properties, and for `useState`'s lazy initializer (see §4). Still open for callbacks passed to array iteration methods or to hooks other than `useState`, by design (see §4).
5. **State Initializer / Reducer Blind Spot**: **Partially fixed**. `useState(() => ref.current)` is now caught (see §4). `useReducer(() => ref.current, null)` is not: the function there occupies useReducer's _first_ (reducer) argument position, and distinguishing that from the (allowed) reducer/effect-callback arguments of the same and similar hooks is not attempted here.
6. ~~**MemberExpression.current Support**~~: **Fixed**. The IMPL now also recognizes `props.ref.current` (and other `*Ref` member-expression bases), not just `Identifier.current`. Lazy-init guard detection is not supported for this shape.
7. ~~**Non-null Lazy Init Guards**~~: **Not a gap.** `refs.spec.md`'s own "Arbitrary Comparison Values" edge case states that non-null guards like `if (r.current == DEFAULT_VALUE)` are themselves an _error_ in the SPEC, matching the IMPL's existing behavior of not treating them as a lazy-init guard.
8. **Duplicate Ref Initialization**: **Added**. The IMPL now reports `duplicateRefInit` when a ref is guarded-initialized more than once within the same component/hook, matching the SPEC's Validation Rule #3.
9. ~~**Object/Member-Expression-Bound Functions**~~: **Fixed** (see §4). The IMPL's reachability analysis now also tracks functions bound to (and called through) simple object properties (`object.foo = () => {...}`), not just plain variables.
