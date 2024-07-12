[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / getRight

# Function: getRight()

> **getRight**\<`R`, `L`\>(`self`): [`Option`](../type-aliases/Option.md)\<`R`\>

Converts a `Either` to an `Option` discarding the error.

Alias of fromEither.

## Type Parameters

• **R**

• **L**

## Parameters

• **self**: [`Either`](../../E/type-aliases/Either.md)\<`R`, `L`\>

## Returns

[`Option`](../type-aliases/Option.md)\<`R`\>

## Example

```ts
import { Option, Either } from "effect"

assert.deepStrictEqual(Option.getRight(Either.right('ok')), Option.some('ok'))
assert.deepStrictEqual(Option.getRight(Either.left('err')), Option.none())
```

## Since

2.0.0
