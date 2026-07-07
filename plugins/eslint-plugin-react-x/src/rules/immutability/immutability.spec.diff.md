# immutability IMPL–SPEC Diff Report

**IMPL**: `immutability.ts` + `lib.ts` (ESLint rule)\
**SPEC**: `immutability.spec.md` (React Compiler `ValidateNoFreezingKnownMutableFunctions`)

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's HIR with effect inference (`AliasingEffect`, `Freeze`, `Mutate`, `MutateTransitive`). It propagates mutation effects across `LoadLocal`/`StoreLocal` instructions via a `contextMutationEffects` map, and reports whenever an operand with `Effect.Freeze` (JSX props, hook arguments, hook return values) resolves to a function carrying a mutation effect.

The IMPL operates on the ESLint AST with `@typescript-eslint/scope-manager`. It:

1. Collects every syntactic mutation site (`AssignmentExpression`, `UpdateExpression`, `delete`, and known mutating method calls such as `push`/`sort`/`set`/`add`) during a single traversal.
2. At `Program:exit`, resolves each mutation's root identifier to its declaring variable and walks the chain of enclosing functions (via `Traverse.findParent`), marking every ancestor function that does **not** locally declare that variable as "mutates a captured variable." This walk naturally covers mutations nested arbitrarily deep inside inline closures (the SPEC's `MutateTransitive`).
3. Separately collects "freeze" sinks (JSX attribute expressions, hook call arguments, hook return values) during traversal, and at `Program:exit` resolves each sink expression back to a function node — following simple local aliasing (`const fn2 = fn;`) via `@eslint-react/var`'s `resolve()` — then checks it against the mutable-function set built in step 2.

**Verdict**: The SPEC uses compiler-level effect propagation on an SSA-like IR. The IMPL approximates the same result with syntactic scope-chain walking and identifier alias resolution, which is less precise but requires no HIR/effect-inference machinery.

---

## 2. Mutation Detection

| Mutation form                                     | SPEC                                           | IMPL                                                                                     |
| ------------------------------------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Reassignment of a captured variable (`x = ...`)   | `Mutate`/`MutateTransitive` via `StoreContext` | Detected (`AssignmentExpression` with `Identifier` left)                                 |
| Property assignment (`x.foo = ...`)               | Detected                                       | Detected (`AssignmentExpression` with `MemberExpression` left)                           |
| `delete x.foo`                                    | Detected                                       | Detected                                                                                 |
| `x++` / `--x`                                     | Detected                                       | Detected                                                                                 |
| Mutating array/Map/Set methods (`push`, `set`, …) | Detected via known mutable-array-type effects  | Detected via a fixed method allow-list (`MUTATING_METHODS`)                              |
| Mutation via an aliased/reassigned root object    | Detected via effect propagation                | Not tracked — only the immediate root identifier of the mutated expression is considered |

**Verdict**: Coverage of common mutation shapes is close, but the IMPL only looks at the literal root identifier of the mutated expression; it does not track further aliasing of _mutation targets_ (only aliasing of _functions_, see §3).

---

## 3. Function Aliasing / Propagation

The SPEC propagates mutation effects through `LoadLocal`/`StoreLocal`, so any assignment chain (`const fn2 = fn;`) or nested nested closures preserve the "known mutable function" status.

The IMPL:

- Handles simple `const`/`let` aliasing of a function reference via `resolve()` (`const fn2 = fn; <Foo fn={fn2} />` is flagged).
- Handles transitive mutation through nested inline closures naturally, because the enclosing-function walk in §1 continues past the boundary of the immediately-enclosing function.
- Does **not** follow aliasing through reassignment after declaration (`let fn2; fn2 = fn;` is not resolved by `resolve()`), through function calls that return the mutable function, or through property/member-expression storage (`obj.fn = fn`).

**Verdict**: Direct `const`/`let`-with-initializer aliasing and nested-closure transitivity are covered; more indirect propagation paths are not.

---

## 4. Freeze Contexts (Sinks)

| Sink                         | SPEC     | IMPL                                                                                                                                                           |
| ---------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| JSX prop (`<Foo fn={fn} />`) | Detected | Detected for every `JSXAttribute` with a `JSXExpressionContainer` value                                                                                        |
| Hook call argument           | Detected | Detected for every call matching `core.isHookCall` (any `use*`-named call)                                                                                     |
| Hook return value            | Detected | Detected via `getHookCollector`'s `rets` (explicit `return` and implicit arrow bodies), only for functions recognized as hook definitions by naming convention |

**Verdict**: All three sink categories from the SPEC are covered. The IMPL is slightly broader for hook arguments (it does not special-case `useEffect`/`useCallback`/etc.) and slightly narrower for hook returns (relies on `use`-prefixed naming to identify hooks, same convention used elsewhere in this codebase).

---

## 5. Ref Exception

The SPEC exempts ref mutations via `isRefOrRefLikeMutableType`, a type-based check.

The IMPL exempts ref mutations via a purely syntactic naming heuristic (`isRefLikeName`/`hasRefLikeNameInChain`): any identifier or property named `ref` or ending in `Ref` anywhere in the mutated member-expression chain is treated as a ref and skipped. This mirrors the heuristic already used elsewhere in this rule family (see `refs.spec.diff.md` §2) and additionally covers refs received as props (e.g. `props.myRef.current = x`) without needing type information.

**Verdict**: Functionally equivalent intent, different mechanism (naming convention vs. type). Can under- or over-exempt in cases where naming doesn't match the heuristic.

---

## 6. Error Reporting

The SPEC reports a **single diagnostic with two annotated locations**: the usage site (freeze point) and the mutation site, each with its own message, under one `reason`/`description`.

The IMPL emits **two separate ESLint reports** per violation, since ESLint's reporting model has no native concept of a single diagnostic with multiple locations:

- At the freeze/usage site, `default`: "This function may (indirectly) reassign or modify '{{name}}' after render, which can cause inconsistent behavior on subsequent renders. Consider using state instead." — this combines the SPEC's short usage-site message ("This function may (indirectly) reassign or modify `{{name}}` after render") with its `description` ("...which can cause inconsistent behavior on subsequent renders. Consider using state instead").
- At the mutation site, `mutates`: "This modifies '{{name}}'." — a direct rendering of the SPEC's second message ("This modifies `{{name}}`").

**Verdict**: Message wording now maps 1:1 to the SPEC's two messages (plus its description folded into the first one). The two locations are reported as independent ESLint problems rather than as a single diagnostic with sub-details, which is the closest approximation ESLint's reporting model allows.

---

## 7. Key Gaps and Deviations

1. **No effect-level precision**: The IMPL cannot distinguish definite (`Mutate`) from conditional (`MutateConditionally`) mutations; every detected mutation is treated as definite.
2. **Limited aliasing**: Only `const`/`let`-with-initializer aliasing of the _function_ is followed; aliasing of the _mutated object_ itself, reassigned aliases, and property-stored functions are not tracked.
3. **Fixed mutating-method list**: `MUTATING_METHODS` is a static allow-list rather than a type-driven determination of "known mutable" values.
4. **Split diagnostics**: The usage-site and mutation-site messages are reported as two independent ESLint problems instead of one diagnostic with two annotated locations, since ESLint has no native multi-location diagnostic model.
