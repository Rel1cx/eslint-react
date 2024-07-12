[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / modify

# Function: modify()

Apply a function to the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

## Since

2.0.0

## modify(i, f)

> **modify**\<`A`, `B`\>(`i`, `f`): (`self`) => [`Chunk`](../interfaces/Chunk.md)\<`A` \| `B`\>

Apply a function to the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

### Type Parameters

• **A**

• **B**

### Parameters

• **i**: `number`

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A` \| `B`\>

### Since

2.0.0

## modify(self, i, f)

> **modify**\<`A`, `B`\>(`self`, `i`, `f`): [`Chunk`](../interfaces/Chunk.md)\<`A` \| `B`\>

Apply a function to the element at the specified index, creating a new `Chunk`,
or returning the input if the index is out of bounds.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **i**: `number`

• **f**

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A` \| `B`\>

### Since

2.0.0
