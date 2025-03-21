[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / CallExpression

# Interface: CallExpression

## Extends

- `BaseNode`

## Properties

### arguments

> **arguments**: [`CallExpressionArgument`](../type-aliases/CallExpressionArgument.md)[]

***

### callee

> **callee**: [`Expression`](../type-aliases/Expression.md)

***

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

`BaseNode.loc`

***

### optional

> **optional**: `boolean`

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

> **type**: [`CallExpression`](../README.md#callexpression)

#### Overrides

`BaseNode.type`

***

### typeArguments

> **typeArguments**: `undefined` \| [`TSTypeParameterInstantiation`](TSTypeParameterInstantiation.md)
