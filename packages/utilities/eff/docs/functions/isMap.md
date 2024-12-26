[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / isMap

# Function: isMap()

> **isMap**(`input`): `input is Map<unknown, unknown>`

Tests if a value is a `Map`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is Map<unknown, unknown>`

## Example

```ts
import { isMap } from "effect/Predicate"

assert.deepStrictEqual(isMap(new Map()), true)
assert.deepStrictEqual(isMap({}), false)
assert.deepStrictEqual(isMap(null), false)
assert.deepStrictEqual(isMap(undefined), false)
```

## Since

2.0.0
