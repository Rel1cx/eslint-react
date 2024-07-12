[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / findLast

# Function: findLast()

Find the last element for which a predicate holds.

## Since

2.0.0

## findLast(refinement)

> **findLast**\<`A`, `B`\>(`refinement`): (`self`) => [`Option`](../../O/type-aliases/Option.md)\<`B`\>

Find the last element for which a predicate holds.

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

[`Option`](../../O/type-aliases/Option.md)\<`B`\>

### Since

2.0.0

## findLast(predicate)

> **findLast**\<`A`\>(`predicate`): (`self`) => [`Option`](../../O/type-aliases/Option.md)\<`A`\>

Find the last element for which a predicate holds.

### Type Parameters

• **A**

### Parameters

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`NoInfer`\<`A`\>\>

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

[`Option`](../../O/type-aliases/Option.md)\<`A`\>

### Since

2.0.0

## findLast(self, refinement)

> **findLast**\<`A`, `B`\>(`self`, `refinement`): [`Option`](../../O/type-aliases/Option.md)\<`B`\>

Find the last element for which a predicate holds.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **refinement**: [`Refinement`](../../Pred/interfaces/Refinement.md)\<`A`, `B`\>

### Returns

[`Option`](../../O/type-aliases/Option.md)\<`B`\>

### Since

2.0.0

## findLast(self, predicate)

> **findLast**\<`A`\>(`self`, `predicate`): [`Option`](../../O/type-aliases/Option.md)\<`A`\>

Find the last element for which a predicate holds.

### Type Parameters

• **A**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`A`\>

### Returns

[`Option`](../../O/type-aliases/Option.md)\<`A`\>

### Since

2.0.0
