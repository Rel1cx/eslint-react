[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / isLeft

# Function: isLeft()

> **isLeft**\<`R`, `L`\>(`self`): `self is Left<L, R>`

Determine if a `Either` is a `Left`.

## Type Parameters

• **R**

• **L**

## Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

The `Either` to check.

## Returns

`self is Left<L, R>`

## Example

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.isLeft(Either.right(1)), false)
assert.deepStrictEqual(Either.isLeft(Either.left("a")), true)
```

## Since

2.0.0
