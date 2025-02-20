[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / RestElement

# Interface: RestElement

## Extends

- `BaseNode`

## Properties

### argument

> **argument**: [`DestructuringPattern`](../type-aliases/DestructuringPattern.md)

***

### decorators

> **decorators**: [`Decorator`](Decorator.md)[]

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### optional

> **optional**: `boolean`

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

> **type**: [`RestElement`](../README.md#restelement)

#### Overrides

`BaseNode.type`

***

### typeAnnotation

> **typeAnnotation**: `undefined` \| [`TSTypeAnnotation`](TSTypeAnnotation.md)

***

### value

> **value**: `undefined` \| [`AssignmentPattern`](AssignmentPattern.md)
