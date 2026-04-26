# immutability: IMPL vs SPEC Diff

> IMPL: `immutability.ts` — ESLint rule implementation\
> SPEC: `immutability.spec.md` — React Compiler `ValidateNoFreezingKnownMutableFunctions.ts` specification

---

## 1. Underlying Mechanism Differences

| Dimension              | SPEC (React Compiler)                                                                                           | IMPL (ESLint Rule)                                                                                                                           |
| ---------------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| **Analysis Layer**     | HIR (High-level IR) with effect inference (`AliasingEffect`, `Freeze`, `Mutate`, `MutateTransitive`)            | ESLint AST + Scope analysis (`@typescript-eslint/scope-manager`)                                                                             |
| **Core Concept**       | A function that mutates captured locals is _itself_ a mutable value and must not be passed to frozen contexts   | Props and state are immutable — direct mutations must be caught at the call/assignment site                                                  |
| **Detection Target**   | `FunctionExpression` values whose `aliasingEffects` contain `Mutate` / `MutateTransitive` on context variables  | `CallExpression` (mutating array methods) and `AssignmentExpression` (property assignments) whose root identifier resolves to state or props |
| **Effect Propagation** | Propagates mutation effects across `LoadLocal` and `StoreLocal` instructions via a `contextMutationEffects` Map | No effect propagation; each mutation site is analyzed independently through scope resolution (`resolve`, `findVariable`)                     |
| **Context Validation** | Triggers when an operand has `Effect.Freeze` (JSX props, hook arguments, hook return values)                    | Triggers when the enclosing function is identified as a component or hook at `Program:exit`                                                  |

---

## 2. Rule 1: Mutable Function in Frozen Context (SPEC-only Concept)

| Aspect               | SPEC                                                                                                             | IMPL                                                                                                                                                 |
| -------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| **What is detected** | Functions that mutate captured local variables being passed to JSX props, hook arguments, or returned from hooks | **Not implemented.** IMPL does not track whether a function mutates captured variables, nor does it detect when such functions enter frozen contexts |
| **Example (SPEC)**   | `const fn = () => { cache.set("k", "v"); }; return <Foo fn={fn} />;` → Error                                     | Would **not** report unless `cache` itself is state/props and is mutated directly                                                                    |
| **Detection Method** | HIR `FunctionExpression.aliasingEffects` checked against `fn.context`                                            | N/A                                                                                                                                                  |

**Conclusion**: This entire validation concept from SPEC is **absent** in IMPL. IMPL focuses on direct mutations rather than function-level mutability.

---

## 3. Rule 2: Direct State/Props Mutation (IMPL-only Concept)

| Aspect                   | SPEC                                                                                                                                                                                      | IMPL                                                                                                                           |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **What is detected**     | **Not explicitly covered.** The SPEC pass does not flag direct `state.push()` or `state.foo = bar` at the mutation site unless the mutation happens inside a function that is then frozen | Direct mutations of state/props via array methods (`push`, `sort`, `splice`, etc.) or property assignments (`state.foo = bar`) |
| **State Identification** | Through general HIR context analysis                                                                                                                                                      | Explicit `isStateValue()` helper that traces identifiers back to `useState(…)` or `useReducer(…)` destructured value (index 0) |
| **Props Identification** | Through `fn.context` (closure-captured variables)                                                                                                                                         | Explicit `getPropsDefiningFunction()` that checks if identifier is a `Parameter` definition of an ancestor function            |
| **Example (IMPL)**       | N/A                                                                                                                                                                                       | `const [items] = useState([1]); items.push(4);` → Error                                                                        |

**Conclusion**: This is the **primary focus** of IMPL and is not directly mapped in SPEC.

---

## 4. Exception Handling Differences

| Aspect                        | SPEC                                                          | IMPL                                                                                                                           |
| ----------------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Ref Mutations**             | Explicitly allowed via `isRefOrRefLikeMutableType` check      | Not explicitly tracked; refs are treated as regular variables unless they happen to match state/props heuristics               |
| **Immer / Draft**             | Not mentioned                                                 | Explicitly excluded: any mutation whose root identifier is named `draft` is ignored                                            |
| **Event Handler Parameters**  | N/A (context-based, event handlers are not component context) | Explicitly excluded via `propsDefiningFunc` verification: the parameter's defining function must itself be a component or hook |
| **Nested Function Mutations** | Covered naturally via `fn.context`                            | Scope resolution traces references through nested closures back to the original parameter/state declaration                    |

---

## 5. Error Reporting Differences

| Aspect                  | SPEC                                                                                                          | IMPL                                                                                             |
| ----------------------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| **Error Locations**     | **Dual-location**: reports both where the mutable function is _used_ (frozen) and where the _mutation_ occurs | **Single-location**: reports only the mutation site (`CallExpression` or `AssignmentExpression`) |
| **Error Message Style** | "This function may (indirectly) reassign or modify `cache` after render"                                      | "Do not call 'push()' on 'items'. Props and state are immutable — create a new array instead."   |
| **Diagnostic Category** | `ErrorCategory.Immutability` with `CompilerDiagnostic`                                                        | ESLint `meta.messages` with `mutatingArrayMethod` / `mutatingAssignment`                         |

---

## 6. Message ID Mapping

There is **no direct one-to-one mapping** between SPEC and IMPL because the rules address fundamentally different violation patterns:

| MessageID (IMPL)      | Conceptual Overlap with SPEC                                                                                                             |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `mutatingArrayMethod` | **No SPEC equivalent.** SPEC does not flag array mutations directly; it flags the _function containing them_ when frozen                 |
| `mutatingAssignment`  | **No SPEC equivalent.** SPEC flags `StoreContext` on captured variables inside functions, not direct property assignments on state/props |

SPEC error descriptions (from `CompilerDiagnostic`):

- "Cannot modify local variables after render completes"
- "This argument is a function which may reassign or mutate [variable] after render..."

These describe **function-level mutability**, whereas IMPL messages describe **value-level immutability**.

---

## 7. Test Case Overlap

Several IMPL test cases are annotated as ported from React Compiler fixtures (e.g., `error.modify-state.js`, `error.mutate-props.js`, `error.invalid-mutation-in-closure.js`). However, the **reporting mechanism differs**:

| Fixture Source                         | SPEC Behavior                                                                         | IMPL Behavior                                                        |
| -------------------------------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| `error.modify-state.js`                | Likely caught by broader compiler immutability passes                                 | Caught by `mutatingAssignment` on direct `state.foo = 1`             |
| `error.mutate-props.js`                | Likely caught by broader compiler immutability passes                                 | Caught by `mutatingAssignment` on direct `props.test = 1`            |
| `error.invalid-mutation-in-closure.js` | Would be caught by `ValidateNoFreezingKnownMutableFunctions` if the closure is frozen | Caught by `mutatingAssignment` because `options` is a hook parameter |

---

## 8. Summary of Key Gaps / Deviations

1. **Fundamental Rule Mismatch**: IMPL does not implement `ValidateNoFreezingKnownMutableFunctions`. Instead, it implements a distinct rule focused on direct state/props mutation. The two specs are conceptually adjacent (both concern immutability) but operationally different.

2. **Missing Frozen-Context Detection**: IMPL has no concept of `Freeze` effects. It does not detect when a mutable function is passed as a JSX prop, hook argument, or hook return value.

3. **Missing Function-Level Mutability Tracking**: IMPL does not analyze whether a function mutates captured locals. It only checks whether the mutated object itself is state/props.

4. **Missing Effect Propagation**: IMPL does not propagate mutation effects through variable assignments. Each mutation is analyzed independently at its AST site.

5. **Missing Dual-Location Diagnostics**: IMPL reports only the mutation site, whereas SPEC reports both the usage location (freeze point) and the mutation location.

6. **Additional IMPL Capabilities** (not in SPEC):
   - Explicit Immer support via `draft` variable exclusion
   - Explicit event handler parameter exclusion
   - Granular array method allow-list (`MUTATING_ARRAY_METHODS`)
   - Support for `useReducer` state identification
