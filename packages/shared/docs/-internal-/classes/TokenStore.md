[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / TokenStore

# Class: TokenStore

## Extended by

- [`SourceCodeBase`](SourceCodeBase.md)

## Constructors

### new TokenStore()

> **new TokenStore**(): [`TokenStore`](TokenStore.md)

#### Returns

[`TokenStore`](TokenStore.md)

## Methods

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
