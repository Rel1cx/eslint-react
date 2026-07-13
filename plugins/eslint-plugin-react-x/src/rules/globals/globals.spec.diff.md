# globals IMPL–SPEC Diff Report

## Verification metadata

- **IMPL**: `globals.ts` + `lib.ts` (ESLint rule)
- **SPEC**: `globals.spec.md` (React Compiler `InferMutationAliasingEffects`)
- **Implementation commit**: `55c10db7bae04d49606792767530cc1e786dd5a0`
- **React commit**: `c0c39a6b3907eaab35f43074949e2957a2a734c1`
- **Last verified**: `2026-07-14`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **Implementation sources/tests**:
  - `globals.ts`
  - `lib.ts`
  - `globals.spec.ts`
- **React sources/fixtures**:
  - `src/Inference/InferMutationAliasingEffects.ts`

## 1. Underlying mechanism

The SPEC runs abstract interpretation over SSA-form HIR. It computes instruction signatures, applies aliasing effects to an `InferenceState`, and iterates control flow to a fixed point. A write to a non-local binding is represented as `MutateGlobal` and reported under `ErrorCategory.Globals`.

The IMPL runs on the ESLint AST without type information or HIR. It mirrors the relevant parts of the SPEC with three lightweight phases:

1. Resolve global/module bindings and stable local aliases.
2. Summarize direct mutation effects and direct local call edges per function.
3. Starting from detected components and Hooks, apply effects transitively through the call graph.

This separation is important: a function may carry a global mutation effect without executing during render.

## 2. Mutation effects

The IMPL creates effects for:

- identifier and property writes in `AssignmentExpression`
- nested array/object destructuring assignment targets
- identifier and property `UpdateExpression` targets
- property deletion with `delete`
- known mutating array method calls

Unresolved identifiers and bindings declared in global or module scope are treated as globals. Local binding reassignment is not considered a global mutation, even when the local was initialized from a global primitive.

## 3. Alias handling

The SPEC tracks `Assign`, `Alias`, `Capture`, and related effects through abstract values and control-flow joins.

The IMPL follows a deliberately narrower alias model:

```ts
const alias = globalObject;
const nested = alias.value;
```

Property mutations through these stable `const` aliases are attributed to the original global binding. Alias chains and member-expression aliases are supported. Reassigned `let` aliases, destructured aliases, function return aliases, and control-flow/phi merges are not inferred because doing so soundly requires data-flow analysis.

Direct reassignment of a local alias is still local:

```ts
let local = moduleCount;
local++; // allowed
```

## 4. Function effect propagation

Direct calls to local functions add call-graph edges. At `Program:exit`, global mutation effects are propagated from components and Hooks through those edges:

```ts
const mutate = () => {
  moduleValue = true;
};

function Component() {
  mutate(); // the mutation effect is reachable during render
  return <div />;
}
```

Effects are not propagated merely because a function is lexically nested or passed as a value. This keeps effect callbacks and event handlers valid when they are not called during render:

```ts
useEffect(() => mutate(), []);
return <button onClick={() => mutate()} />;
```

The IMPL currently resolves function declarations, function expressions, arrow functions, and simple identifier aliases. Calls through object properties, returned functions, or dynamic dispatch are not resolved.

## 5. Mutating array methods

The SPEC derives receiver mutation from built-in function signatures. The IMPL uses an explicit method set because the AST alone cannot inspect function signatures:

```ts
copyWithin, fill, pop, push, reverse, shift, sort, splice, unshift;
```

Computed static property names such as `items["push"]()` are supported. This remains less general than the SPEC and can neither recognize arbitrary user-defined mutators nor prove the receiver's runtime type.

## 6. Render boundaries

Only functions recognized by the component and Hook collectors are analysis roots. Non-component functions are summarized and reported when transitively reachable from a render root through recorded direct-call edges.

A nested function that is only stored, returned, passed to a Hook, passed to an unknown function, or used as an event callback is not considered render-executed. A nested function called synchronously from a render root is considered render-executed.

## 7. Error reporting

The SPEC uses one globals diagnostic category. The IMPL keeps three surface-specific messages:

| IMPL message ID             | Use                                                      |
| --------------------------- | -------------------------------------------------------- |
| `mutatingGlobal`            | direct assignment/update of a global binding             |
| `mutatingGlobalProperty`    | assignment/update/delete of a property on a global value |
| `mutatingGlobalArrayMethod` | known mutating array method on a global value            |

Diagnostics are reported at the original mutation site, including when the effect reaches render through helper calls.

## 8. Remaining gaps

- No SSA, control-flow fixed point, or phi-node handling.
- No `ValueKind` lattice or frozen/context value validation.
- Alias resolution is limited to stable direct `const` chains.
- Method effects use a fixed array-method set instead of type signatures.
- Dynamic calls and callback execution semantics are not inferred.
- Component/Hook coverage depends on the repository's collectors rather than compiler entrypoint metadata.

These constraints keep the ESLint rule fast and parser-service independent while covering the SPEC's most relevant `Alias`, `MutateGlobal`, and transitive direct-call behavior.
