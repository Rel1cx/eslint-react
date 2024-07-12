[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Pred](../README.md) / isIterable

# Function: isIterable()

> **isIterable**(`input`): `input is Iterable<unknown>`

A guard that succeeds when the input is an `Iterable`.

## Parameters

• **input**: `unknown`

The value to test.

## Returns

`input is Iterable<unknown>`

## Example

```ts
import { isIterable } from "effect/Predicate"

assert.deepStrictEqual(isIterable([]), true)
assert.deepStrictEqual(isIterable(new Set()), true)

assert.deepStrictEqual(isIterable(null), false)
assert.deepStrictEqual(isIterable({}), false)
```

## Since

2.0.0
