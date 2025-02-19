[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSConstructorType

# Interface: TSConstructorType

## Extends

- [`TSFunctionSignatureBase`](TSFunctionSignatureBase.md)

## Properties

### abstract

> **abstract**: `boolean`

***

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

> **type**: [`TSConstructorType`](../README.md#tsconstructortype)

#### Overrides

[`TSFunctionSignatureBase`](TSFunctionSignatureBase.md).[`type`](TSFunctionSignatureBase.md#type)

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)

#### Inherited from

[`TSFunctionSignatureBase`](TSFunctionSignatureBase.md).[`typeParameters`](TSFunctionSignatureBase.md#typeparameters)
