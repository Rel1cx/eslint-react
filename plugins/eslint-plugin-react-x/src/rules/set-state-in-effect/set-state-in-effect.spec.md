# validateNoSetStateInEffects

## File

`src/Validation/ValidateNoSetStateInEffects.ts`

## Purpose

Validates against calling `setState` synchronously in the body of an effect (`useEffect`, `useLayoutEffect`, `useInsertionEffect`), while allowing `setState` in callbacks scheduled by the effect. Synchronous setState in effects triggers cascading re-renders which hurts performance.

See: https://react.dev/learn/you-might-not-need-an-effect

## Input Invariants

- Operates on HIRFunction (pre-reactive scope inference)
- Effect hooks must be identified (`isUseEffectHookType`, `isUseLayoutEffectHookType`, `isUseInsertionEffectHookType`)
- setState functions must be identified (`isSetStateType`)
- Only runs when `outputMode === 'lint'`

## Validation Rules

This pass detects synchronous setState calls within effect bodies:

**Standard error message:**

```
Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended.
```

**Verbose error message** (when `enableVerboseNoSetStateInEffect` is enabled):
Provides more detailed guidance about specific anti-patterns like non-local derived data, derived event patterns, and force update patterns.

## Algorithm

1. **Main function traversal**: Build a map `setStateFunctions` tracking which identifiers are setState functions
2. For each instruction:
   - **LoadLocal/StoreLocal**: Propagate setState tracking through variable assignments
   - **FunctionExpression**: Check if the function synchronously calls setState by recursively calling `getSetStateCall()`. If so, track the function as a setState-calling function
   - **useEffectEvent call**: If the argument is a function that calls setState, track the return value as a setState function
   - **useEffect/useLayoutEffect/useInsertionEffect call**: Check if the callback argument is tracked as calling setState. If so, emit an error

3. **`getSetStateCall()` helper**: Recursively analyzes a function to find synchronous setState calls:
   - Tracks ref-derived values when `enableAllowSetStateFromRefsInEffects` is enabled
   - Propagates setState tracking through local variables
   - Returns the Place of the setState call if found, null otherwise

### Ref-derived setState exception

When `enableAllowSetStateFromRefsInEffects` is enabled, the pass allows setState calls where:

- The value being set is derived from a ref (`useRef` or `ref.current`)
- The block containing setState is controlled by a ref-dependent condition

This allows patterns like storing initial layout measurements from refs in state.

## Edge Cases

### Allowed: setState in callbacks

```javascript
// Valid - setState in event callback, not synchronous
useEffect(() => {
  const handler = () => {
    setState(newValue);
  };
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);
```

### Transitive detection

```javascript
// Detected - transitive through function calls
const f = () => setState(value);
const g = () => f();
useEffect(() => {
  g(); // Error: calls setState transitively
});
```

### useEffectEvent tracking

```javascript
// Detected - useEffectEvent that calls setState is tracked
const handler = useEffectEvent(() => {
  setState(value);
});
useEffect(() => {
  handler(); // Error: handler calls setState
});
```

### Allowed: Ref-derived state (with flag)

```javascript
// Valid when enableAllowSetStateFromRefsInEffects is true
const ref = useRef(null);
useEffect(() => {
  const width = ref.current.offsetWidth;
  setWidth(width); // Allowed - derived from ref
}, []);
```

## TODOs

From the source code:

```typescript
/*
 * TODO: once we support multiple locations per error, we should link to the
 * original Place in the case that setStateFunction.has(callee)
 */
```

## Example

### Fixture: `invalid-setState-in-useEffect-transitive.js`

**Input:**

```javascript
// @loggerTestOnly @validateNoSetStateInEffects @outputMode:"lint"
import { useEffect, useState } from "react";

function Component() {
  const [state, setState] = useState(0);
  const f = () => {
    setState(s => s + 1);
  };
  const g = () => {
    f();
  };
  useEffect(() => {
    g();
  });
  return state;
}
```

**Error:**

```
Error: Calling setState synchronously within an effect can trigger cascading renders

Effects are intended to synchronize state between React and external systems such as manually updating the DOM, state management libraries, or other platform APIs. In general, the body of an effect should do one or both of the following:
* Update external systems with the latest state from React.
* Subscribe for updates from some external system, calling setState in a callback function when external state changes.

Calling setState synchronously within an effect body causes cascading renders that can hurt performance, and is not recommended.

invalid-setState-in-useEffect-transitive.ts:13:4
  11 |   };
  12 |   useEffect(() => {
> 13 |     g();
     |     ^ Avoid calling setState() directly within an effect
  14 |   });
```

**Why it fails:** Even though `setState` is not called directly in the effect, the pass traces through `g()` -> `f()` -> `setState()` and detects that the effect synchronously triggers a state update.

# validateNoDerivedComputationsInEffects

## File

`src/Validation/ValidateNoDerivedComputationsInEffects.ts`

## Purpose

Validates that `useEffect` is not used for derived computations that could and should be performed during render. This catches a common anti-pattern where developers use effects to synchronize derived state, which causes unnecessary re-renders and complexity.

See: https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state

## Input Invariants

- Operates on HIRFunction (pre-reactive scope inference)
- Effect hooks must be identified (`isUseEffectHookType`)
- setState functions must be identified (`isSetStateType`)

## Validation Rules

The pass detects when an effect:

1. Has a dependency array (2nd argument)
2. The effect function only captures the dependencies and setState functions
3. The effect calls setState with a value derived solely from the dependencies
4. The effect has no control flow (loops with back edges)

When detected, it produces:

```
Error: Values derived from props and state should be calculated during render, not in an effect. (https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state)
```

## Algorithm

1. **Collection Phase**: Traverse all instructions to collect:
   - `candidateDependencies`: Map of ArrayExpression identifiers (potential deps arrays)
   - `functions`: Map of FunctionExpression identifiers (potential effect callbacks)
   - `locals`: Map of LoadLocal sources for identifier resolution

2. **Detection Phase**: When a `useEffect` call is found with 2 arguments:
   - Look up the effect function and dependencies array
   - Verify all dependency array elements are identifiers
   - Call `validateEffect()` on the effect function

3. **Effect Validation** (`validateEffect`):
   - Check that the effect only captures dependencies or setState functions
   - Check that all dependencies are actually used in the effect
   - Skip if any block has a back edge (loop)
   - Track data flow through instructions:
     - `LoadLocal`: Propagate dependency tracking
     - `PropertyLoad`, `BinaryExpression`, `TemplateLiteral`, `CallExpression`, `MethodCall`: Aggregate dependencies from operands
   - When `setState` is called with a single argument that depends on ALL effect dependencies, record the location
   - If any dependency is used in a terminal operand (control flow), abort validation
   - Push errors for all recorded setState locations

### Value Tracking

The pass maintains a `values` map from `IdentifierId` to `Array<IdentifierId>` tracking which effect dependencies each value derives from. When setState is called, if the argument derives from all dependencies, it's flagged as a derived computation.

## Edge Cases

### Allowed: Effects with side effects

```javascript
// Valid - effect captures external values, not just deps
useEffect(() => {
  logToServer(firstName);
  setFullName(firstName);
}, [firstName]);
```

### Allowed: Effects with loops

```javascript
// Valid - has control flow, not a simple derivation
useEffect(() => {
  let result = "";
  for (const item of items) {
    result += item;
  }
  setResult(result);
}, [items]);
```

### Allowed: Effects with conditional setState

```javascript
// Valid - setState is conditional on control flow
useEffect(() => {
  if (condition) {
    setFullName(firstName + lastName);
  }
}, [firstName, lastName]);
```

### Not detected: Subset of dependencies

```javascript
// Not flagged - only uses firstName, not lastName
useEffect(() => {
  setResult(firstName);
}, [firstName, lastName]);
```

## TODOs

None in source code.

## Example

### Fixture: `error.invalid-derived-computation-in-effect.js`

**Input:**

```javascript
// @validateNoDerivedComputationsInEffects
import { useEffect, useState } from "react";

function BadExample() {
  const [firstName, setFirstName] = useState("Taylor");
  const [lastName, setLastName] = useState("Swift");

  // Avoid: redundant state and unnecessary Effect
  const [fullName, setFullName] = useState("");
  useEffect(() => {
    setFullName(firstName + " " + lastName);
  }, [firstName, lastName]);

  return <div>{fullName}</div>;
}
```

**Error:**

```
Found 1 error:

Error: Values derived from props and state should be calculated during render, not in an effect. (https://react.dev/learn/you-might-not-need-an-effect#updating-state-based-on-props-or-state)

error.invalid-derived-computation-in-effect.ts:11:4
   9 |   const [fullName, setFullName] = useState('');
  10 |   useEffect(() => {
> 11 |     setFullName(firstName + ' ' + lastName);
     |     ^^^^^^^^^^^ Values derived from props and state should be calculated during render, not in an effect.
  12 |   }, [firstName, lastName]);
  13 |
  14 |   return <div>{fullName}</div>;
```

**Why it fails:** The effect computes `fullName` purely from `firstName` and `lastName` (the dependencies) and then sets state. This is a derived computation that should be calculated during render:

```javascript
// Correct approach
const fullName = firstName + " " + lastName;
```
