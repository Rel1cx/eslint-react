[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / BaseToken

# Interface: BaseToken

## Extends

- [`NodeOrTokenData`](NodeOrTokenData.md)

## Extended by

- [`BlockComment`](BlockComment.md)
- [`LineComment`](LineComment.md)
- [`BooleanToken`](BooleanToken.md)
- [`IdentifierToken`](IdentifierToken.md)
- [`JSXIdentifierToken`](JSXIdentifierToken.md)
- [`JSXTextToken`](JSXTextToken.md)
- [`KeywordToken`](KeywordToken.md)
- [`NullToken`](NullToken.md)
- [`NumericToken`](NumericToken.md)
- [`PunctuatorToken`](PunctuatorToken.md)
- [`RegularExpressionToken`](RegularExpressionToken.md)
- [`StringToken`](StringToken.md)
- [`TemplateToken`](TemplateToken.md)

## Properties

### loc

> **loc**: [`SourceLocation`](SourceLocation.md)

The source location information of the node.

The loc property is defined as nullable by ESTree, but ESLint requires this property.

#### Inherited from

[`NodeOrTokenData`](NodeOrTokenData.md).[`loc`](NodeOrTokenData.md#loc)

***

### range

> **range**: [`Range`](../type-aliases/Range.md)

#### Inherited from

[`NodeOrTokenData`](NodeOrTokenData.md).[`range`](NodeOrTokenData.md#range)

***

### type

> **type**: [`AST_TOKEN_TYPES`](../enumerations/AST_TOKEN_TYPES.md)

#### Overrides

[`NodeOrTokenData`](NodeOrTokenData.md).[`type`](NodeOrTokenData.md#type)

***

### value

> **value**: `string`
