[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / mapBoth

# Function: mapBoth()

## Since

2.0.0

## Call Signature

> **mapBoth**\<`L`, `L2`, `R`, `R2`\>(`options`): (`self`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

### Type Parameters

• **L**

• **L2**

• **R**

• **R2**

### Parameters

#### options

##### options.onLeft

(`left`) => `L2`

##### options.onRight

(`right`) => `R2`

### Returns

`Function`

#### Parameters

##### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **mapBoth**\<`L`, `R`, `L2`, `R2`\>(`self`, `options`): [`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

### Type Parameters

• **L**

• **R**

• **L2**

• **R2**

### Parameters

#### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### options

##### options.onLeft

(`left`) => `L2`

##### options.onRight

(`right`) => `R2`

### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

### Since

2.0.0

### Since

2.0.0
