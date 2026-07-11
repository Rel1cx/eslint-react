# validateNoFreezingKnownMutableFunctions

## File

`compiler/packages/babel-plugin-react-compiler/src/Validation/ValidateNoFreezingKnownMutableFunctions.ts`

## Purpose

This validation pass ensures that functions with known mutations (functions that mutate captured local variables) are not passed where a frozen value is expected. Frozen contexts include JSX props, hook arguments, and return values from hooks.

The key insight is that a function which mutates captured variables is effectively a mutable value itself. Unlike a mutable array (which a receiver can choose not to mutate), there is no way for the receiver of a function to prevent the mutation from happening when the function is called. Therefore, passing such functions to props or hooks violates React's expectation that rendered values are immutable.

## Input Invariants

- The function has been through aliasing effect inference
- `aliasingEffects` on FunctionExpression values have been computed
- `Mutate` and `MutateTransitive` effects identify definite mutations to captured variables

## Validation Rules

The pass produces errors when:

1. **Mutable function passed as JSX prop**: A function that mutates a captured variable is passed as a prop to a JSX element
2. **Mutable function passed to hook**: A function that mutates a captured variable is passed as an argument to a hook
3. **Mutable function returned from hook**: A function that mutates a captured variable is returned from a hook

**Exception - Ref mutations**: Functions that mutate refs (`isRefOrRefLikeMutableType`) are allowed, since refs are mutable by design and not tracked for rendering purposes.

Error messages produced:

- Category: `Immutability`
- Reason: "Cannot modify local variables after render completes"
- Description: "This argument is a function which may reassign or mutate [variable] after render, which can cause inconsistent behavior on subsequent renders. Consider using state instead"
- Messages:
  - "This function may (indirectly) reassign or modify [variable] after render"
  - "This modifies [variable]"

## Algorithm

The pass consumes HIR after aliasing-effect inference. It does not identify JSX or hook syntax directly; it validates operands that earlier compiler phases have marked with `Effect.Freeze`.

### Phase 1: Track Known Context Mutations

The pass maintains one representative definite mutation effect for each known-mutable HIR value:

```typescript
const contextMutationEffects: Map<
  IdentifierId,
  Extract<AliasingEffect, { kind: "Mutate" } | { kind: "MutateTransitive" }>
> = new Map();
```

`LoadLocal` and `StoreLocal` propagate known effects between HIR identifiers. For a `FunctionExpression`, the pass examines the lowered function's inferred aliasing effects:

```typescript
case "FunctionExpression": {
  if (value.loweredFunc.func.aliasingEffects != null) {
    const context = new Set(
      value.loweredFunc.func.context.map(place => place.identifier.id),
    );

    effects: for (const effect of value.loweredFunc.func.aliasingEffects) {
      switch (effect.kind) {
        case "Mutate":
        case "MutateTransitive": {
          const knownMutation = contextMutationEffects.get(
            effect.value.identifier.id,
          );
          if (knownMutation != null) {
            contextMutationEffects.set(lvalue.identifier.id, knownMutation);
          } else if (
            context.has(effect.value.identifier.id)
            && !isRefOrRefLikeMutableType(effect.value.identifier.type)
          ) {
            contextMutationEffects.set(lvalue.identifier.id, effect);
            break effects;
          }
          break;
        }
        case "MutateConditionally":
        case "MutateTransitiveConditionally": {
          const knownMutation = contextMutationEffects.get(
            effect.value.identifier.id,
          );
          if (knownMutation != null) {
            contextMutationEffects.set(lvalue.identifier.id, knownMutation);
          }
          break;
        }
      }
    }
  }
  break;
}
```

A standalone conditional effect does not make a function known-mutable. It can only propagate a mutation that is already known. Once a direct definite context mutation is selected, `break effects` keeps that effect as the function value's representative mutation.

### Phase 2: Validate Frozen Operands

For every non-load/store/function instruction, the pass visits all value operands. It also visits terminal operands after each block, which covers frozen values used by returns and other terminals:

```typescript
function visitOperand(operand: Place): void {
  if (operand.effect !== Effect.Freeze) return;
  const effect = contextMutationEffects.get(operand.identifier.id);
  if (effect == null) return;

  fn.env.recordError(
    CompilerDiagnostic.create({
      category: ErrorCategory.Immutability,
      reason: "Cannot modify local variables after render completes",
      description: `This argument is a function which may reassign or mutate ${variable} after render...`,
    })
      .withDetails({ loc: operand.loc, message: "This function may..." })
      .withDetails({ loc: effect.value.loc, message: "This modifies..." }),
  );
}

for (const block of fn.body.blocks.values()) {
  for (const instruction of block.instructions) {
    // Propagate LoadLocal, StoreLocal, and FunctionExpression effects;
    // call visitOperand for operands of all other instruction values.
  }
  for (const operand of eachTerminalOperand(block.terminal)) {
    visitOperand(operand);
  }
}
```

## Edge Cases

### Function Passed as JSX Prop (Error)

```javascript
function Component() {
  const cache = new Map();
  const fn = () => {
    cache.set("key", "value"); // Mutates captured variable
  };
  return <Foo fn={fn} />; // Error: fn is frozen but mutates cache
}
```

### Function Passed to Hook (Error)

```javascript
function useFoo() {
  const cache = new Map();
  useHook(() => {
    cache.set("key", "value"); // Error: function mutates cache
  });
}
```

### Function Returned from Hook (Error)

```javascript
function useFoo() {
  useHook(); // For hook inference
  const cache = new Map();
  return () => {
    cache.set("key", "value"); // Error: returned function mutates cache
  };
}
```

### Ref Mutation (Allowed)

```javascript
function Component() {
  const ref = useRef(null);
  const fn = () => {
    ref.current = value; // 🔵 OK: refs are mutable by design
  };
  return <Foo fn={fn} />; // Allowed
}
```

### Conditional Mutations

The pass does not create a known-mutable function from standalone `MutateConditionally` or `MutateTransitiveConditionally` effects. If such an effect targets a HIR value that already carries a known mutation, that existing definite mutation is propagated to the new function value.

### Function Value Aliases

Mutation effects propagate through local loads and stores:

```javascript
function Component() {
  const cache = new Map();
  const inner = () => cache.set("key", "value");
  const outer = inner; // outer inherits mutation effect
  return <Foo fn={outer} />; // Error
}
```

## TODOs

None in the source file.

## Example

### Fixture: `error.invalid-pass-mutable-function-as-prop.js`

**Input:**

```javascript
// @validateNoFreezingKnownMutableFunctions
function Component() {
  const cache = new Map();
  const fn = () => {
    cache.set("key", "value");
  };
  return <Foo fn={fn} />;
}
```

**Error:**

```
Found 1 error:

Error: Cannot modify local variables after render completes

This argument is a function which may reassign or mutate `cache` after render, which can cause inconsistent behavior on subsequent renders. Consider using state instead.

error.invalid-pass-mutable-function-as-prop.ts:7:18
  5 |     cache.set('key', 'value');
  6 |   };
> 7 |   return <Foo fn={fn} />;
    |                   ^^ This function may (indirectly) reassign or modify `cache` after render
  8 | }
  9 |

error.invalid-pass-mutable-function-as-prop.ts:5:4
  3 |   const cache = new Map();
  4 |   const fn = () => {
> 5 |     cache.set('key', 'value');
    |     ^^^^^ This modifies `cache`
  6 |   };
  7 |   return <Foo fn={fn} />;
  8 | }
```

### Fixture: `error.invalid-hook-function-argument-mutates-local-variable.js`

**Input:**

```javascript
// @validateNoFreezingKnownMutableFunctions

function useFoo() {
  const cache = new Map();
  useHook(() => {
    cache.set("key", "value");
  });
}
```

**Error:**

```
Found 1 error:

Error: Cannot modify local variables after render completes

This argument is a function which may reassign or mutate `cache` after render, which can cause inconsistent behavior on subsequent renders. Consider using state instead.

error.invalid-hook-function-argument-mutates-local-variable.ts:5:10
  3 | function useFoo() {
  4 |   const cache = new Map();
> 5 |   useHook(() => {
    |           ^^^^^^^
> 6 |     cache.set('key', 'value');
    | ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
> 7 |   });
    | ^^^^ This function may (indirectly) reassign or modify `cache` after render
  8 | }
  9 |

error.invalid-hook-function-argument-mutates-local-variable.ts:6:4
  4 |   const cache = new Map();
  5 |   useHook(() => {
> 6 |     cache.set('key', 'value');
    |     ^^^^^ This modifies `cache`
  7 |   });
  8 | }
  9 |
```

Key observations:

- The pass detects functions that mutate captured local variables (not refs)
- Errors show both where the function is used (frozen) and where the mutation occurs
- The validation prevents inconsistent re-render behavior by catching mutations that happen after render
- The suggestion to "use state instead" guides users toward the correct React pattern
