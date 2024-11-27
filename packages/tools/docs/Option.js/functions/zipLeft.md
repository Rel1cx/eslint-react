[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / zipLeft

# Function: zipLeft()

Sequences the specified `that` `Option` but ignores its value.

It is useful when we want to chain multiple operations, but only care about the result of `self`.

## Param

The `Option` that will be ignored in the chain and discarded

## Param

The `Option` we care about

## Category

zipping

## Since

2.0.0

## zipLeft(that)

> **zipLeft**\<`_`\>(`that`): \<`A`\>(`self`) => [`Option`](../type-aliases/Option.md)\<`A`\>

Sequences the specified `that` `Option` but ignores its value.

It is useful when we want to chain multiple operations, but only care about the result of `self`.

### Type Parameters

• **_**

### Parameters

• **that**: [`Option`](../type-aliases/Option.md)\<`_`\>

The `Option` that will be ignored in the chain and discarded

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

The `Option` that will be ignored in the chain and discarded

### Param

The `Option` we care about

### Category

zipping

### Since

2.0.0

### Category

zipping

### Since

2.0.0

## zipLeft(self, that)

> **zipLeft**\<`A`, `X`\>(`self`, `that`): [`Option`](../type-aliases/Option.md)\<`A`\>

Sequences the specified `that` `Option` but ignores its value.

It is useful when we want to chain multiple operations, but only care about the result of `self`.

### Type Parameters

• **A**

• **X**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` we care about

• **that**: [`Option`](../type-aliases/Option.md)\<`X`\>

The `Option` that will be ignored in the chain and discarded

### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

The `Option` that will be ignored in the chain and discarded

### Param

The `Option` we care about

### Category

zipping

### Since

2.0.0

### Category

zipping

### Since

2.0.0
