[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Pred](../README.md) / isSet

# Function: isSet()

> **isSet**(`input`): `input is Set<unknown>`

Tests if a value is a `Set`.

## Parameters

• **input**: `unknown`

The value to test.

## Returns

`input is Set<unknown>`

## Example

```ts
import { isSet } from "effect/Predicate"

assert.deepStrictEqual(isSet(new Set([1, 2])), true)
assert.deepStrictEqual(isSet(new Set()), true)
assert.deepStrictEqual(isSet({}), false)
assert.deepStrictEqual(isSet(null), false)
assert.deepStrictEqual(isSet(undefined), false)
```

## Since

2.0.0
