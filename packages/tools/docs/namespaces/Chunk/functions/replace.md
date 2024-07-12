[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / replace

# Function: replace()

Change the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

## Since

2.0.0

## replace(i, b)

> **replace**\<`B`\>(`i`, `b`): \<`A`\>(`self`) => [`Chunk`](../interfaces/Chunk.md)\<`B` \| `A`\>

Change the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

### Type Parameters

• **B**

### Parameters

• **i**: `number`

• **b**: `B`

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[`Chunk`](../interfaces/Chunk.md)\<`B` \| `A`\>

### Since

2.0.0

## replace(self, i, b)

> **replace**\<`A`, `B`\>(`self`, `i`, `b`): [`Chunk`](../interfaces/Chunk.md)\<`A` \| `B`\>

Change the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **i**: `number`

• **b**: `B`

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A` \| `B`\>

### Since

2.0.0
