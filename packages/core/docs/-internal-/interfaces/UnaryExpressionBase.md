[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / UnaryExpressionBase

# Interface: UnaryExpressionBase

## Extends

- `BaseNode`

## Extended by

- [`UnaryExpression`](UnaryExpression.md)
- [`UpdateExpression`](UpdateExpression.md)

## Properties

### argument

> **argument**: [`Expression`](../type-aliases/Expression.md)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### operator

> **operator**: `string`

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

`BaseNode.parent`

***

### prefix

> **prefix**: `boolean`

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

`BaseNode.range`

***

### type

> **type**: [`AST_NODE_TYPES`](../enumerations/AST_NODE_TYPES.md)

#### Inherited from

`BaseNode.type`
