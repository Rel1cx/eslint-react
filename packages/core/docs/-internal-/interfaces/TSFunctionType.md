[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSFunctionType

# Interface: TSFunctionType

## Extends

- [`TSFunctionSignatureBase`](TSFunctionSignatureBase.md)

## Properties

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`TSFunctionSignatureBase`](TSFunctionSignatureBase.md).[`loc`](TSFunctionSignatureBase.md#loc)

***

### params

> **params**: [`Parameter`](../type-aliases/Parameter.md)[]

#### Inherited from

[`TSFunctionSignatureBase`](TSFunctionSignatureBase.md).[`params`](TSFunctionSignatureBase.md#params)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`TSFunctionSignatureBase`](TSFunctionSignatureBase.md).[`parent`](TSFunctionSignatureBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`TSFunctionSignatureBase`](TSFunctionSignatureBase.md).[`range`](TSFunctionSignatureBase.md#range)

***

### returnType

> **returnType**: `undefined` \| [`TSTypeAnnotation`](TSTypeAnnotation.md)

#### Inherited from

[`TSFunctionSignatureBase`](TSFunctionSignatureBase.md).[`returnType`](TSFunctionSignatureBase.md#returntype)

***

### type

> **type**: [`TSFunctionType`](../README.md#tsfunctiontype)

#### Overrides

[`TSFunctionSignatureBase`](TSFunctionSignatureBase.md).[`type`](TSFunctionSignatureBase.md#type)

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

#### Inherited from

[`TSFunctionSignatureBase`](TSFunctionSignatureBase.md).[`typeParameters`](TSFunctionSignatureBase.md#typeparameters)
