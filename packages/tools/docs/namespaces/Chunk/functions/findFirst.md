[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Chunk](../README.md) / findFirst

# Function: findFirst()

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

## Since

2.0.0

## findFirst(refinement)

> **findFirst**\<`A`, `B`\>(`refinement`): (`self`) => [`Option`](../../O/type-aliases/Option.md)\<`B`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

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

## findFirst(predicate)

> **findFirst**\<`A`\>(`predicate`): (`self`) => [`Option`](../../O/type-aliases/Option.md)\<`A`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

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

## findFirst(self, refinement)

> **findFirst**\<`A`, `B`\>(`self`, `refinement`): [`Option`](../../O/type-aliases/Option.md)\<`B`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

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

## findFirst(self, predicate)

> **findFirst**\<`A`\>(`self`, `predicate`): [`Option`](../../O/type-aliases/Option.md)\<`A`\>

Returns the first element that satisfies the specified
predicate, or `None` if no such element exists.

### Type Parameters

• **A**

### Parameters

• **self**: [`Chunk`](../interfaces/Chunk.md)\<`A`\>

• **predicate**: [`Predicate`](../../Pred/interfaces/Predicate.md)\<`A`\>

### Returns

[`Option`](../../O/type-aliases/Option.md)\<`A`\>

### Since

2.0.0
