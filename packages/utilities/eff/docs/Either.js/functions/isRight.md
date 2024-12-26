[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Either.js](../README.md) / isRight

# Function: isRight()

> **isRight**\<`R`, `L`\>(`self`): `self is Right<L, R>`

Determine if a `Either` is a `Right`.

## Type Parameters

• **R**

• **L**

## Parameters

### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

The `Either` to check.

## Returns

`self is Right<L, R>`

## Example

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.isRight(Either.right(1)), true)
assert.deepStrictEqual(Either.isRight(Either.left("a")), false)
```

## Since

2.0.0
