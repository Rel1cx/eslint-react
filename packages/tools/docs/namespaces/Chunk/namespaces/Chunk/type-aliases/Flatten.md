[**@eslint-react/tools**](../../../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../../../README.md) / [Chunk](../../../README.md) / [Chunk](../README.md) / Flatten

# Type Alias: Flatten\<T\>

> **Flatten**\<`T`\>: `T` *extends* [`NonEmptyChunk`](../../../interfaces/NonEmptyChunk.md)\<[`NonEmptyChunk`](../../../interfaces/NonEmptyChunk.md)\<infer A\>\> ? [`NonEmptyChunk`](../../../interfaces/NonEmptyChunk.md)\<`A`\> : `T` *extends* [`Chunk`](../../../interfaces/Chunk.md)\<[`Chunk`](../../../interfaces/Chunk.md)\<infer A\>\> ? [`Chunk`](../../../interfaces/Chunk.md)\<`A`\> : `never`

## Type Parameters

• **T** *extends* [`Chunk`](../../../interfaces/Chunk.md)\<[`Chunk`](../../../interfaces/Chunk.md)\<`any`\>\>

## Since

2.0.0
