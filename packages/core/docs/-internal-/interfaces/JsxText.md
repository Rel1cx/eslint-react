[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / JsxText

# Interface: JsxText

## Extends

- [`LiteralLikeNode`](LiteralLikeNode.md)

## Properties

### containsOnlyTriviaWhiteSpaces

> `readonly` **containsOnlyTriviaWhiteSpaces**: `boolean`

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`end`](LiteralLikeNode.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`flags`](LiteralLikeNode.md#flags)

***

### hasExtendedUnicodeEscape?

> `optional` **hasExtendedUnicodeEscape**: `boolean`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`hasExtendedUnicodeEscape`](LiteralLikeNode.md#hasextendedunicodeescape)

***

### isUnterminated?

> `optional` **isUnterminated**: `boolean`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`isUnterminated`](LiteralLikeNode.md#isunterminated)

***

### kind

> `readonly` **kind**: [`JsxText`](../enumerations/SyntaxKind.md#jsxtext)

#### Overrides

[`LiteralLikeNode`](LiteralLikeNode.md).[`kind`](LiteralLikeNode.md#kind)

***

### parent

> `readonly` **parent**: [`JsxElement`](JsxElement.md) \| [`JsxFragment`](JsxFragment.md)

#### Overrides

[`LiteralLikeNode`](LiteralLikeNode.md).[`parent`](LiteralLikeNode.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`pos`](LiteralLikeNode.md#pos)

***

### text

> **text**: `string`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`text`](LiteralLikeNode.md#text)

## Methods

### forEachChild()

> **forEachChild**\<`T`\>(`cbNode`, `cbNodeArray`?): `undefined` \| `T`

#### Type Parameters

• **T**

#### Parameters

##### cbNode

(`node`) => `undefined` \| `T`

##### cbNodeArray?

(`nodes`) => `undefined` \| `T`

#### Returns

`undefined` \| `T`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`forEachChild`](LiteralLikeNode.md#foreachchild)

***

### getChildAt()

> **getChildAt**(`index`, `sourceFile`?): [`Node`](Node.md)

#### Parameters

##### index

`number`

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

[`Node`](Node.md)

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getChildAt`](LiteralLikeNode.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getChildCount`](LiteralLikeNode.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getChildren`](LiteralLikeNode.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getEnd`](LiteralLikeNode.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getFirstToken`](LiteralLikeNode.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getFullStart`](LiteralLikeNode.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getFullText`](LiteralLikeNode.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getFullWidth`](LiteralLikeNode.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getLastToken`](LiteralLikeNode.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getLeadingTriviaWidth`](LiteralLikeNode.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getSourceFile`](LiteralLikeNode.md#getsourcefile)

***

### getStart()

> **getStart**(`sourceFile`?, `includeJsDocComment`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

##### includeJsDocComment?

`boolean`

#### Returns

`number`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getStart`](LiteralLikeNode.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getText`](LiteralLikeNode.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`LiteralLikeNode`](LiteralLikeNode.md).[`getWidth`](LiteralLikeNode.md#getwidth)
