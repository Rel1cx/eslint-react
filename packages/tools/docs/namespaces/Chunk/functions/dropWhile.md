[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / dropWhile

# Function: dropWhile()

Drops all elements so long as the predicate returns true.

## Since

2.0.0

## dropWhile(predicate)

> **dropWhile**\<`A`\>(`predicate`): (`self`) => [`Chunk`](../interfaces/Chunk.md)\<`A`\>

Drops all elements so long as the predicate returns true.

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

## dropWhile(self, predicate)

> **dropWhile**\<`A`\>(`self`, `predicate`): [`Chunk`](../interfaces/Chunk.md)\<`A`\>

Drops all elements so long as the predicate returns true.

### Type Parameters

• **A**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`A`\>

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A`\>

### Since

2.0.0
