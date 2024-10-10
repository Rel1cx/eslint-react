[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / flatMap

# Function: flatMap()

Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.

## Since

2.0.0

## flatMap(f)

> **flatMap**\<`A`, `B`\>(`f`): (`self`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.

### Type Parameters

• **A**

• **B**

### Parameters

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

## flatMap(self, f)

> **flatMap**\<`A`, `B`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`B`\>

Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **f**

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0
