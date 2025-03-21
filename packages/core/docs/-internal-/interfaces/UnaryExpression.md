[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / UnaryExpression

# Interface: UnaryExpression

## Extends

- [`UnaryExpressionBase`](UnaryExpressionBase.md)

## Properties

### argument

> **argument**: [`Expression`](../type-aliases/Expression.md)

#### Inherited from

[`UnaryExpressionBase`](UnaryExpressionBase.md).[`argument`](UnaryExpressionBase.md#argument)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`UnaryExpressionBase`](UnaryExpressionBase.md).[`loc`](UnaryExpressionBase.md#loc)

***

### operator

> **operator**: `"+"` \| `"-"` \| `"!"` \| `"~"` \| `"delete"` \| `"typeof"` \| `"void"`

#### Overrides

[`UnaryExpressionBase`](UnaryExpressionBase.md).[`operator`](UnaryExpressionBase.md#operator)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`UnaryExpressionBase`](UnaryExpressionBase.md).[`parent`](UnaryExpressionBase.md#parent)

***

### prefix

> **prefix**: `boolean`

#### Inherited from

[`UnaryExpressionBase`](UnaryExpressionBase.md).[`prefix`](UnaryExpressionBase.md#prefix)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`UnaryExpressionBase`](UnaryExpressionBase.md).[`range`](UnaryExpressionBase.md#range)

***

### type

> **type**: [`UnaryExpression`](../README.md#unaryexpression)

#### Overrides

[`UnaryExpressionBase`](UnaryExpressionBase.md).[`type`](UnaryExpressionBase.md#type)
