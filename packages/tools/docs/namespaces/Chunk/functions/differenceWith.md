[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / differenceWith

# Function: differenceWith()

> **differenceWith**\<`A`\>(`isEquivalent`): (`that`) => (`self`) => [`Chunk`](../interfaces/Chunk.md)\<`A`\>(`self`, `that`) => [`Chunk`](../interfaces/Chunk.md)\<`A`\>

Creates a `Chunk` of values not included in the other given `Chunk` using the provided `isEquivalent` function.
The order and references of result values are determined by the first `Chunk`.

## Type Parameters

• **A**

## Parameters

• **isEquivalent**

## Returns

`Function`

### Parameters

• **that**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A`\>

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **that**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

### Returns

[`Chunk`](../interfaces/Chunk.md)\<`A`\>

## Since

3.2.0
