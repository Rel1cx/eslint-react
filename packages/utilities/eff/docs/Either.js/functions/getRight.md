[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / getRight

# Function: getRight()

> **getRight**\<`R`, `L`\>(`self`): [`Option`](../../Option.js/type-aliases/Option.md)\<`R`\>

Converts a `Either` to an `Option` discarding the `Left`.

## Type Parameters

• **R**

• **L**

## Parameters

### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

## Returns

[`Option`](../../Option.js/type-aliases/Option.md)\<`R`\>

## Example

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.getRight(Either.right('ok')), Option.some('ok'))
assert.deepStrictEqual(Either.getRight(Either.left('err')), Option.none())
```

## Since

2.0.0
