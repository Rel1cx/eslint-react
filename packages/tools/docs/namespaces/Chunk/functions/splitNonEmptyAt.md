[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / splitNonEmptyAt

# Function: splitNonEmptyAt()

Splits a `NonEmptyChunk` into two segments, with the first segment containing a maximum of `n` elements.
The value of `n` must be `>= 1`.

## Since

2.0.0

## splitNonEmptyAt(n)

> **splitNonEmptyAt**(`n`): \<`A`\>(`self`) => [[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

Splits a `NonEmptyChunk` into two segments, with the first segment containing a maximum of `n` elements.
The value of `n` must be `>= 1`.

### Parameters

• **n**: `number`

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>

#### Returns

[[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

### Since

2.0.0

## splitNonEmptyAt(self, n)

> **splitNonEmptyAt**\<`A`\>(`self`, `n`): [[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

Splits a `NonEmptyChunk` into two segments, with the first segment containing a maximum of `n` elements.
The value of `n` must be `>= 1`.

### Type Parameters

• **A**

### Parameters

• **self**: [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>

• **n**: `number`

### Returns

[[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>, [`Chunk`](../interfaces/Chunk.md)\<`A`\>]

### Since

2.0.0
