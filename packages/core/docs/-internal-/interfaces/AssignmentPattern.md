[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / AssignmentPattern

# Interface: AssignmentPattern

## Extends

- `BaseNode`

## Properties

### decorators

> **decorators**: [`Decorator`](Decorator.md)[]

***

### left

> **left**: [`BindingName`](../type-aliases/BindingName.md)

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

### right

> **right**: [`Expression`](../type-aliases/Expression.md)

***

### type

> **type**: [`AssignmentPattern`](../README.md#assignmentpattern)

#### Overrides

`BaseNode.type`

***

### typeAnnotation

> **typeAnnotation**: `undefined` \| [`TSTypeAnnotation`](TSTypeAnnotation.md)
