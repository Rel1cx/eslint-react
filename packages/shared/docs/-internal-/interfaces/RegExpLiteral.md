[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / RegExpLiteral

# Interface: RegExpLiteral

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

> **raw**: `string`

#### Inherited from

[`LiteralBase`](LiteralBase.md).[`raw`](LiteralBase.md#raw)

***

### regex

> **regex**: `object`

#### flags

> **flags**: `string`

#### pattern

> **pattern**: `string`

***

### type

> **type**: [`Literal`](../enumerations/AST_NODE_TYPES.md#literal)

#### Inherited from

[`LiteralBase`](LiteralBase.md).[`type`](LiteralBase.md#type)

***

### value

> **value**: `null` \| [`RegExp`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp)

#### Overrides

[`LiteralBase`](LiteralBase.md).[`value`](LiteralBase.md#value)
