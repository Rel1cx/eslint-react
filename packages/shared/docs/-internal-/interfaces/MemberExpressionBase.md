[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / MemberExpressionBase

# Interface: MemberExpressionBase

## Extends

- `BaseNode`

## Extended by

- [`MemberExpressionComputedName`](MemberExpressionComputedName.md)
- [`MemberExpressionNonComputedName`](MemberExpressionNonComputedName.md)

## Properties

### computed

> **computed**: `boolean`

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### object

> **object**: [`Expression`](../type-aliases/Expression.md)

***

### optional

> **optional**: `boolean`

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

`BaseNode.parent`

***

### property

> **property**: [`PrivateIdentifier`](PrivateIdentifier.md) \| [`Expression`](../type-aliases/Expression.md)

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
