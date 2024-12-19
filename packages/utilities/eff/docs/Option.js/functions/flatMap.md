[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / flatMap

# Function: flatMap()

Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.

## Since

2.0.0

## Call Signature

> **flatMap**\<`A`, `B`\>(`f`): (`self`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.

### Type Parameters

• **A**

• **B**

### Parameters

#### f

(`a`) => [`Option`](../type-aliases/Option.md)\<`B`\>

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **flatMap**\<`A`, `B`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`B`\>

Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### f

(`a`) => [`Option`](../type-aliases/Option.md)\<`B`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

### Since

2.0.0
