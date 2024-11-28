[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / getLeft

# Function: getLeft()

> **getLeft**\<`R`, `L`\>(`self`): [`Option`](../../Option.js/type-aliases/Option.md)\<`L`\>

Converts a `Either` to an `Option` discarding the value.

## Type Parameters

• **R**

• **L**

## Parameters

### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

## Returns

[`Option`](../../Option.js/type-aliases/Option.md)\<`L`\>

## Example

```ts
import { Either, Option } from "effect"

assert.deepStrictEqual(Either.getLeft(Either.right('ok')), Option.none())
assert.deepStrictEqual(Either.getLeft(Either.left('err')), Option.some('err'))
```

## Since

2.0.0
