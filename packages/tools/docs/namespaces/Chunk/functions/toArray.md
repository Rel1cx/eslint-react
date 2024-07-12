[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / toArray

# Function: toArray()

> **toArray**\<`S`\>(`self`): `S` *extends* [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`any`\> ? [[`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`S`\<`S`\>\>, `...Infer<S<S>>[]`] : [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`S`\>[]

Converts a `Chunk` into an `Array`. If the provided `Chunk` is non-empty
(`NonEmptyChunk`), the function will return a `NonEmptyArray`, ensuring the
non-empty property is preserved.

## Type Parameters

• **S** *extends* [`Chunk`](../interfaces/Chunk.md)\<`any`\>

## Parameters

• **self**: `S`

## Returns

`S` *extends* [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`any`\> ? [[`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`S`\<`S`\>\>, `...Infer<S<S>>[]`] : [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`S`\>[]

## Since

2.0.0
