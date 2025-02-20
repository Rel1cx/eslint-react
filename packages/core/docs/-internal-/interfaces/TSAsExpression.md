[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TSAsExpression

# Interface: TSAsExpression

## Extends

- `BaseNode`

## Properties

### expression

> **expression**: [`Expression`](../type-aliases/Expression.md)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

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

> **type**: [`TSAsExpression`](../README.md#tsasexpression)

#### Overrides

`BaseNode.type`

***

### typeAnnotation

> **typeAnnotation**: [`TypeNode`](../type-aliases/TypeNode.md)
