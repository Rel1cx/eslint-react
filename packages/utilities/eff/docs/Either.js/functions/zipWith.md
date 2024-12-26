[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Either.js](../README.md) / zipWith

# Function: zipWith()

## Since

2.0.0

## Call Signature

> **zipWith**\<`R2`, `L2`, `R`, `B`\>(`that`, `f`): \<`L`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`B`, `L2` \| `L`\>

### Type Parameters

• **R2**

• **L2**

• **R**

• **B**

### Parameters

#### that

[`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

#### f

(`right`, `right2`) => `B`

### Returns

`Function`

#### Type Parameters

• **L**

#### Parameters

##### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`B`, `L2` \| `L`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **zipWith**\<`R`, `L`, `R2`, `L2`, `B`\>(`self`, `that`, `f`): [`Either`](../type-aliases/Either.md)\<`B`, `L` \| `L2`\>

### Type Parameters

• **R**

• **L**

• **R2**

• **L2**

• **B**

### Parameters

#### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### that

[`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

#### f

(`right`, `right2`) => `B`

### Returns

[`Either`](../type-aliases/Either.md)\<`B`, `L` \| `L2`\>

### Since

2.0.0

### Since

2.0.0
