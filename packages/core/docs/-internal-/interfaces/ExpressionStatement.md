[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ExpressionStatement

# Interface: ExpressionStatement

## Extends

- `BaseNode`

## Properties

### directive

> **directive**: `undefined` \| `string`

***

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

> **type**: [`ExpressionStatement`](../README.md#expressionstatement)

#### Overrides

`BaseNode.type`
