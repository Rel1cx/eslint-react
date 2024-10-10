[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / zipLeft

# Function: zipLeft()

Sequences the specified `that` `Option` but ignores its value.

It is useful when we want to chain multiple operations, but only care about the result of `self`.

## Param

The `Option` that will be ignored in the chain and discarded

## Param

The `Option` we care about

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

• **that**: [`Option`](../type-aliases/Option.md)\<`X`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

The `Option` that will be ignored in the chain and discarded

### Param

The `Option` we care about

### Since

2.0.0
