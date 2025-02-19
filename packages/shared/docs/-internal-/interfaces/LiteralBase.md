[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / LiteralBase

# Interface: LiteralBase

## Extends

- `BaseNode`

## Extended by

- [`StringLiteral`](StringLiteral.md)
- [`BigIntLiteral`](BigIntLiteral.md)
- [`BooleanLiteral`](BooleanLiteral.md)
- [`NullLiteral`](NullLiteral.md)
- [`NumberLiteral`](NumberLiteral.md)
- [`RegExpLiteral`](RegExpLiteral.md)

## Properties

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

### raw

> **raw**: `string`

***

### type

> **type**: [`Literal`](../enumerations/AST_NODE_TYPES.md#literal)

#### Overrides

`BaseNode.type`

***

### value

> **value**: `null` \| `string` \| `number` \| `bigint` \| `boolean` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)
