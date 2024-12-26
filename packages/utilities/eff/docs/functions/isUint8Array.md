[**@eslint-react/tools**](../README.md)

***

[@eslint-react/tools](../README.md) / isUint8Array

# Function: isUint8Array()

> **isUint8Array**(`input`): `input is Uint8Array`

A guard that succeeds when the input is a `Uint8Array`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is Uint8Array`

## Example

```ts
import { isUint8Array } from "effect/Predicate"

assert.deepStrictEqual(isUint8Array(new Uint8Array()), true)

assert.deepStrictEqual(isUint8Array(null), false)
assert.deepStrictEqual(isUint8Array({}), false)
```

## Since

2.0.0
