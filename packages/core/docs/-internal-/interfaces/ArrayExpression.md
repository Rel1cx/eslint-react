[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ArrayExpression

# Interface: ArrayExpression

## Extends

- `BaseNode`

## Properties

### elements

> **elements**: (`null` \| `SpreadElement` \| [`Expression`](../type-aliases/Expression.md))[]

an element will be `null` in the case of a sparse array: `[1, ,3]`

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

> **type**: [`ArrayExpression`](../README.md#arrayexpression)

#### Overrides

`BaseNode.type`
