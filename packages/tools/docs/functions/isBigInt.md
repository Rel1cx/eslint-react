[**@eslint-react/tools**](../README.md)

***

[@eslint-react/tools](../README.md) / isBigInt

# Function: isBigInt()

> **isBigInt**(`input`): `input is bigint`

Tests if a value is a `bigint`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is bigint`

## Example

```ts
import { isBigInt } from "effect/Predicate"

assert.deepStrictEqual(isBigInt(1n), true)

assert.deepStrictEqual(isBigInt(1), false)
```

## Since

2.0.0
