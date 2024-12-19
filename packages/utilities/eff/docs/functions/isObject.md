[**@eslint-react/tools**](../README.md)

***

[@eslint-react/tools](../README.md) / isObject

# Function: isObject()

> **isObject**(`input`): `input is object`

Tests if a value is an `object`.

## Parameters

### input

`unknown`

The value to test.

## Returns

`input is object`

## Example

```ts
import { isObject } from "effect/Predicate"

assert.deepStrictEqual(isObject({}), true)
assert.deepStrictEqual(isObject([]), true)

assert.deepStrictEqual(isObject(null), false)
assert.deepStrictEqual(isObject(undefined), false)
```

## Since

2.0.0
