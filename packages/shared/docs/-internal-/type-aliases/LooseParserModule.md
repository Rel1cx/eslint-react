[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / LooseParserModule

# Type Alias: LooseParserModule

> **LooseParserModule**: \{ `meta`: `{ [K in keyof ParserMeta]?: ParserMeta[K] }`; `parseForESLint`: \{ `ast`: `TSESTree.Program`; `scopeManager`: [`ScopeManager`](ScopeManager.md); `services`: [`ParserServices`](ParserServices.md); `visitorKeys`: [`VisitorKeys`](../interfaces/VisitorKeys.md); \}; \} \| \{ `meta`: `{ [K in keyof ParserMeta]?: ParserMeta[K] }`; `parse`: `unknown`; \}

A loose definition of the ParserModule type for use with configs
This type intended to relax validation of configs so that parsers that have
different AST types or scope managers can still be passed to configs

## Type declaration

\{ `meta`: `{ [K in keyof ParserMeta]?: ParserMeta[K] }`; `parseForESLint`: \{ `ast`: `TSESTree.Program`; `scopeManager`: [`ScopeManager`](ScopeManager.md); `services`: [`ParserServices`](ParserServices.md); `visitorKeys`: [`VisitorKeys`](../interfaces/VisitorKeys.md); \}; \}

### meta?

> `optional` **meta**: `{ [K in keyof ParserMeta]?: ParserMeta[K] }`

Information about the parser to uniquely identify it when serializing.

### parseForESLint()

Parses the given text into an AST

#### Parameters

##### text

`string`

##### options?

`unknown`

#### Returns

`object`

##### ast

> **ast**: `TSESTree.Program`

The ESTree AST

##### scopeManager?

> `optional` **scopeManager**: [`ScopeManager`](ScopeManager.md)

A `ScopeManager` object.
Custom parsers can use customized scope analysis for experimental/enhancement syntaxes.
The default is the `ScopeManager` object which is created by `eslint-scope`.

##### services?

> `optional` **services**: [`ParserServices`](ParserServices.md)

Any parser-dependent services (such as type checkers for nodes).
The value of the services property is available to rules as `context.sourceCode.parserServices`.
The default is an empty object.

##### visitorKeys?

> `optional` **visitorKeys**: [`VisitorKeys`](../interfaces/VisitorKeys.md)

An object to customize AST traversal.
The keys of the object are the type of AST nodes.
Each value is an array of the property names which should be traversed.
The default is `KEYS` of `eslint-visitor-keys`.

\{ `meta`: `{ [K in keyof ParserMeta]?: ParserMeta[K] }`; `parse`: `unknown`; \}

### meta?

> `optional` **meta**: `{ [K in keyof ParserMeta]?: ParserMeta[K] }`

Information about the parser to uniquely identify it when serializing.

### parse()

Parses the given text into an ESTree AST

#### Parameters

##### text

`string`

##### options?

`unknown`

#### Returns

`unknown`

## See

LooseRuleDefinition, LooseProcessorModule
