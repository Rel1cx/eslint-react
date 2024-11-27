[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / isError

# Function: isError()

> **isError**(`input`): `input is Error`

A guard that succeeds when the input is an `Error`.

## Parameters

• **input**: `unknown`

The value to test.

## Returns

`input is Error`

## Example

```ts
import { isError } from "effect/Predicate"

assert.deepStrictEqual(isError(new Error()), true)

assert.deepStrictEqual(isError(null), false)
assert.deepStrictEqual(isError({}), false)
```

## Category

guards

## Since

2.0.0
