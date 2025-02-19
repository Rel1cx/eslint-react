[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TSLiteralType

# Interface: TSLiteralType

## Extends

- `BaseNode`

## Properties

### literal

> **literal**: [`UnaryExpression`](UnaryExpression.md) \| [`UpdateExpression`](UpdateExpression.md) \| [`LiteralExpression`](../type-aliases/LiteralExpression.md)

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

> **type**: [`TSLiteralType`](../README.md#tsliteraltype)

#### Overrides

`BaseNode.type`
