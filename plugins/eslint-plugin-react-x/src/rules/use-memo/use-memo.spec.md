# validateUseMemo

## Verification metadata

- **React commit**: `c0c39a6b3907eaab35f43074949e2957a2a734c1`
- **Implementation commit (`eslint-react`)**: `55c10db7bae04d49606792767530cc1e786dd5a0`
- **Last verified**: `2026-07-14`
- **React package**: `compiler/packages/babel-plugin-react-compiler`
- **React source**: `src/Validation/ValidateUseMemo.ts`
- **React fixtures**:
  - `src/__tests__/fixtures/compiler/useMemo-empty-return.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/error.invalid-useMemo-callback-args.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/error.invalid-useMemo-async-callback.{js,expect.md}`
  - `src/__tests__/fixtures/compiler/error.invalid-reassign-variable-in-usememo.{js,expect.md}`
- **Implementation sources**:
  - `plugins/eslint-plugin-react-x/src/rules/use-memo/use-memo.ts`
  - `plugins/eslint-plugin-react-x/src/rules/use-memo/lib.ts`

## File

`src/Validation/ValidateUseMemo.ts`

## Purpose

This validation pass ensures that `useMemo()` callbacks follow React's requirements. The pass checks for several common mistakes that developers make when using `useMemo()`:

1. Callbacks should not accept parameters (useMemo callbacks are called with no arguments)
2. Callbacks should not be async or generator functions (must return a value synchronously)
3. Callbacks should not reassign variables declared outside the callback (must be pure)
4. When `validateNoVoidUseMemo` is enabled, callbacks should return a value (useMemo is for computing values, not side effects)
5. When `validateNoVoidUseMemo` is enabled, the result of useMemo should be used (not discarded)

## Input Invariants

- The function has been lowered to HIR
- `useMemo` is either imported directly or accessed via `React.useMemo`
- Function expressions have been lowered with their parameters and async/generator flags preserved

## Validation Rules

### Rule 1: No Parameters

useMemo callbacks must not accept parameters.

**Error:**

```
Error: useMemo() callbacks may not accept parameters

useMemo() callbacks are called by React to cache calculations across re-renders. They should not take parameters. Instead, directly reference the props, state, or local variables needed for the computation.
```

### Rule 2: No Async or Generator Functions

useMemo callbacks must synchronously return a value.

**Error:**

```
Error: useMemo() callbacks may not be async or generator functions

useMemo() callbacks are called once and must synchronously return a value.
```

### Rule 3: No Reassigning Outer Variables

useMemo callbacks cannot reassign variables declared outside the callback.

**Error:**

```
Error: useMemo() callbacks may not reassign variables declared outside of the callback

useMemo() callbacks must be pure functions and cannot reassign variables defined outside of the callback function.
```

### Rule 4: Must Return a Value (when `validateNoVoidUseMemo` is enabled)

useMemo callbacks should return a value.

**Error:**

```
Error: useMemo() callbacks must return a value

This useMemo() callback doesn't return a value. useMemo() is for computing and caching values, not for arbitrary side effects.
```

### Rule 5: Result Must Be Used (when `validateNoVoidUseMemo` is enabled)

The result of useMemo should be used somewhere.

**Error:**

```
Error: useMemo() result is unused

This useMemo() value is unused. useMemo() is for computing and caching values, not for arbitrary side effects.
```

## Algorithm

### Phase 1: Track useMemo References

```typescript
const useMemos = new Set<IdentifierId>();
const react = new Set<IdentifierId>();
const functions = new Map<IdentifierId, FunctionExpression>();
const unusedUseMemos = new Map<IdentifierId, SourceLocation>();
```

The pass tracks:

- Direct `useMemo` imports via `LoadGlobal`
- `React` imports to detect `React.useMemo` pattern
- Function expressions that might be useMemo callbacks
- Unused useMemo results

### Phase 2: Identify useMemo Calls

```typescript
for (const instr of block.instructions) {
  switch (value.kind) {
    case "LoadGlobal":
      if (value.binding.name === "useMemo") {
        useMemos.add(lvalue.identifier.id);
      } else if (value.binding.name === "React") {
        react.add(lvalue.identifier.id);
      }
      break;
    case "PropertyLoad":
      if (react.has(value.object.identifier.id) && value.property === "useMemo") {
        useMemos.add(lvalue.identifier.id);
      }
      break;
    case "CallExpression":
    case "MethodCall":
      // Check if callee is useMemo
      const callee = value.kind === "CallExpression" ? value.callee : value.property;
      if (useMemos.has(callee.identifier.id) && value.args.length > 0) {
        // Validate the callback
      }
      break;
  }
}
```

### Phase 3: Validate Callback

For each useMemo call, the pass retrieves the callback function expression and validates:

```typescript
const body = functions.get(arg.identifier.id);

// Check for parameters
if (body.loweredFunc.func.params.length > 0) {
  errors.push("useMemo() callbacks may not accept parameters");
}

// Check for async/generator
if (body.loweredFunc.func.async || body.loweredFunc.func.generator) {
  errors.push("useMemo() callbacks may not be async or generator functions");
}

// Check for context variable reassignment
validateNoContextVariableAssignment(body.loweredFunc.func, errors);

// Check for return value (if config enabled)
if (fn.env.config.validateNoVoidUseMemo) {
  if (!hasNonVoidReturn(body.loweredFunc.func)) {
    errors.push("useMemo() callbacks must return a value");
  }
}
```

### Phase 4: Validate No Context Variable Assignment

```typescript
function validateNoContextVariableAssignment(fn: HIRFunction, errors: CompilerError) {
  const context = new Set(fn.context.map(place => place.identifier.id));
  for (const block of fn.body.blocks.values()) {
    for (const instr of block.instructions) {
      if (value.kind === "StoreContext") {
        if (context.has(value.lvalue.place.identifier.id)) {
          errors.push("Cannot reassign variable");
        }
      }
    }
  }
}
```

### Phase 5: Check for Unused Results

When `validateNoVoidUseMemo` is enabled and the callback passes `hasNonVoidReturn`, the call result is added to `unusedUseMemos`. Subsequent instruction and terminal operands remove matching identifiers:

```typescript
for (const operand of eachInstructionValueOperand(value)) {
  unusedUseMemos.delete(operand.identifier.id);
}

for (const operand of eachTerminalOperand(block.terminal)) {
  unusedUseMemos.delete(operand.identifier.id);
}

for (const loc of unusedUseMemos.values()) {
  errors.push("useMemo() result is unused");
}
```

This is a basic pre-DCE operand-reference check: any later operand reference counts as use. It is not full SSA liveness analysis.

### Return Value Helper

```typescript
function hasNonVoidReturn(func: HIRFunction): boolean {
  for (const [, block] of func.body.blocks) {
    if (block.terminal.kind === "return") {
      if (block.terminal.returnVariant === "Explicit" || block.terminal.returnVariant === "Implicit") {
        return true;
      }
    }
  }
  return false;
}
```

## Edge Cases

### React.useMemo and useMemo

The pass handles both import styles:

```javascript
import { useMemo } from "react";
useMemo(() => x, [x]);

import React from "react";
React.useMemo(() => x, [x]);
```

### Immediately Used Results

Results that are used immediately don't trigger the "unused" warning:

```javascript
const x = useMemo(() => compute(), [dep]);
return x; // x is used
```

### Empty Return Is Accepted

At the verified React commit, `hasNonVoidReturn` accepts a return terminal whose `returnVariant` is `Explicit` or `Implicit`; it does not inspect whether the source return has a value. A callback containing only `return;` therefore passes the "must return a value" check.

This is also fixture-verified by `useMemo-empty-return.{js,expect.md}`:

```javascript
// @validateNoVoidUseMemo
function Component() {
  const value = useMemo(() => {
    return;
  }, []);
  return <div>{value}</div>;
}
```

The expected file contains normally compiled output and no `VoidUseMemo` diagnostic; the resulting JSX value is `undefined`.

### VoidUseMemo Errors as Logged Errors

The pass accumulates the no-return and unused-result diagnostics in `voidMemoErrors`, then passes `voidMemoErrors.asResult()` to `fn.env.logErrors()` after scanning the function. Rules 1–3 instead call `fn.env.recordError()` directly.

## Verification Boundaries

### Source-verified

- Rules 4 and 5 run only when `validateNoVoidUseMemo` is enabled.
- `hasNonVoidReturn` accepts `Explicit` and `Implicit` return variants without checking for a returned source value.
- The unused-result check removes entries on instruction or terminal operand references; it is a basic use check rather than full SSA liveness.
- `VoidUseMemo` diagnostics are accumulated and sent through `fn.env.logErrors()`, while Rules 1–3 use `fn.env.recordError()`.

### Fixture-verified

- `useMemo-empty-return.{js,expect.md}` locks in successful compilation of a callback containing only `return;` under `@validateNoVoidUseMemo`.
- The three error fixture pairs listed in the metadata lock the parameter, async-callback, and captured-variable-reassignment diagnostics reproduced below.

## TODOs

None in the source file.

## Example

### Fixture: `error.invalid-useMemo-callback-args.js`

**Input:**

```javascript
function component(a, b) {
  let x = useMemo(c => a, []);
  return x;
}
```

**Error:**

```
Error: useMemo() callbacks may not accept parameters

useMemo() callbacks are called by React to cache calculations across re-renders. They should not take parameters. Instead, directly reference the props, state, or local variables needed for the computation.

error.invalid-useMemo-callback-args.ts:2:18
  1 | function component(a, b) {
> 2 |   let x = useMemo(c => a, []);
    |                   ^ Callbacks with parameters are not supported
  3 |   return x;
  4 | }
```

### Fixture: `error.invalid-useMemo-async-callback.js`

**Input:**

```javascript
function component(a, b) {
  let x = useMemo(async () => {
    await a;
  }, []);
  return x;
}
```

**Error:**

```
Error: useMemo() callbacks may not be async or generator functions

useMemo() callbacks are called once and must synchronously return a value.

error.invalid-useMemo-async-callback.ts:2:18
  1 | function component(a, b) {
> 2 |   let x = useMemo(async () => {
    |                   ^^^^^^^^^^^^^
> 3 |     await a;
    | ^^^^^^^^^^^^
> 4 |   }, []);
    | ^^^^ Async and generator functions are not supported
```

### Fixture: `error.invalid-reassign-variable-in-usememo.js`

**Input:**

```javascript
function Component() {
  let x;
  const y = useMemo(() => {
    let z;
    x = [];
    z = true;
    return z;
  }, []);
  return [x, y];
}
```

**Error:**

```
Error: useMemo() callbacks may not reassign variables declared outside of the callback

useMemo() callbacks must be pure functions and cannot reassign variables defined outside of the callback function.

error.invalid-reassign-variable-in-usememo.ts:5:4
  3 |   const y = useMemo(() => {
  4 |     let z;
> 5 |     x = [];
    |     ^ Cannot reassign variable
  6 |     z = true;
  7 |     return z;
  8 |   }, []);
```
