[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / getRight

# Function: getRight()

> **getRight**\<`R`, `L`\>(`self`): [`Option`](../../O/type-aliases/Option.md)\<`R`\>

Converts a `Either` to an `Option` discarding the `Left`.

Alias of toOption.

## Type Parameters

• **R**

• **L**

## Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

## Returns

[`Option`](../../O/type-aliases/Option.md)\<`R`\>

## Example

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.getRight(Either.right('ok')), Option.some('ok'))
assert.deepStrictEqual(Either.getRight(Either.left('err')), Option.none())
```

## Since

2.0.0
