[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / partition

# Function: partition()

Separate elements based on a predicate that also exposes the index of the element.

## Since

2.0.0

## partition(refinement)

> **partition**\<`A`, `B`\>(`refinement`): (`self`) => [[`Chunk`](../interfaces/Chunk.md)\<`Exclude`\<`A`, `B`\>\>, [`Chunk`](../interfaces/Chunk.md)\<`B`\>]

Separate elements based on a predicate that also exposes the index of the element.

### Type Parameters

• **A**

• **B**

### Parameters

• **refinement**

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[[`Chunk`](../interfaces/Chunk.md)\<`Exclude`\<`A`, `B`\>\>, [`Chunk`](../interfaces/Chunk.md)\<`B`\>]

### Since

2.0.0

## partition(predicate)

> **partition**\<`A`\>(`predicate`): (`self`) => [[`Chunk`](../interfaces/Chunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

Separate elements based on a predicate that also exposes the index of the element.

### Type Parameters

• **A**

### Parameters

• **predicate**

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[[`Chunk`](../interfaces/Chunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

### Since

2.0.0

## partition(self, refinement)

> **partition**\<`A`, `B`\>(`self`, `refinement`): [[`Chunk`](../interfaces/Chunk.md)\<`Exclude`\<`A`, `B`\>\>, [`Chunk`](../interfaces/Chunk.md)\<`B`\>]

Separate elements based on a predicate that also exposes the index of the element.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **refinement**

### Returns

[[`Chunk`](../interfaces/Chunk.md)\<`Exclude`\<`A`, `B`\>\>, [`Chunk`](../interfaces/Chunk.md)\<`B`\>]

### Since

2.0.0

## partition(self, predicate)

> **partition**\<`A`\>(`self`, `predicate`): [[`Chunk`](../interfaces/Chunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

Separate elements based on a predicate that also exposes the index of the element.

### Type Parameters

• **A**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **predicate**

### Returns

[[`Chunk`](../interfaces/Chunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

### Since

2.0.0
