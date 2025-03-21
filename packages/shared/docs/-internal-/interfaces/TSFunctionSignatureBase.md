[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSFunctionSignatureBase

# Interface: TSFunctionSignatureBase

## Extends

- `BaseNode`

## Extended by

- [`TSConstructorType`](TSConstructorType.md)
- [`TSFunctionType`](TSFunctionType.md)

## Properties

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### params

> **params**: [`Parameter`](../type-aliases/Parameter.md)[]

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

`BaseNode.parent`

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

`BaseNode.range`

***

### returnType

> **returnType**: `undefined` \| [`TSTypeAnnotation`](TSTypeAnnotation.md)

***

### type

> **type**: [`AST_NODE_TYPES`](../enumerations/AST_NODE_TYPES.md)

#### Inherited from

`BaseNode.type`

***

### typeParameters

> **typeParameters**: `undefined` \| [`TSTypeParameterDeclaration`](TSTypeParameterDeclaration.md)
