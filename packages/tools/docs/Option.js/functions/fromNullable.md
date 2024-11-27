[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / fromNullable

# Function: fromNullable()

> **fromNullable**\<`A`\>(`nullableValue`): [`Option`](../type-aliases/Option.md)\<`NonNullable`\<`A`\>\>

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
returns the value wrapped in a `Some`.

## Type Parameters

• **A**

## Parameters

• **nullableValue**: `A`

The nullable value to be converted to an `Option`.

## Returns

[`Option`](../type-aliases/Option.md)\<`NonNullable`\<`A`\>\>

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.fromNullable(undefined), Option.none())
assert.deepStrictEqual(Option.fromNullable(null), Option.none())
assert.deepStrictEqual(Option.fromNullable(1), Option.some(1))
```

## Category

conversions

## Since

2.0.0
