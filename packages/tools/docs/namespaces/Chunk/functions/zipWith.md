[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / zipWith

# Function: zipWith()

Zips this chunk pointwise with the specified chunk using the specified combiner.

## Since

2.0.0

## zipWith(that, f)

> **zipWith**\<`A`, `B`, `C`\>(`that`, `f`): (`self`) => [`Chunk`](../interfaces/Chunk.md)\<`C`\>

Zips this chunk pointwise with the specified chunk using the specified combiner.

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

• **that**: [`Chunk`](../interfaces/Chunk.md)\<`B`\>

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[`Chunk`](../interfaces/Chunk.md)\<`C`\>

### Since

2.0.0

## zipWith(self, that, f)

> **zipWith**\<`A`, `B`, `C`\>(`self`, `that`, `f`): [`Chunk`](../interfaces/Chunk.md)\<`C`\>

Zips this chunk pointwise with the specified chunk using the specified combiner.

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **that**: [`Chunk`](../interfaces/Chunk.md)\<`B`\>

• **f**

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`C`\>

### Since

2.0.0
