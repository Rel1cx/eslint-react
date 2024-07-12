[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / intersection

# Function: intersection()

Creates a Chunk of unique values that are included in all given Chunks.

The order and references of result values are determined by the Chunk.

## Since

2.0.0

## intersection(that)

> **intersection**\<`A`\>(`that`): \<`B`\>(`self`) => [`Chunk`](../interfaces/Chunk.md)\<`A` & `B`\>

Creates a Chunk of unique values that are included in all given Chunks.

The order and references of result values are determined by the Chunk.

### Type Parameters

• **A**

### Parameters

• **that**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

### Returns

`Function`

#### Type Parameters

• **B**

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`B`\>

#### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A` & `B`\>

### Since

2.0.0

## intersection(self, that)

> **intersection**\<`A`, `B`\>(`self`, `that`): [`Chunk`](../interfaces/Chunk.md)\<`A` & `B`\>

Creates a Chunk of unique values that are included in all given Chunks.

The order and references of result values are determined by the Chunk.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **that**: [`Chunk`](../interfaces/Chunk.md)\<`B`\>

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A` & `B`\>

### Since

2.0.0
