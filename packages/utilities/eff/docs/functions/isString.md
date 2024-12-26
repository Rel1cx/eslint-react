[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / isString

# Function: isString()

> **isString**(`input`): `input is string`

Tests if a value is a `string`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is string`

## Example

```ts
import { isString } from "effect/Predicate"

assert.deepStrictEqual(isString("a"), true)

assert.deepStrictEqual(isString(1), false)
```

## Since

2.0.0
