[**@eslint-react/tools**](../README.md)

***

[@eslint-react/tools](../README.md) / isTruthy

# Function: isTruthy()

> **isTruthy**(`input`): `boolean`

Tests if a value is `truthy`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`boolean`

## Example

```ts
import { isTruthy } from "effect/Predicate"

assert.deepStrictEqual(isTruthy(1), true)
assert.deepStrictEqual(isTruthy(0), false)
assert.deepStrictEqual(isTruthy(""), false)
```

## Since

2.0.0
