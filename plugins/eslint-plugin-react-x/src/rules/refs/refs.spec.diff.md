# refs IMPL vs. SPEC Report

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

| Scenario                                                     | SPEC                                                   | IMPL                               |
| ------------------------------------------------------------ | ------------------------------------------------------ | ---------------------------------- |
| `if (r.current == null) { r.current = 42; }`                 | Allowed                                                | Allowed                            |
| `if (r.current == null) { r.current = 42; r.current = 42; }` | **Second write disallowed**                            | **Both allowed**                   |
| `if (r.current == null) { f(r.current); }`                   | **Disallowed** (passing ref to function in init block) | **Allowed** (treated as lazy init) |
| `if (r.current == DEFAULT_VALUE) { r.current = 1; }`         | Allowed (conditional block)                            | **Disallowed** (not a null check)  |
| `if (!(r.current === null)) return; r.current = value;`      | Allowed                                                | Allowed                            |

**Verdict**: The SPEC is stricter about what happens inside lazy-init blocks (only one assignment, no reads passed to functions). The IMPL treats the entire if-block as a protected region.

---

## 4. Nested Function / Callback Handling

The SPEC can track ref accesses through nested functions that are synchronously invoked during render (e.g., `const fn = () => ref.current; fn();`).

The IMPL uses `Traverse.findParent(node, Check.isFunction) !== boundary` to skip any ref access inside a nested function, regardless of whether that function is invoked during render or passed out as a callback.

**Verdict**: The IMPL has a known blind spot for synchronously-invoked callbacks during render (see FIXMEs in spec). The SPEC's HIR analysis catches these.

---

## 5. refPassedToFunction Detection

The SPEC detects passing refs to functions in two ways:

1. Direct argument passing: `foo(ref)`
2. Indirect through JSX: `<Foo ref={ref.current} />`

The IMPL detects:

1. Direct argument passing to non-hook functions: `foo(ref)`
2. It explicitly allows `mergeRefs` calls
3. It does **not** distinguish render helpers from other functions

**Key Difference**: `props.render(ref)` is allowed by the SPEC (render helper pattern) but flagged by the IMPL as `refPassedToFunction`.

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

1. **Lazy Init Block Strictness**: The SPEC allows only a single assignment inside a lazy-init block and disallows passing the ref to functions within that block. The IMPL protects the entire if-block uniformly.
2. **Nested Property Writes**: The IMPL does not detect `ref.current.inner = value` as a write; it reports it as a read.
3. **Render Helper False Positive**: The IMPL flags `props.render(ref)` as `refPassedToFunction`, but the SPEC allows passing refs to render helpers.
4. **Synchronously Invoked Callbacks**: The IMPL skips all nested functions, missing ref accesses in lambdas that are immediately invoked during render (e.g., `const fn = () => ref.current; fn();`).
5. **State Initializer / Reducer Blind Spots**: The IMPL skips ref accesses inside `useState(() => ref.current)` and `useReducer(() => ref.current)` because they are nested functions. The SPEC catches these.
6. **MemberExpression.current Support**: The IMPL only supports `Identifier.current` (e.g., `ref.current`). It does not support `props.ref.current` where the base is a MemberExpression.
7. **Non-null Lazy Init Guards**: The IMPL only recognizes `== null` / `=== null` checks for lazy init. Guards like `if (r.current == DEFAULT_VALUE)` are not recognized.
