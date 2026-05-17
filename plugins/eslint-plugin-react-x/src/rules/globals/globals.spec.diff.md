# globals IMPL–SPEC Diff Report

**IMPL**: `globals.ts` (ESLint rule)\
**SPEC**: `globals.spec.md` (React Compiler `InferMutationAliasingEffects` — `StoreGlobal` / `MutateGlobal`)

---

## 1. Underlying Mechanism

The SPEC operates on the React Compiler's HIR during effect inference (`InferMutationAliasingEffects`). When the compiler encounters a `StoreGlobal` instruction — representing assignment to a variable declared outside the current component or hook — it emits a `MutateGlobal` aliasing effect tagged with `ErrorCategory.Globals`. This is part of a broader abstract interpretation framework that tracks `ValueKind` (Global, Frozen, Mutable, Context, etc.) across SSA-form HIR.

The IMPL operates on the ESLint AST with `@typescript-eslint/scope-manager`. It detects mutation patterns at the AST level (`UpdateExpression`, `AssignmentExpression`, `CallExpression`) and determines whether the mutated root identifier is a global or module-scoped variable via `findVariable` and scope type checks (`global` | `module` | no definitions). Violations are recorded immediately and filtered at `Program:exit` to only those whose nearest enclosing function is a component or hook.

---

## 2. Rule 1: Direct Global/Module Variable Mutation

The SPEC detects any `StoreGlobal` HIR instruction, which covers direct reassignment of module-level or global variables (`renderCount = 1`, `someUnknownGlobal = true`) and property assignments on globals (`window.title = x`, `cache[id] = value`) when they are lowered to `StoreGlobal`.

The IMPL detects three AST patterns:

- **UpdateExpression**: `renderCount++`, `--renderCount`, `(window.title as any)++`
- **AssignmentExpression**: `renderCount = 1`, `window.currentUser = id`, `cache[id] = fetchData(id)`
- **MemberExpression updates**: where the root identifier resolves to a global/module variable

The IMPL uses `isGlobalOrModuleVariable()` which returns `true` when:

- the variable has no known definition (`variable == null` or `variable.defs.length === 0`)
- the variable's scope is `global` or `module`

**Verdict**: Both cover direct global mutation, but the IMPL has explicit visitor logic for `UpdateExpression` and `AssignmentExpression` whereas the SPEC handles them uniformly through HIR lowering to `StoreGlobal`.

---

## 3. Rule 2: Global Array Mutation

The SPEC does not have a dedicated concept of "mutating array methods on globals." Array mutations are handled through the general effect inference system (e.g., `MethodCall` signatures with `Mutate` effects on the receiver). A global array mutated via `push()` would be caught if the compiler's inference propagates the mutation back to the global identifier.

The IMPL explicitly detects mutating array method calls on global arrays via a dedicated `CallExpression` visitor and a hardcoded allow-list:

```ts
MUTATING_ARRAY_METHODS = new Set([
  "copyWithin",
  "fill",
  "pop",
  "push",
  "reverse",
  "shift",
  "sort",
  "splice",
  "unshift",
]);
```

It unwraps the callee to a `MemberExpression`, checks the method name against the set, resolves the root identifier of the object, and verifies that root is global/module scoped.

**Verdict**: The IMPL has a granular, explicit check for array mutations that the SPEC lacks as a first-class concept. The SPEC would catch these through general `Mutate` effect propagation, but not with a dedicated array-method allow-list.

---

## 4. Exception Handling

- **Mutations in effects (`useEffect`, `useLayoutEffect`, `useInsertionEffect`)**:
  - The SPEC naturally excludes them if the compiler's render-phase analysis does not traverse effect callbacks as part of the component's render output.
  - The IMPL excludes them because the enclosing function of the mutation is the effect callback, not the component/hook. The `Program:exit` filter (`fc.api.getAllComponents` + `hc.api.getAllHooks`) drops these violations.

- **Mutations in event handlers and callbacks**:
  - The SPEC excludes them when they occur inside callbacks that are not executed during render (e.g., `onClick` handlers, `useCallback` bodies not invoked in render).
  - The IMPL excludes them for the same structural reason: the mutation's enclosing function is the callback, not the component/hook.

- **Local (non-global) variables**:
  - The SPEC does not flag locals because they are lowered to `StoreLocal`, not `StoreGlobal`.
  - The IMPL skips them because `isGlobalOrModuleVariable()` returns `false` for function-scoped or block-scoped locals.

- **Non-component / non-hook functions**:
  - The SPEC analyzes them if present in the compilation unit, but the `MutateGlobal` effect is primarily relevant in render context.
  - The IMPL explicitly ignores them via the `Program:exit` component/hook filter.

- **Reading globals**:
  - Neither the SPEC nor the IMPL flag read-only access to globals (`cache[id]` read, `items.length` read).

---

## 5. Error Reporting

The SPEC reports errors through the compiler's diagnostic system with `ErrorCategory.Globals`. The canonical message is:

> "Cannot reassign variables declared outside of the component/hook"

It reports the location of the `StoreGlobal` instruction in the HIR.

The IMPL reports three distinct message IDs depending on the mutation pattern:

- `mutatingGlobal` — for direct identifier mutation (`renderCount++`, `renderCount = 1`)
- `mutatingGlobalProperty` — for property assignment on a global (`window.title = x`, `cache[id] = value`)
- `mutatingGlobalArrayMethod` — for mutating array method calls on a global (`events.push(1)`)

The IMPL reports only the mutation site (single-location). It does not report dual locations because it has no concept of effect propagation or freeze points.

---

## 6. Message ID Mapping

There is no direct one-to-one mapping because the SPEC's `MutateGlobal` is a single diagnostic category, while the IMPL splits the same underlying violation into three surface patterns:

| IMPL Message ID             | SPEC Equivalent                             | Notes                                                                                               |
| --------------------------- | ------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `mutatingGlobal`            | `ErrorCategory.Globals` (via `StoreGlobal`) | Direct assignment / update to global identifier                                                     |
| `mutatingGlobalProperty`    | `ErrorCategory.Globals` (via `StoreGlobal`) | Property assignment on global object                                                                |
| `mutatingGlobalArrayMethod` | No direct SPEC equivalent                   | SPEC would catch this through general `Mutate` effect inference, not a dedicated array-method check |

---

## 7. Test Case Overlap

Several IMPL test cases are ported from React Compiler fixtures:

- `error.mutate-global-increment-op-invalid-react.js` — IMPL: `mutatingGlobal` on `renderCount++`; SPEC: caught via `StoreGlobal`.
- `error.store-property-in-global.js` — IMPL: `mutatingGlobalProperty` on `wat.test = 1`; SPEC: caught via `StoreGlobal`.
- `error.reassignment-to-global.js` — IMPL: `mutatingGlobal` on `someUnknownGlobal = true` and `moduleLocal = true`; SPEC: caught via `StoreGlobal`.
- `error.update-global-should-bailout.tsx` — IMPL: `mutatingGlobal` on `renderCount += 1` in hook; SPEC: caught via `StoreGlobal`.
- `allow-global-reassignment-in-effect.js` — IMPL: valid (effect callback); SPEC: valid (not render phase).
- `allow-global-mutation-in-effect-indirect.js` — IMPL: valid (effect callback); SPEC: valid.
- `allow-global-mutation-unused-usecallback.js` — IMPL: valid (`useCallback` body); SPEC: valid.
- `allow-modify-global-in-callback-jsx.js` — IMPL: valid (event handler); SPEC: valid.
- `allow-reassignment-to-global-function-jsx-prop.js` — IMPL: valid (event handler); SPEC: valid.
- `error.not-useEffect-external-mutate.js` — IMPL: valid (`foo(() => {...})` callback); SPEC: valid.

**Verdict**: Test coverage is broadly aligned, with the IMPL deriving many cases directly from compiler fixtures.

---

## 8. Key Gaps and Deviations

1. **Granularity of Array Methods**: The IMPL has an explicit allow-list of 9 mutating array methods. The SPEC has no such list; array mutations are inferred from function signatures and `Mutate` effects.

2. **Unknown Globals Handling**: The IMPL treats unresolved identifiers (`someUnknownGlobal = true`) as globals because `findVariable` returns `null` or a variable with zero definitions. The SPEC's `StoreGlobal` is produced by the compiler's HIR builder, which may have different heuristics for what constitutes a global.

3. **No Effect Propagation**: The IMPL analyzes each mutation site independently. It does not propagate mutation effects through local variable assignments or track whether a global is later passed to a frozen context. The SPEC is part of a comprehensive effect-propagation framework.

4. **No ValueKind Lattice**: The SPEC tracks abstract value kinds (`Global`, `Frozen`, `Mutable`, `Context`, `Primitive`) through a lattice. The IMPL has no such abstraction; it only checks scope types at the AST level.

5. **No SSA Form**: The SPEC operates on SSA-form HIR. The IMPL operates on raw AST with scope analysis, which means it cannot reason about control-flow merges or phi nodes.

6. **Nested Function Blindness (Render-Phase)**: The IMPL excludes mutations in nested functions because their enclosing function is not a component/hook. However, if a nested function were synchronously called during render (e.g., `helper()` inside a component), the IMPL would not flag it, whereas the compiler might, depending on inlining and effect analysis.

7. **Property Assignment Granularity**: The IMPL distinguishes `mutatingGlobalProperty` for any `MemberExpression` assignment on a global. The SPEC's `StoreGlobal` records the variable name (`value.name`) but may not surface the same granularity of "property path" in its diagnostic.

8. **Single-Location Reporting**: The IMPL reports only the mutation site. The SPEC, being part of a larger inference system, could theoretically support dual-location reporting (where the global is used and where it is mutated), though `MutateGlobal` currently appears to report the assignment location.
