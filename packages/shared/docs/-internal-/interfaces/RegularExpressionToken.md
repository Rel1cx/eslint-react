[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / RegularExpressionToken

# Interface: RegularExpressionToken

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

### regex

> **regex**: `object`

#### flags

> **flags**: `string`

#### pattern

> **pattern**: `string`

***

### type

> **type**: [`RegularExpression`](../README.md#regularexpression)

#### Overrides

[`BaseToken`](BaseToken.md).[`type`](BaseToken.md#type)

***

### value

> **value**: `string`

#### Inherited from

[`BaseToken`](BaseToken.md).[`value`](BaseToken.md#value)
