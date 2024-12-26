[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / isNumber

# Function: isNumber()

> **isNumber**(`input`): `input is number`

Tests if a value is a `number`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is number`

## Example

```ts
import { isNumber } from "effect/Predicate"

assert.deepStrictEqual(isNumber(2), true)

assert.deepStrictEqual(isNumber("2"), false)
```

## Since

2.0.0
