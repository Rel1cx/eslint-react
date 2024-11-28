[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / try

# Function: try()

## Call Signature

> **try**\<`R`, `L`\>(`options`): [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

### Type Parameters

• **R**

• **L**

### Parameters

#### options

##### options.catch

(`error`) => `L`

##### options.try

[`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<`R`\>

### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

## Call Signature

> **try**\<`R`\>(`evaluate`): [`Either`](../type-aliases/Either.md)\<`R`, `unknown`\>

### Type Parameters

• **R**

### Parameters

#### evaluate

[`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<`R`\>

### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `unknown`\>
