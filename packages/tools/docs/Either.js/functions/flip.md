[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / flip

# Function: flip()

> **flip**\<`R`, `L`\>(`self`): [`Either`](../type-aliases/Either.md)\<`L`, `R`\>

Returns an `Either` that swaps the error/success cases. This allows you to
use all methods on the error channel, possibly before flipping back.

## Type Parameters

• **R**

• **L**

## Parameters

### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

## Returns

[`Either`](../type-aliases/Either.md)\<`L`, `R`\>

## Since

2.0.0
