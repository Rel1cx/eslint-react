[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / CustomTransformers

# Interface: CustomTransformers

## Properties

### after?

> `optional` **after**: ([`TransformerFactory`](../type-aliases/TransformerFactory.md)\<[`SourceFile`](SourceFile.md)\> \| [`CustomTransformerFactory`](../type-aliases/CustomTransformerFactory.md))[]

Custom transformers to evaluate after built-in .js transformations.

***

### afterDeclarations?

> `optional` **afterDeclarations**: ([`CustomTransformerFactory`](../type-aliases/CustomTransformerFactory.md) \| [`TransformerFactory`](../type-aliases/TransformerFactory.md)\<[`SourceFile`](SourceFile.md) \| [`Bundle`](Bundle.md)\>)[]

Custom transformers to evaluate after built-in .d.ts transformations.

***

### before?

> `optional` **before**: ([`TransformerFactory`](../type-aliases/TransformerFactory.md)\<[`SourceFile`](SourceFile.md)\> \| [`CustomTransformerFactory`](../type-aliases/CustomTransformerFactory.md))[]

Custom transformers to evaluate before built-in .js transformations.
