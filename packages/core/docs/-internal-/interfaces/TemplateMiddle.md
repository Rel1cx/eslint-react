[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / TemplateMiddle

# Interface: TemplateMiddle

## Extends

- [`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md)

## Properties

### end

> `readonly` **end**: `number`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`end`](TemplateLiteralLikeNode.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`flags`](TemplateLiteralLikeNode.md#flags)

***

### hasExtendedUnicodeEscape?

> `optional` **hasExtendedUnicodeEscape**: `boolean`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`hasExtendedUnicodeEscape`](TemplateLiteralLikeNode.md#hasextendedunicodeescape)

***

### isUnterminated?

> `optional` **isUnterminated**: `boolean`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`isUnterminated`](TemplateLiteralLikeNode.md#isunterminated)

***

### kind

> `readonly` **kind**: [`TemplateMiddle`](../enumerations/SyntaxKind.md#templatemiddle)

#### Overrides

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`kind`](TemplateLiteralLikeNode.md#kind)

***

### parent

> `readonly` **parent**: [`TemplateSpan`](TemplateSpan.md) \| [`TemplateLiteralTypeSpan`](TemplateLiteralTypeSpan.md)

#### Overrides

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`parent`](TemplateLiteralLikeNode.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`pos`](TemplateLiteralLikeNode.md#pos)

***

### rawText?

> `optional` **rawText**: `string`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`rawText`](TemplateLiteralLikeNode.md#rawtext)

***

### text

> **text**: `string`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`text`](TemplateLiteralLikeNode.md#text)

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

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`forEachChild`](TemplateLiteralLikeNode.md#foreachchild)

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

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getChildAt`](TemplateLiteralLikeNode.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getChildCount`](TemplateLiteralLikeNode.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getChildren`](TemplateLiteralLikeNode.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getEnd`](TemplateLiteralLikeNode.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getFirstToken`](TemplateLiteralLikeNode.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getFullStart`](TemplateLiteralLikeNode.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getFullText`](TemplateLiteralLikeNode.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getFullWidth`](TemplateLiteralLikeNode.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getLastToken`](TemplateLiteralLikeNode.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getLeadingTriviaWidth`](TemplateLiteralLikeNode.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getSourceFile`](TemplateLiteralLikeNode.md#getsourcefile)

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

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getStart`](TemplateLiteralLikeNode.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getText`](TemplateLiteralLikeNode.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`TemplateLiteralLikeNode`](TemplateLiteralLikeNode.md).[`getWidth`](TemplateLiteralLikeNode.md#getwidth)
