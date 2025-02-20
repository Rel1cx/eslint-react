[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / SourceCode

# Class: SourceCode

## Extends

- [`SourceCode_base`](../variables/SourceCode_base.md)

## Constructors

### new SourceCode()

> **new SourceCode**(`text`, `ast`): [`SourceCode`](SourceCode.md)

Represents parsed source code.

#### Parameters

##### text

`string`

##### ast

[`Program`](../namespaces/SourceCode/interfaces/Program.md)

The Program node of the AST representing the code. This AST should be created from the text that BOM was stripped.

#### Returns

[`SourceCode`](SourceCode.md)

#### Inherited from

`SourceCode_base.constructor`

### new SourceCode()

> **new SourceCode**(`config`): [`SourceCode`](SourceCode.md)

Represents parsed source code.

#### Parameters

##### config

[`SourceCodeConfig`](../namespaces/SourceCode/interfaces/SourceCodeConfig.md)

The config object.

#### Returns

[`SourceCode`](SourceCode.md)

#### Inherited from

`SourceCode_base.constructor`

## Properties

### ast

> **ast**: [`Program`](../namespaces/SourceCode/interfaces/Program.md)

The parsed AST for the source code.

#### Inherited from

`SourceCode_base.ast`

***

### hasBOM

> **hasBOM**: `boolean`

The flag to indicate that the source code has Unicode BOM.

#### Inherited from

`SourceCode_base.hasBOM`

***

### lines

> **lines**: `string`[]

The source code split into lines according to ECMA-262 specification.
This is done to avoid each rule needing to do so separately.

#### Inherited from

`SourceCode_base.lines`

***

### lineStartIndices

> **lineStartIndices**: `number`[]

The indexes in `text` that each line starts

#### Inherited from

`SourceCode_base.lineStartIndices`

***

### parserServices?

> `optional` **parserServices**: [`Partial`](../type-aliases/Partial.md)\<[`ParserServices`](../type-aliases/ParserServices.md)\>

The parser services of this source code.

#### Inherited from

`SourceCode_base.parserServices`

***

### scopeManager

> **scopeManager**: `null` \| [`ScopeManager`](ScopeManager.md)

The scope of this source code.

#### Inherited from

`SourceCode_base.scopeManager`

***

### text

> **text**: `string`

The original text source code. BOM was stripped from this text.

#### Inherited from

`SourceCode_base.text`

***

### tokensAndComments

> **tokensAndComments**: [`Token`](../type-aliases/Token.md)[]

All of the tokens and comments in the AST.

TODO: rename to 'tokens'

#### Inherited from

`SourceCode_base.tokensAndComments`

***

### visitorKeys

> **visitorKeys**: [`VisitorKeys`](../interfaces/VisitorKeys.md)

The visitor keys to traverse AST.

#### Inherited from

`SourceCode_base.visitorKeys`

## Methods

### applyInlineConfig()

> **applyInlineConfig**(): `void`

#### Returns

`void`

#### Inherited from

`SourceCode_base.applyInlineConfig`

***

### applyLanguageOptions()

> **applyLanguageOptions**(): `void`

#### Returns

`void`

#### Inherited from

`SourceCode_base.applyLanguageOptions`

***

### commentsExistBetween()

> **commentsExistBetween**(`left`, `right`): `boolean`

Checks whether any comments exist or not between the given 2 nodes.

#### Parameters

##### left

The node to check.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### right

The node to check.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

#### Returns

`boolean`

`true` if one or more comments exist.

#### Inherited from

`SourceCode_base.commentsExistBetween`

***

### finalize()

> **finalize**(): `void`

#### Returns

`void`

#### Inherited from

`SourceCode_base.finalize`

***

### getAllComments()

> **getAllComments**(): [`Comment`](../type-aliases/Comment.md)[]

Retrieves an array containing all comments in the source code.

#### Returns

[`Comment`](../type-aliases/Comment.md)[]

An array of comment nodes.

#### Inherited from

`SourceCode_base.getAllComments`

***

### getAncestors()

> **getAncestors**(`node`): [`Node`](../type-aliases/Node.md)[]

Returns an array of the ancestors of the given node, starting at
the root of the AST and continuing through the direct parent of the current node.
This array does not include the currently-traversed node itself.

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

#### Returns

[`Node`](../type-aliases/Node.md)[]

#### Inherited from

`SourceCode_base.getAncestors`

***

### getCommentsAfter()

> **getCommentsAfter**(`nodeOrToken`): [`Comment`](../type-aliases/Comment.md)[]

Gets all comment tokens directly after the given node or token.

#### Parameters

##### nodeOrToken

The AST node or token to check for adjacent comment tokens.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

#### Returns

[`Comment`](../type-aliases/Comment.md)[]

An array of comments in occurrence order.

#### Inherited from

`SourceCode_base.getCommentsAfter`

***

### getCommentsBefore()

> **getCommentsBefore**(`nodeOrToken`): [`Comment`](../type-aliases/Comment.md)[]

Gets all comment tokens directly before the given node or token.

#### Parameters

##### nodeOrToken

The AST node or token to check for adjacent comment tokens.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

#### Returns

[`Comment`](../type-aliases/Comment.md)[]

An array of comments in occurrence order.

#### Inherited from

`SourceCode_base.getCommentsBefore`

***

### getCommentsInside()

> **getCommentsInside**(`node`): [`Comment`](../type-aliases/Comment.md)[]

Gets all comment tokens inside the given node.

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

The AST node to get the comments for.

#### Returns

[`Comment`](../type-aliases/Comment.md)[]

An array of comments in occurrence order.

#### Inherited from

`SourceCode_base.getCommentsInside`

***

### getDeclaredVariables()

> **getDeclaredVariables**(`node`): readonly [`ScopeVariable`](../type-aliases/ScopeVariable.md)[]

Returns a list of variables declared by the given node.
This information can be used to track references to variables.

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

#### Returns

readonly [`ScopeVariable`](../type-aliases/ScopeVariable.md)[]

#### Inherited from

`SourceCode_base.getDeclaredVariables`

***

### getFirstToken()

> **getFirstToken**\<`T`\>(`node`, `options`?): `null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

Gets the first token of the given node.

#### Type Parameters

• **T** *extends* [`CursorWithSkipOptions`](../namespaces/SourceCode/type-aliases/CursorWithSkipOptions.md)

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

The AST node.

##### options?

`T`

The option object. If this is a number then it's `options.skip`. If this is a function then it's `options.filter`.

#### Returns

`null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

An object representing the token.

#### Inherited from

`SourceCode_base.getFirstToken`

***

### getFirstTokenBetween()

> **getFirstTokenBetween**\<`T`\>(`left`, `right`, `options`?): `null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

Gets the first token between two non-overlapping nodes.

#### Type Parameters

• **T** *extends* [`CursorWithSkipOptions`](../namespaces/SourceCode/type-aliases/CursorWithSkipOptions.md)

#### Parameters

##### left

Node before the desired token range.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### right

Node after the desired token range.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### options?

`T`

The option object. If this is a number then it's `options.skip`. If this is a function then it's `options.filter`.

#### Returns

`null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

An object representing the token.

#### Inherited from

`SourceCode_base.getFirstTokenBetween`

***

### getFirstTokens()

> **getFirstTokens**\<`T`\>(`node`, `options`?): [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Gets the first `count` tokens of the given node.

#### Type Parameters

• **T** *extends* [`CursorWithCountOptions`](../namespaces/SourceCode/type-aliases/CursorWithCountOptions.md)

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

The AST node.

##### options?

`T`

The option object. If this is a number then it's `options.count`. If this is a function then it's `options.filter`.

#### Returns

[`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

#### Inherited from

`SourceCode_base.getFirstTokens`

***

### getFirstTokensBetween()

> **getFirstTokensBetween**\<`T`\>(`left`, `right`, `options`?): [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Gets the first `count` tokens between two non-overlapping nodes.

#### Type Parameters

• **T** *extends* [`CursorWithCountOptions`](../namespaces/SourceCode/type-aliases/CursorWithCountOptions.md)

#### Parameters

##### left

Node before the desired token range.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### right

Node after the desired token range.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### options?

`T`

The option object. If this is a number then it's `options.count`. If this is a function then it's `options.filter`.

#### Returns

[`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Tokens between left and right.

#### Inherited from

`SourceCode_base.getFirstTokensBetween`

***

### getIndexFromLoc()

> **getIndexFromLoc**(`location`): `number`

Converts a (line, column) pair into a range index.

#### Parameters

##### location

[`Position`](../interfaces/Position.md)

A line/column location

#### Returns

`number`

The range index of the location in the file.

#### Inherited from

`SourceCode_base.getIndexFromLoc`

***

### getLastToken()

> **getLastToken**\<`T`\>(`node`, `options`?): `null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

Gets the last token of the given node.

#### Type Parameters

• **T** *extends* [`CursorWithSkipOptions`](../namespaces/SourceCode/type-aliases/CursorWithSkipOptions.md)

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

The AST node.

##### options?

`T`

The option object. If this is a number then it's `options.skip`. If this is a function then it's `options.filter`.

#### Returns

`null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

An object representing the token.

#### Inherited from

`SourceCode_base.getLastToken`

***

### getLastTokenBetween()

> **getLastTokenBetween**\<`T`\>(`left`, `right`, `options`?): `null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

Gets the last token between two non-overlapping nodes.

#### Type Parameters

• **T** *extends* [`CursorWithSkipOptions`](../namespaces/SourceCode/type-aliases/CursorWithSkipOptions.md)

#### Parameters

##### left

Node before the desired token range.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### right

Node after the desired token range.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### options?

`T`

The option object. If this is a number then it's `options.skip`. If this is a function then it's `options.filter`.

#### Returns

`null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

An object representing the token.

#### Inherited from

`SourceCode_base.getLastTokenBetween`

***

### getLastTokens()

> **getLastTokens**\<`T`\>(`node`, `options`?): [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Gets the last `count` tokens of the given node.

#### Type Parameters

• **T** *extends* [`CursorWithCountOptions`](../namespaces/SourceCode/type-aliases/CursorWithCountOptions.md)

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

The AST node.

##### options?

`T`

The option object. If this is a number then it's `options.count`. If this is a function then it's `options.filter`.

#### Returns

[`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

#### Inherited from

`SourceCode_base.getLastTokens`

***

### getLastTokensBetween()

> **getLastTokensBetween**\<`T`\>(`left`, `right`, `options`?): [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Gets the last `count` tokens between two non-overlapping nodes.

#### Type Parameters

• **T** *extends* [`CursorWithCountOptions`](../namespaces/SourceCode/type-aliases/CursorWithCountOptions.md)

#### Parameters

##### left

Node before the desired token range.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### right

Node after the desired token range.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### options?

`T`

The option object. If this is a number then it's `options.count`. If this is a function then it's `options.filter`.

#### Returns

[`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Tokens between left and right.

#### Inherited from

`SourceCode_base.getLastTokensBetween`

***

### getLines()

> **getLines**(): `string`[]

Gets the entire source text split into an array of lines.

#### Returns

`string`[]

The source text as an array of lines.

#### Inherited from

`SourceCode_base.getLines`

***

### getLocFromIndex()

> **getLocFromIndex**(`index`): [`Position`](../interfaces/Position.md)

Converts a source text index into a (line, column) pair.

#### Parameters

##### index

`number`

The index of a character in a file

#### Returns

[`Position`](../interfaces/Position.md)

A {line, column} location object with a 0-indexed column

#### Inherited from

`SourceCode_base.getLocFromIndex`

***

### getNodeByRangeIndex()

> **getNodeByRangeIndex**(`index`): `null` \| [`Node`](../type-aliases/Node.md)

Gets the deepest node containing a range index.

#### Parameters

##### index

`number`

Range index of the desired node.

#### Returns

`null` \| [`Node`](../type-aliases/Node.md)

The node if found or `null` if not found.

#### Inherited from

`SourceCode_base.getNodeByRangeIndex`

***

### getScope()

> **getScope**(`node`): [`Scope`](../type-aliases/Scope.md)

Returns the scope of the given node.
This information can be used track references to variables.

#### Parameters

##### node

[`Node`](../type-aliases/Node.md)

#### Returns

[`Scope`](../type-aliases/Scope.md)

#### Inherited from

`SourceCode_base.getScope`

***

### getText()

> **getText**(`node`?, `beforeCount`?, `afterCount`?): `string`

Gets the source code for the given node.

#### Parameters

##### node?

The AST node to get the text for.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### beforeCount?

`number`

The number of characters before the node to retrieve.

##### afterCount?

`number`

The number of characters after the node to retrieve.

#### Returns

`string`

The text representing the AST node.

#### Inherited from

`SourceCode_base.getText`

***

### getTokenAfter()

> **getTokenAfter**\<`T`\>(`node`, `options`?): `null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

Gets the token that follows a given node or token.

#### Type Parameters

• **T** *extends* [`CursorWithSkipOptions`](../namespaces/SourceCode/type-aliases/CursorWithSkipOptions.md)

#### Parameters

##### node

The AST node or token.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### options?

`T`

The option object. If this is a number then it's `options.skip`. If this is a function then it's `options.filter`.

#### Returns

`null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

An object representing the token.

#### Inherited from

`SourceCode_base.getTokenAfter`

***

### getTokenBefore()

> **getTokenBefore**\<`T`\>(`node`, `options`?): `null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

Gets the token that precedes a given node or token.

#### Type Parameters

• **T** *extends* [`CursorWithSkipOptions`](../namespaces/SourceCode/type-aliases/CursorWithSkipOptions.md)

#### Parameters

##### node

The AST node or token.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### options?

`T`

The option object

#### Returns

`null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

An object representing the token.

#### Inherited from

`SourceCode_base.getTokenBefore`

***

### getTokenByRangeStart()

> **getTokenByRangeStart**\<`T`\>(`offset`, `options`?): `null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

Gets the token starting at the specified index.

#### Type Parameters

• **T** *extends* `object`

#### Parameters

##### offset

`number`

Index of the start of the token's range.

##### options?

`T`

The option object. If this is a number then it's `options.skip`. If this is a function then it's `options.filter`.

#### Returns

`null` \| [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>

The token starting at index, or null if no such token.

#### Inherited from

`SourceCode_base.getTokenByRangeStart`

***

### getTokens()

#### Call Signature

> **getTokens**(`node`, `beforeCount`?, `afterCount`?): [`Token`](../type-aliases/Token.md)[]

Gets all tokens that are related to the given node.

##### Parameters

###### node

[`Node`](../type-aliases/Node.md)

The AST node.

###### beforeCount?

`number`

The number of tokens before the node to retrieve.

###### afterCount?

`number`

The number of tokens after the node to retrieve.

##### Returns

[`Token`](../type-aliases/Token.md)[]

Array of objects representing tokens.

##### Inherited from

`SourceCode_base.getTokens`

#### Call Signature

> **getTokens**\<`T`\>(`node`, `options`): [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Gets all tokens that are related to the given node.

##### Type Parameters

• **T** *extends* [`CursorWithCountOptions`](../namespaces/SourceCode/type-aliases/CursorWithCountOptions.md)

##### Parameters

###### node

[`Node`](../type-aliases/Node.md)

The AST node.

###### options

`T`

The option object. If this is a function then it's `options.filter`.

##### Returns

[`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Array of objects representing tokens.

##### Inherited from

`SourceCode_base.getTokens`

***

### getTokensAfter()

> **getTokensAfter**\<`T`\>(`node`, `options`?): [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Gets the `count` tokens that follows a given node or token.

#### Type Parameters

• **T** *extends* [`CursorWithCountOptions`](../namespaces/SourceCode/type-aliases/CursorWithCountOptions.md)

#### Parameters

##### node

The AST node.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### options?

The option object. If this is a number then it's `options.count`. If this is a function then it's `options.filter`.

`number` | `T`

#### Returns

[`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

#### Inherited from

`SourceCode_base.getTokensAfter`

***

### getTokensBefore()

> **getTokensBefore**\<`T`\>(`node`, `options`?): [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Gets the `count` tokens that precedes a given node or token.

#### Type Parameters

• **T** *extends* [`CursorWithCountOptions`](../namespaces/SourceCode/type-aliases/CursorWithCountOptions.md)

#### Parameters

##### node

The AST node.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### options?

The option object. If this is a number then it's `options.count`. If this is a function then it's `options.filter`.

`number` | `T`

#### Returns

[`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

#### Inherited from

`SourceCode_base.getTokensBefore`

***

### getTokensBetween()

> **getTokensBetween**\<`T`\>(`left`, `right`, `options`?): [`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Gets all of the tokens between two non-overlapping nodes.

#### Type Parameters

• **T** *extends* [`CursorWithCountOptions`](../namespaces/SourceCode/type-aliases/CursorWithCountOptions.md)

#### Parameters

##### left

Node before the desired token range.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### right

Node after the desired token range.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### options?

The option object. If this is a number then it's `options.count`. If this is a function then it's `options.filter`.

`number` | `T`

#### Returns

[`ReturnTypeFromOptions`](../namespaces/SourceCode/type-aliases/ReturnTypeFromOptions.md)\<`T`\>[]

Tokens between left and right.

#### Inherited from

`SourceCode_base.getTokensBetween`

***

### isSpaceBetween()

> **isSpaceBetween**(`first`, `second`): `boolean`

Determines if two nodes or tokens have at least one whitespace character
between them. Order does not matter. Returns false if the given nodes or
tokens overlap.

#### Parameters

##### first

The first node or token to check between.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

##### second

The second node or token to check between.

[`Node`](../type-aliases/Node.md) | [`Token`](../type-aliases/Token.md)

#### Returns

`boolean`

True if there is a whitespace character between any of the tokens found between the two given nodes or tokens.

#### Inherited from

`SourceCode_base.isSpaceBetween`

***

### ~~isSpaceBetweenTokens()~~

> **isSpaceBetweenTokens**(`first`, `second`): `boolean`

Determines if two nodes or tokens have at least one whitespace character
between them. Order does not matter. Returns false if the given nodes or
tokens overlap.
For backward compatibility, this method returns true if there are
`JSXText` tokens that contain whitespace between the two.

#### Parameters

##### first

[`Token`](../type-aliases/Token.md)

The first node or token to check between.

##### second

[`Token`](../type-aliases/Token.md)

The second node or token to check between.

#### Returns

`boolean`

True if there is a whitespace character between
any of the tokens found between the two given nodes or tokens.

#### Deprecated

in favor of isSpaceBetween

#### Inherited from

`SourceCode_base.isSpaceBetweenTokens`

***

### markVariableAsUsed()

> **markVariableAsUsed**(`name`, `node`): `boolean`

Marks a variable with the given name in the current scope as used.
This affects the no-unused-vars rule.

#### Parameters

##### name

`string`

##### node

[`Node`](../type-aliases/Node.md)

#### Returns

`boolean`

#### Inherited from

`SourceCode_base.markVariableAsUsed`

***

### splitLines()

> `static` **splitLines**(`text`): `string`[]

Split the source code into multiple lines based on the line delimiters.

#### Parameters

##### text

`string`

Source code as a string.

#### Returns

`string`[]

Array of source code lines.

#### Inherited from

`SourceCode_base.splitLines`
