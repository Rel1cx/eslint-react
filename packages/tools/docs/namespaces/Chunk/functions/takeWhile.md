[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / takeWhile

# Function: takeWhile()

Takes all elements so long as the predicate returns true.

## Since

2.0.0

## takeWhile(refinement)

> **takeWhile**\<`A`, `B`\>(`refinement`): (`self`) => [`Chunk`](../interfaces/Chunk.md)\<`B`\>

Takes all elements so long as the predicate returns true.

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

## takeWhile(predicate)

> **takeWhile**\<`A`\>(`predicate`): (`self`) => [`Chunk`](../interfaces/Chunk.md)\<`A`\>

Takes all elements so long as the predicate returns true.

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

## takeWhile(self, refinement)

> **takeWhile**\<`A`, `B`\>(`self`, `refinement`): [`Chunk`](../interfaces/Chunk.md)\<`B`\>

Takes all elements so long as the predicate returns true.

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

## takeWhile(self, predicate)

> **takeWhile**\<`A`\>(`self`, `predicate`): [`Chunk`](../interfaces/Chunk.md)\<`A`\>

Takes all elements so long as the predicate returns true.

### Type Parameters

• **A**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`A`\>

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A`\>

### Since

2.0.0
