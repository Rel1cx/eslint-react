[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TransformerFactory

# Type Alias: TransformerFactory()\<T\>

> **TransformerFactory**\<`T`\> = (`context`) => [`Transformer`](Transformer.md)\<`T`\>

A function that is used to initialize and return a `Transformer` callback, which in turn
will be used to transform one or more nodes.

## Type Parameters

### T

`T` *extends* [`Node`](../interfaces/Node.md)

## Parameters

### context

[`TransformationContext`](../interfaces/TransformationContext.md)

## Returns

[`Transformer`](Transformer.md)\<`T`\>
