[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / makeBy

# Function: makeBy()

Return a Chunk of length n with element i initialized with f(i).

**Note**. `n` is normalized to an integer >= 1.

## Since

2.0.0

## makeBy(f)

> **makeBy**\<`A`\>(`f`): (`n`) => [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>

Return a Chunk of length n with element i initialized with f(i).

**Note**. `n` is normalized to an integer >= 1.

### Type Parameters

• **A**

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **n**: `number`

#### Returns

[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>

### Since

2.0.0

## makeBy(n, f)

> **makeBy**\<`A`\>(`n`, `f`): [`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>

Return a Chunk of length n with element i initialized with f(i).

**Note**. `n` is normalized to an integer >= 1.

### Type Parameters

• **A**

### Parameters

• **n**: `number`

• **f**

### Returns

[`NonEmptyChunk`](../interfaces/NonEmptyChunk.md)\<`A`\>

### Since

2.0.0
