[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / splitWhere

# Function: splitWhere()

Splits this chunk on the first element that matches this predicate.
Returns a tuple containing two chunks: the first one is before the match, and the second one is from the match onward.

## Since

2.0.0

## splitWhere(predicate)

> **splitWhere**\<`A`\>(`predicate`): (`self`) => [[`Chunk`](../interfaces/Chunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

Splits this chunk on the first element that matches this predicate.
Returns a tuple containing two chunks: the first one is before the match, and the second one is from the match onward.

### Type Parameters

• **A**

### Parameters

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`NoInfer`\<`A`\>\>

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[[`Chunk`](../interfaces/Chunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

### Since

2.0.0

## splitWhere(self, predicate)

> **splitWhere**\<`A`\>(`self`, `predicate`): [[`Chunk`](../interfaces/Chunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

Splits this chunk on the first element that matches this predicate.
Returns a tuple containing two chunks: the first one is before the match, and the second one is from the match onward.

### Type Parameters

• **A**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`A`\>

### Returns

[[`Chunk`](../interfaces/Chunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

### Since

2.0.0
