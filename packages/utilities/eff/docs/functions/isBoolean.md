[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / isBoolean

# Function: isBoolean()

> **isBoolean**(`input`): `input is boolean`

Tests if a value is a `boolean`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is boolean`

## Example

```ts
import { isBoolean } from "effect/Predicate"

assert.deepStrictEqual(isBoolean(true), true)

assert.deepStrictEqual(isBoolean("true"), false)
```

## Since

2.0.0
