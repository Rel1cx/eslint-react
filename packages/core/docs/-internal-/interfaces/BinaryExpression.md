[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / BinaryExpression

# Interface: BinaryExpression

## Extends

- `BaseNode`

## Properties

### left

> **left**: [`PrivateIdentifier`](PrivateIdentifier.md) \| [`Expression`](../type-aliases/Expression.md)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### operator

> **operator**: [`ValueOf`](../type-aliases/ValueOf.md)\<[`BinaryOperatorToText`](BinaryOperatorToText.md)\>

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

> **type**: [`BinaryExpression`](../README.md#binaryexpression)

#### Overrides

`BaseNode.type`
