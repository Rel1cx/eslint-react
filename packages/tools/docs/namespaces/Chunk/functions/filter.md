[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / filter

# Function: filter()

Returns a filtered and mapped subset of the elements.

## Since

2.0.0

## filter(refinement)

> **filter**\<`A`, `B`\>(`refinement`): (`self`) => [`Chunk`](../interfaces/Chunk.md)\<`B`\>

Returns a filtered and mapped subset of the elements.

### Type Parameters

• **A**

• **B**

### Parameters

• **refinement**: [`Refinement`](../../Pred/interfaces/Refinement.md)\<`NoInfer`\<`A`\>, `B`\>

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[`Chunk`](../interfaces/Chunk.md)\<`B`\>

### Since

2.0.0

## filter(predicate)

> **filter**\<`A`\>(`predicate`): (`self`) => [`Chunk`](../interfaces/Chunk.md)\<`A`\>

Returns a filtered and mapped subset of the elements.

### Type Parameters

• **A**

### Parameters

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`NoInfer`\<`A`\>\>

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A`\>

### Since

2.0.0

## filter(self, refinement)

> **filter**\<`A`, `B`\>(`self`, `refinement`): [`Chunk`](../interfaces/Chunk.md)\<`B`\>

Returns a filtered and mapped subset of the elements.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **refinement**: [`Refinement`](../../Pred/interfaces/Refinement.md)\<`A`, `B`\>

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`B`\>

### Since

2.0.0

## filter(self, predicate)

> **filter**\<`A`\>(`self`, `predicate`): [`Chunk`](../interfaces/Chunk.md)\<`A`\>

Returns a filtered and mapped subset of the elements.

### Type Parameters

• **A**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`A`\>

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A`\>

### Since

2.0.0
