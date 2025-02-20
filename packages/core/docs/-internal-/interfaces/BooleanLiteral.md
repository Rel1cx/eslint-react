[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / BooleanLiteral

# Interface: BooleanLiteral

## Extends

- [`LiteralBase`](LiteralBase.md)

## Properties

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`LiteralBase`](LiteralBase.md).[`loc`](LiteralBase.md#loc)

***

### parent

> **parent**: [`Node`](../type-aliases/Node.md)

#### Inherited from

[`LiteralBase`](LiteralBase.md).[`parent`](LiteralBase.md#parent)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`LiteralBase`](LiteralBase.md).[`range`](LiteralBase.md#range)

***

### raw

> **raw**: `"false"` \| `"true"`

#### Overrides

[`LiteralBase`](LiteralBase.md).[`raw`](LiteralBase.md#raw)

***

### type

> **type**: [`Literal`](../enumerations/AST_NODE_TYPES.md#literal)

#### Inherited from

[`LiteralBase`](LiteralBase.md).[`type`](LiteralBase.md#type)

***

### value

> **value**: `boolean`

#### Overrides

[`LiteralBase`](LiteralBase.md).[`value`](LiteralBase.md#value)
