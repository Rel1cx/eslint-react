[**@eslint-react/eff**](../../../README.md)

***

[@eslint-react/eff](../../../README.md) / [F](../README.md) / constant

# Function: constant()

> **constant**\<`A`\>(`value`): [`LazyArg`](../interfaces/LazyArg.md)\<`A`\>

Creates a constant value that never changes.

This is useful when you want to pass a value to a higher-order function (a function that takes another function as its argument)
and want that inner function to always use the same value, no matter how many times it is called.

## Type Parameters

• **A**

## Parameters

### value

`A`

The constant value to be returned.

## Returns

[`LazyArg`](../interfaces/LazyArg.md)\<`A`\>

## Example

```ts
import { constant } from "effect/Function"

const constNull = constant(null)

assert.deepStrictEqual(constNull(), null)
assert.deepStrictEqual(constNull(), null)
```

## Since

2.0.0
