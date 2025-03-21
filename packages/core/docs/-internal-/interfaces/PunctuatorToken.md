[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / PunctuatorToken

# Interface: PunctuatorToken

## Extends

- [`BaseToken`](BaseToken.md)

## Properties

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`BaseToken`](BaseToken.md).[`loc`](BaseToken.md#loc)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`BaseToken`](BaseToken.md).[`range`](BaseToken.md#range)

***

### type

> **type**: [`Punctuator`](../README.md#punctuator)

#### Overrides

[`BaseToken`](BaseToken.md).[`type`](BaseToken.md#type)

***

### value

> **value**: [`ValueOf`](../type-aliases/ValueOf.md)\<[`PunctuatorTokenToText`](PunctuatorTokenToText.md)\>

#### Overrides

[`BaseToken`](BaseToken.md).[`value`](BaseToken.md#value)
