# refs IMPL–SPEC Diff Report

**IMPL**: `refs.ts` + `lib.ts` (ESLint rule)\
**SPEC**: `refs.spec.md` (React Compiler `ValidateNoRefAccessInRender`)

This report tracks the current behavioral differences between the IMPL and the SPEC. For the
history of how these differences narrowed over time, see `CHANGELOG.md`.

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's HIR. It uses `computeUnconditionalBlocks` (post-dominator analysis) to determine which blocks always execute during render. It tracks ref accesses through `LoadLocal`/`StoreLocal` instruction propagation and has special handling for lazy initialization patterns.

The IMPL operates on the ESLint AST. It tracks `ref.current` MemberExpression accesses and identifies whether they are reads or writes, using parent-node traversal to detect lazy-init null-check guards and a call-graph-lite reachability analysis (`computeReachedFunctions`) to detect helper functions invoked during render.

**Verdict**: The SPEC uses compiler-level control-flow analysis. The IMPL approximates it with syntactic parent-node checks, naming conventions, and a best-effort reachability analysis.

---

## 2. What Constitutes a "Ref"

| Source Category                                        | SPEC                                                 | IMPL                                                        |
| ------------------------------------------------------ | ---------------------------------------------------- | ----------------------------------------------------------- |
| `useRef()` return value                                | Detected                                             | Detected via `isUseRefCall`                                 |
| `createRef()` return value                             | Detected                                             | Detected via `isCreateRefCall`                              |
| React namespace `React.useRef()`                       | Detected                                             | Detected                                                    |
| Naming convention `*Ref` or `ref`                      | Detected with feature flag                           | Always detected via `resolvedName.endsWith("Ref")`          |
| Inferred ref (e.g., `fooRef` from a non-`useRef` call) | Detected with `@enableTreatRefLikeIdentifiersAsRefs` | Always detected via `endsWith("Ref")`, regardless of origin |
| Prop named `ref` or `*Ref`                             | Detected                                             | Detected via naming convention                              |
| Variable initialized from `anotherRef.current`         | Detected                                             | Detected via `isInitializedFromRef`                         |

**Verdict**: The IMPL always applies the naming-convention heuristic (no feature flag gating), which is more aggressive than the SPEC's default and may produce more false positives on variables that merely end in `Ref` without being an actual ref.

---

## 3. Lazy Initialization

The SPEC allows a single ref write inside `if (ref.current == null)`/`if (ref.current === null)` blocks (and their negated/inverted forms), tracked via HIR block analysis with a `safeBlock` concept marking which branch is provably-null (see Phase 4 of `refs.spec.md`).

The IMPL mirrors this with `getRefCurrentNullCheckBranch`, which determines - for direct (`==`/`===`/`!=`/`!==`) and negated/unary (`!ref.current`, `!(ref.current === null)`) forms - which branch (`consequent`/`alternate`) is guaranteed to observe `ref.current` as null. Only a direct write in that branch is treated as the (single) valid initialization; any other use of the value there (read, passed to a function, etc.) is still reported. Reading the already-initialized value back in the _other_ branch (the `if (x.current !== null) { return x.current; }` memoization idiom) is allowed.

| Scenario                                                                              | SPEC                                        | IMPL                                         |
| ------------------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------- |
| `if (r.current == null) { r.current = 42; }`                                          | Allowed                                     | Allowed                                      |
| `if (r.current == null) { r.current = 1; r.current = 2; }`                            | Second write disallowed                     | Second write disallowed (`duplicateRefInit`) |
| `if (r.current == null) { r.current = 1; } if (r.current == null) { r.current = 2; }` | Second write disallowed                     | Second write disallowed (`duplicateRefInit`) |
| `if (r.current == null) { f(r.current); }`                                            | Disallowed (passing ref to function)        | Disallowed (`readDuringRender`)              |
| `if (r.current == DEFAULT_VALUE) { r.current = 1; }`                                  | Disallowed (not a null guard)               | Disallowed (not a null check)                |
| `if (r.current !== null) { return <div>{r.current}</div>; } r.current = compute();`   | Allowed (read of already-initialized value) | Allowed                                      |

**Verdict**: Aligned.

---

## 4. Nested Function / Callback Handling

The SPEC tracks ref accesses through nested functions that are synchronously invoked during render (e.g., `const fn = () => ref.current; fn();`), via a `refMutatingFunctions`-style map (see Phase 2/3 of `refs.spec.md`).

The IMPL builds an analogous map (`functionVarBindings` + `directCallSites`, combined into a per-boundary "reached during render" set via `computeReachedFunctions`) and only treats a nested function as a protective boundary if it is never actually called (directly, or through a simple variable alias, including simple object-member-expression targets like `object.foo = () => {...}; object.foo()`) from somewhere that is itself reached during render. The lazy initializer function passed directly as `useState`'s first argument is always treated as reached, since it runs synchronously during the initial render.

**Remaining gap**: inline callbacks passed to array iteration methods (`.map`, `.forEach`, etc.) or to hooks other than `useState` (`useReducer`, `useEffect`, ...) are _not_ treated as "reached during render", because ESLint's existing test suite intentionally allows mutating/reading a ref inside such callbacks (a common, accepted pattern). This includes `useReducer`'s reducer-position function argument specifically - the SPEC's HIR analysis has real calling-convention information for well-known APIs and is stricter here than the IMPL is willing to be, to avoid regressing accepted patterns.

**Verdict**: Aligned for locally-defined helpers (variables or simple object properties) called directly or via alias during render, and for `useState`'s initializer. Deviates by design for array-method/other-hook callbacks.

---

## 5. refPassedToFunction Detection

The SPEC detects passing refs to functions in two ways:

1. Direct argument passing: `foo(ref)`
2. Indirect through JSX: `<Foo ref={ref.current} />`

The IMPL detects direct argument passing to non-hook functions (`foo(ref)`), and exempts calls to `mergeRefs` and to any function named `render` (a render-prop style helper, e.g. `props.render(ref)`).

**Verdict**: Aligned for the common render-prop pattern. Render helpers under other names are indistinguishable from ordinary functions and will still be flagged.

---

## 6. Nested Property Access

The SPEC detects writes to nested properties of ref values: `ref.current.inner = value`.

The IMPL detects this via `isNestedRefCurrentWrite`: when the `ref.current` MemberExpression is (transitively, through further MemberExpressions) the target of an `AssignmentExpression` or `UpdateExpression`, it is reported as `writeDuringRender` rather than `readDuringRender`.

**Verdict**: Aligned.

---

## 7. Error Reporting

| Aspect                 | SPEC                                                           | IMPL                                                           |
| ---------------------- | -------------------------------------------------------------- | -------------------------------------------------------------- |
| Read during render     | "Cannot access refs during render"                             | "Cannot access refs during render"                             |
| Write during render    | "Cannot update ref during render"                              | "Cannot update ref during render"                              |
| Ref passed to function | "Passing a ref to a function may read its value during render" | "Passing a ref to a function may read its value during render" |

**Verdict**: Aligned.

---

## 8. Known Remaining Gaps and Deviations

1. **Reducer/callback reachability**: functions passed as inline callbacks to array iteration methods (`.map`, `.forEach`, ...) or to hooks other than `useState` (notably `useReducer`'s reducer-position argument) are not treated as reached during render, so ref mutations/reads inside them are not flagged (see §4). This is intentional, to preserve existing accepted ref-mutation-in-callback patterns.
2. **Naming-convention aggressiveness**: the IMPL always applies the `*Ref`/`ref` naming heuristic, without the SPEC's opt-in feature flag gating, which can produce false positives on non-ref variables that happen to match the naming convention (see §2).
3. **Render helper detection**: only calls to a function literally named `render` are exempted from `refPassedToFunction`; other render-prop-style helper names are still flagged (see §5).
