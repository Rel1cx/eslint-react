# immutability IMPL vs. SPEC Report

**IMPL**: `immutability.ts` (ESLint rule)\
**SPEC**: `immutability.spec.md` (React Compiler `ValidateNoFreezingKnownMutableFunctions`)

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's HIR with effect inference (`AliasingEffect`, `Freeze`, `Mutate`, `MutateTransitive`). Its core concept is that a function which mutates captured locals is itself a mutable value and must not be passed to frozen contexts. It propagates mutation effects across `LoadLocal` and `StoreLocal` instructions via a `contextMutationEffects` map, triggering when an operand has `Effect.Freeze` (JSX props, hook arguments, hook return values).

The IMPL operates on the ESLint AST with `@typescript-eslint/scope-manager`. It treats props and state as immutable and catches direct mutations at the call or assignment site. Each mutation site is analyzed independently through scope resolution (`resolve`, `findVariable`) with no effect propagation. It triggers when the enclosing function is identified as a component or hook at `Program:exit`.

---

## 2. Rule 1: Mutable Function in Frozen Context

The SPEC detects functions that mutate captured local variables being passed to JSX props, hook arguments, or returned from hooks. It checks `FunctionExpression.aliasingEffects` against `fn.context`.

The IMPL does **not** track whether a function mutates captured variables, nor does it detect when such functions enter frozen contexts. It would only report if the mutated object itself is state/props and is mutated directly.

**Verdict**: This entire validation concept from the SPEC is absent in the IMPL. The IMPL focuses on direct mutations rather than function-level mutability.

---

## 3. Rule 2: Direct State/Props Mutation

The SPEC does not explicitly flag direct `state.push()` or `state.foo = bar` at the mutation site unless the mutation happens inside a function that is then frozen.

The IMPL detects direct mutations of state/props via:

- Array methods (`push`, `sort`, `splice`, etc.)
- Property assignments (`state.foo = bar`)

State identification uses an explicit `isStateValue()` helper tracing identifiers back to `useState(…)` or `useReducer(…)` destructured values (index 0). Props identification uses `getPropsDefiningFunction()` checking if an identifier is a `Parameter` definition of an ancestor function.

**Verdict**: This is the primary focus of the IMPL and is not directly mapped in the SPEC.

---

## 4. Exception Handling

- **Ref mutations**: The SPEC explicitly allows them via `isRefOrRefLikeMutableType`. The IMPL does not explicitly track refs; they are treated as regular variables unless they happen to match state/props heuristics.
- **Immer / Draft**: The SPEC does not mention this. The IMPL explicitly excludes any mutation whose root identifier is named `draft`.
- **Event handler parameters**: The SPEC naturally excludes them because event handlers are not component context. The IMPL explicitly excludes them via `propsDefiningFunc` verification: the parameter's defining function must itself be a component or hook.
- **Nested function mutations**: The SPEC covers them naturally via `fn.context`. The IMPL traces references through nested closures back to the original parameter/state declaration.

---

## 5. Error Reporting

The SPEC reports **dual-location**: both where the mutable function is used (frozen) and where the mutation occurs. Its messages describe function-level mutability (e.g., "This function may (indirectly) reassign or modify `cache` after render").

The IMPL reports **single-location**: only the mutation site (`CallExpression` or `AssignmentExpression`). Its messages describe value-level immutability (e.g., "Do not call 'push()' on 'items'. Props and state are immutable — create a new array instead.").

---

## 6. Message ID Mapping

There is no direct one-to-one mapping because the rules address fundamentally different violation patterns:

- `mutatingArrayMethod` — **No SPEC equivalent.** The SPEC does not flag array mutations directly; it flags the function containing them when frozen.
- `mutatingAssignment` — **No SPEC equivalent.** The SPEC flags `StoreContext` on captured variables inside functions, not direct property assignments on state/props.

SPEC error descriptions:

- "Cannot modify local variables after render completes"
- "This argument is a function which may reassign or mutate [variable] after render..."

These describe function-level mutability, whereas IMPL messages describe value-level immutability.

---

## 7. Test Case Overlap

Several IMPL test cases are ported from React Compiler fixtures (e.g., `error.modify-state.js`, `error.mutate-props.js`, `error.invalid-mutation-in-closure.js`). However, the reporting mechanism differs:

- `error.modify-state.js` — SPEC: caught by broader compiler immutability passes; IMPL: caught by `mutatingAssignment` on direct `state.foo = 1`.
- `error.mutate-props.js` — SPEC: caught by broader compiler immutability passes; IMPL: caught by `mutatingAssignment` on direct `props.test = 1`.
- `error.invalid-mutation-in-closure.js` — SPEC: caught by `ValidateNoFreezingKnownMutableFunctions` if the closure is frozen; IMPL: caught by `mutatingAssignment` because `options` is a hook parameter.

---

## 8. Local Variable Aliases

The IMPL identifies mutations by resolving the root identifier of a `MemberExpression` (e.g., `state` in `state.foo = 1`). If the root identifier is a local variable that was assigned from state/props (e.g., `const foo = state.foo; foo.bar = 1`), the IMPL does **not** flag it because `foo` is a local `VariableDeclarator`, not a destructured `useState`/`useReducer` value or a component/hook parameter.

Examples that are **valid** under the IMPL but may be caught by the compiler's broader immutability passes:

- `const foo = state.foo; foo.bar = 1;` — `foo` is a local alias.
- `for (const x of props.items) { x.modified = true; }` — `x` is a for-of iterator variable.
- `let y = props.value; y.foo = true;` — `y` is a local variable reassigned from props.

**Verdict**: The IMPL does not track aliasing through local variable assignments. It only checks the immediate root identifier at the mutation site.

---

## 9. Key Gaps and Deviations

1. **Fundamental Rule Mismatch**: The IMPL does not implement `ValidateNoFreezingKnownMutableFunctions`. Instead, it implements a distinct rule focused on direct state/props mutation. The two specs are conceptually adjacent but operationally different.
2. **Missing Frozen-Context Detection**: The IMPL has no concept of `Freeze` effects. It does not detect when a mutable function is passed as a JSX prop, hook argument, or hook return value.
3. **Missing Function-Level Mutability Tracking**: The IMPL does not analyze whether a function mutates captured locals. It only checks whether the mutated object itself is state/props.
4. **Missing Effect Propagation**: The IMPL does not propagate mutation effects through variable assignments. Each mutation is analyzed independently at its AST site.
5. **Missing Dual-Location Diagnostics**: The IMPL reports only the mutation site, whereas the SPEC reports both the usage location (freeze point) and the mutation location.
6. **Local Variable Alias Blindness**: The IMPL does not detect mutations made through local variable aliases of state or props (e.g., `const foo = state.foo; foo.bar = 1`).
7. **For-Of Iterator Blindness**: The IMPL does not detect mutations on `for-of` iterator variables, even when the iterated collection comes from props.
8. **Additional IMPL Capabilities** (not in SPEC):
   - Explicit Immer support via `draft` variable exclusion
   - Explicit event handler parameter exclusion
   - Granular array method allow-list (`MUTATING_ARRAY_METHODS`)
   - Support for `useReducer` state identification
