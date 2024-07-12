[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / flatMap

# Function: flatMap()

Applies a function to each element in a chunk and returns a new chunk containing the concatenated mapped elements.

## Since

2.0.0

## flatMap(f)

> **flatMap**\<`S`, `T`\>(`f`): (`self`) => [`AndNonEmpty`](../namespaces/Chunk/type-aliases/AndNonEmpty.md)\<`S`, `T`, [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`T`\>\>

Applies a function to each element in a chunk and returns a new chunk containing the concatenated mapped elements.

### Type Parameters

• **S** *extends* [`Chunk`](../interfaces/Chunk.md)\<`any`\>

• **T** *extends* [`Chunk`](../interfaces/Chunk.md)\<`any`\>

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: `S`

#### Returns

[`AndNonEmpty`](../namespaces/Chunk/type-aliases/AndNonEmpty.md)\<`S`, `T`, [`Infer`](../namespaces/Chunk/type-aliases/Infer.md)\<`T`\>\>

### Since

2.0.0

## flatMap(self, f)

> **flatMap**\<`A`, `B`\>(`self`, `f`): [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`B`\>

Applies a function to each element in a chunk and returns a new chunk containing the concatenated mapped elements.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>

• **f**

### Returns

[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`B`\>

### Since

2.0.0

## flatMap(self, f)

> **flatMap**\<`A`, `B`\>(`self`, `f`): [`Chunk`](../interfaces/Chunk.md)\<`B`\>

Applies a function to each element in a chunk and returns a new chunk containing the concatenated mapped elements.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **f**

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`B`\>

### Since

2.0.0
