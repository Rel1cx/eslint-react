[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ObjectPattern

# Interface: ObjectPattern

## Extends

- `BaseNode`

## Properties

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

### properties

> **properties**: ([`Property`](../type-aliases/Property.md) \| [`RestElement`](RestElement.md))[]

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

`BaseNode.range`

***

### type

> **type**: [`ObjectPattern`](../README.md#objectpattern)

#### Overrides

`BaseNode.type`

***

### typeAnnotation

> **typeAnnotation**: `undefined` \| [`TSTypeAnnotation`](TSTypeAnnotation.md)
