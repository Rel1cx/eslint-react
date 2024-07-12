[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / prepend

# Function: prepend()

Prepend an element to the front of a `Chunk`, creating a new `NonEmptyChunk`.

## Since

2.0.0

## prepend(elem)

> **prepend**\<`B`\>(`elem`): \<`A`\>(`self`) => [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`B` \| `A`\>

Prepend an element to the front of a `Chunk`, creating a new `NonEmptyChunk`.

### Type Parameters

• **B**

### Parameters

• **elem**: `B`

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`B` \| `A`\>

### Since

2.0.0

## prepend(self, elem)

> **prepend**\<`A`, `B`\>(`self`, `elem`): [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A` \| `B`\>

Prepend an element to the front of a `Chunk`, creating a new `NonEmptyChunk`.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **elem**: `B`

### Returns

[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A` \| `B`\>

### Since

2.0.0
