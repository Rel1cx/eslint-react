[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / reverse

# Function: reverse()

> **reverse**\<`S`\>(`self`): [`With`](../namespaces/Chunk/type-aliases/With.md)\<`S`, [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`S`\>\>

Reverses the order of elements in a `Chunk`.
Importantly, if the input chunk is a `NonEmptyChunk`, the reversed chunk will also be a `NonEmptyChunk`.

## Type Parameters

• **S** *extends* [`Chunk`](../interfaces/Chunk.md)\<`any`\>

## Parameters

• **self**: `S`

## Returns

[`With`](../namespaces/Chunk/type-aliases/With.md)\<`S`, [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`S`\>\>

## Example

```ts
import { Chunk } from "effect"

const numbers = Chunk.make(1, 2, 3)
const reversedNumbers = Chunk.reverse(numbers)
assert.deepStrictEqual(reversedNumbers, Chunk.make(3, 2, 1))
```

## Since

2.0.0
