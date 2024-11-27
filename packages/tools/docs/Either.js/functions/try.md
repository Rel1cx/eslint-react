[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / try

# Function: try()

## try(options)

> **try**\<`R`, `L`\>(`options`): [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

### Type Parameters

• **R**

• **L**

### Parameters

• **options**

• **options.catch**

• **options.try**: [`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<`R`\>

### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

## try(evaluate)

> **try**\<`R`\>(`evaluate`): [`Either`](../type-aliases/Either.md)\<`R`, `unknown`\>

### Type Parameters

• **R**

### Parameters

• **evaluate**: [`LazyArg`](../../namespaces/F/interfaces/LazyArg.md)\<`R`\>

### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `unknown`\>
