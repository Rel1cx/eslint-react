[**@eslint-react/core**](../../../../README.md)

***

[@eslint-react/core](../../../../README.md) / [\<internal\>](../../../README.md) / [SourceCode](../README.md) / SourceCodeConfig

# Interface: SourceCodeConfig

## Properties

### ast

> **ast**: [`Program`](Program.md)

The Program node of the AST representing the code. This AST should be created from the text that BOM was stripped.

***

### parserServices

> **parserServices**: `null` \| [`ParserServices`](../../../type-aliases/ParserServices.md)

The parser services.

***

### scopeManager

> **scopeManager**: `null` \| [`ScopeManager`](../../../classes/ScopeManager.md)

The scope of this source code.

***

### text

> **text**: `string`

The source code text.

***

### visitorKeys

> **visitorKeys**: `null` \| [`VisitorKeys`](../../../interfaces/VisitorKeys.md)

The visitor keys to traverse AST.
