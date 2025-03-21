[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ConditionalExpression

# Interface: ConditionalExpression

## Extends

- `BaseNode`

## Properties

### alternate

> **alternate**: [`Expression`](../type-aliases/Expression.md)

***

### consequent

> **consequent**: [`Expression`](../type-aliases/Expression.md)

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

### test

> **test**: [`Expression`](../type-aliases/Expression.md)

***

### type

> **type**: [`ConditionalExpression`](../README.md#conditionalexpression)

#### Overrides

`BaseNode.type`
