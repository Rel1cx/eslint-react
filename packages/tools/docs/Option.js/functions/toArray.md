[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / toArray

# Function: toArray()

> **toArray**\<`A`\>(`self`): `A`[]

Transforms an `Option` into an `Array`.
If the input is `None`, an empty array is returned.
If the input is `Some`, the value is wrapped in an array.

## Type Parameters

• **A**

## Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to convert to an array.

## Returns

`A`[]

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.toArray(Option.some(1)), [1])
assert.deepStrictEqual(Option.toArray(Option.none()), [])
```

## Category

conversions

## Since

2.0.0
