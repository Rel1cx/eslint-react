[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / some

# Function: some()

Check if a predicate holds true for some `Chunk` element.

## Since

2.0.0

## some(predicate)

> **some**\<`A`\>(`predicate`): (`self`) => `self is NonEmptyChunk<A>`

Check if a predicate holds true for some `Chunk` element.

### Type Parameters

• **A**

### Parameters

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`NoInfer`\<`A`\>\>

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

`self is NonEmptyChunk<A>`

### Since

2.0.0

## some(self, predicate)

> **some**\<`A`\>(`self`, `predicate`): `self is NonEmptyChunk<A>`

Check if a predicate holds true for some `Chunk` element.

### Type Parameters

• **A**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`A`\>

### Returns

`self is NonEmptyChunk<A>`

### Since

2.0.0
