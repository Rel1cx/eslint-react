[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / getOrder

# Function: getOrder()

> **getOrder**\<`A`\>(`O`): `Order`\<[`Option`](../type-aliases/Option.md)\<`A`\>\>

The `Order` instance allows `Option` values to be compared with
`compare`, whenever there is an `Order` instance for
the type the `Option` contains.

`None` is considered to be less than any `Some` value.

## Type Parameters

• **A**

## Parameters

### O

`Order`\<`A`\>

## Returns

`Order`\<[`Option`](../type-aliases/Option.md)\<`A`\>\>

## Example

```ts
import { pipe, Option, Number } from "effect"

const O = Option.getOrder(Number.Order)
assert.deepStrictEqual(O(Option.none(), Option.none()), 0)
assert.deepStrictEqual(O(Option.none(), Option.some(1)), -1)
assert.deepStrictEqual(O(Option.some(1), Option.none()), 1)
assert.deepStrictEqual(O(Option.some(1), Option.some(2)), -1)
assert.deepStrictEqual(O(Option.some(1), Option.some(1)), 0)
```

## Since

2.0.0
