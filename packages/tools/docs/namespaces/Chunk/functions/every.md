[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / every

# Function: every()

Check if a predicate holds true for every `Chunk` element.

## Since

2.0.0

## every(refinement)

> **every**\<`A`, `B`\>(`refinement`): (`self`) => `self is Chunk<B>`

Check if a predicate holds true for every `Chunk` element.

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

`self is Chunk<B>`

### Since

2.0.0

## every(predicate)

> **every**\<`A`\>(`predicate`): (`self`) => `boolean`

Check if a predicate holds true for every `Chunk` element.

### Type Parameters

• **A**

### Parameters

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`A`\>

### Returns

`Function`

#### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

#### Returns

`boolean`

### Since

2.0.0

## every(self, refinement)

> **every**\<`A`, `B`\>(`self`, `refinement`): `self is Chunk<B>`

Check if a predicate holds true for every `Chunk` element.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **refinement**: [`Refinement`](../../Pred/interfaces/Refinement.md)\<`A`, `B`\>

### Returns

`self is Chunk<B>`

### Since

2.0.0

## every(self, predicate)

> **every**\<`A`\>(`self`, `predicate`): `boolean`

Check if a predicate holds true for every `Chunk` element.

### Type Parameters

• **A**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`A`\>

### Returns

`boolean`

### Since

2.0.0
