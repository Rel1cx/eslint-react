[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / isPromise

# Function: isPromise()

> **isPromise**(`input`): `input is Promise<unknown>`

A guard that succeeds when the input is a Promise.

## Parameters

• **input**: `unknown`

The value to test.

## Returns

`input is Promise<unknown>`

## Example

```ts
import { isPromise } from "effect/Predicate"

assert.deepStrictEqual(isPromise({}), false)
assert.deepStrictEqual(isPromise(Promise.resolve("hello")), true)
```

## Since

2.0.0
