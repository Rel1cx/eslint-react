[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Either.js](../README.md) / flatMap

# Function: flatMap()

## Since

2.0.0

## Call Signature

> **flatMap**\<`R`, `R2`, `L2`\>(`f`): \<`L`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L2` \| `L`\>

### Type Parameters

• **R**

• **R2**

• **L2**

### Parameters

#### f

(`right`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

### Returns

`Function`

#### Type Parameters

• **L**

#### Parameters

##### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L2` \| `L`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **flatMap**\<`R`, `L`, `R2`, `L2`\>(`self`, `f`): [`Either`](../type-aliases/Either.md)\<`R2`, `L` \| `L2`\>

### Type Parameters

• **R**

• **L**

• **R2**

• **L2**

### Parameters

#### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### f

(`right`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L` \| `L2`\>

### Since

2.0.0

### Since

2.0.0
