[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSTypePredicate

# Interface: TSTypePredicate

## Extends

- `BaseNode`

## Properties

### asserts

> **asserts**: `boolean`

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### parameterName

> **parameterName**: [`Identifier`](Identifier.md) \| [`TSThisType`](TSThisType.md)

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

### type

> **type**: [`TSTypePredicate`](../README.md#tstypepredicate)

#### Overrides

`BaseNode.type`

***

### typeAnnotation

> **typeAnnotation**: `null` \| [`TSTypeAnnotation`](TSTypeAnnotation.md)
