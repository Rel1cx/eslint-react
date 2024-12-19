[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / ap

# Function: ap()

## Since

2.0.0

## Call Signature

> **ap**\<`R`, `L2`\>(`that`): \<`R2`, `L`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L2` \| `L`\>

### Type Parameters

• **R**

• **L2**

### Parameters

#### that

[`Either`](../type-aliases/Either.md)\<`R`, `L2`\>

### Returns

`Function`

#### Type Parameters

• **R2**

• **L**

#### Parameters

##### self

[`Either`](../type-aliases/Either.md)\<(`right`) => `R2`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L2` \| `L`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **ap**\<`R`, `R2`, `L`, `L2`\>(`self`, `that`): [`Either`](../type-aliases/Either.md)\<`R2`, `L` \| `L2`\>

### Type Parameters

• **R**

• **R2**

• **L**

• **L2**

### Parameters

#### self

[`Either`](../type-aliases/Either.md)\<(`right`) => `R2`, `L`\>

#### that

[`Either`](../type-aliases/Either.md)\<`R`, `L2`\>

### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L` \| `L2`\>

### Since

2.0.0

### Since

2.0.0
