[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / lift2

# Function: lift2()

> **lift2**\<`A`, `B`, `C`\>(`f`): (`that`) => (`self`) => [`Option`](../type-aliases/Option.md)\<`C`\>(`self`, `that`) => [`Option`](../type-aliases/Option.md)\<`C`\>

Lifts a binary function into `Option`.

## Type Parameters

• **A**

• **B**

• **C**

## Parameters

• **f**

The function to lift.

## Returns

`Function`

### Parameters

• **that**: [`Option`](../type-aliases/Option.md)\<`B`\>

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`C`\>

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **that**: [`Option`](../type-aliases/Option.md)\<`B`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`C`\>

## Category

lifting

## Since

2.0.0
