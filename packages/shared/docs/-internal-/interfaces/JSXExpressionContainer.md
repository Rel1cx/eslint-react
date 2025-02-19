[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JSXExpressionContainer

# Interface: JSXExpressionContainer

## Extends

- `BaseNode`

## Properties

### expression

> **expression**: [`JSXEmptyExpression`](JSXEmptyExpression.md) \| [`Expression`](../type-aliases/Expression.md)

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

> **type**: [`JSXExpressionContainer`](../README.md#jsxexpressioncontainer)

#### Overrides

`BaseNode.type`
