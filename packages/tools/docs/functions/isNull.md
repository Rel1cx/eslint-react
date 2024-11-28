[**@eslint-react/tools**](../README.md)

***

[@eslint-react/tools](../README.md) / isNull

# Function: isNull()

> **isNull**(`input`): `input is null`

Tests if a value is `null`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is null`

## Example

```ts
import { isNull } from "effect/Predicate"

assert.deepStrictEqual(isNull(null), true)

assert.deepStrictEqual(isNull(undefined), false)
assert.deepStrictEqual(isNull("null"), false)
```

## Since

2.0.0
