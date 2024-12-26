[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Either.js](../README.md) / orElse

# Function: orElse()

Returns `self` if it is a `Right` or `that` otherwise.

## Param

The input `Either` value to check and potentially return.

## Param

A function that takes the error value from `self` (if it's a `Left`) and returns a new `Either` value.

## Since

2.0.0

## Call Signature

> **orElse**\<`L`, `R2`, `L2`\>(`that`): \<`R`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R2` \| `R`, `L2`\>

Returns `self` if it is a `Right` or `that` otherwise.

### Type Parameters

• **L**

• **R2**

• **L2**

### Parameters

#### that

(`left`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

A function that takes the error value from `self` (if it's a `Left`) and returns a new `Either` value.

### Returns

`Function`

#### Type Parameters

• **R**

#### Parameters

##### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R2` \| `R`, `L2`\>

### Param

The input `Either` value to check and potentially return.

### Param

A function that takes the error value from `self` (if it's a `Left`) and returns a new `Either` value.

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **orElse**\<`R`, `L`, `R2`, `L2`\>(`self`, `that`): [`Either`](../type-aliases/Either.md)\<`R` \| `R2`, `L2`\>

Returns `self` if it is a `Right` or `that` otherwise.

### Type Parameters

• **R**

• **L**

• **R2**

• **L2**

### Parameters

#### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

The input `Either` value to check and potentially return.

#### that

(`left`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

A function that takes the error value from `self` (if it's a `Left`) and returns a new `Either` value.

### Returns

[`Either`](../type-aliases/Either.md)\<`R` \| `R2`, `L2`\>

### Param

The input `Either` value to check and potentially return.

### Param

A function that takes the error value from `self` (if it's a `Left`) and returns a new `Either` value.

### Since

2.0.0

### Since

2.0.0
