[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JSDocParameterTag

# Interface: JSDocParameterTag

## Extends

- [`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`_declarationBrand`](JSDocPropertyLikeTag.md#_declarationbrand)

***

### comment?

> `readonly` `optional` **comment**: `string` \| [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`comment`](JSDocPropertyLikeTag.md#comment)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`end`](JSDocPropertyLikeTag.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`flags`](JSDocPropertyLikeTag.md#flags)

***

### isBracketed

> `readonly` **isBracketed**: `boolean`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`isBracketed`](JSDocPropertyLikeTag.md#isbracketed)

***

### isNameFirst

> `readonly` **isNameFirst**: `boolean`

Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`isNameFirst`](JSDocPropertyLikeTag.md#isnamefirst)

***

### kind

> `readonly` **kind**: [`JSDocParameterTag`](../enumerations/SyntaxKind.md#jsdocparametertag)

#### Overrides

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`kind`](JSDocPropertyLikeTag.md#kind)

***

### name

> `readonly` **name**: [`EntityName`](../type-aliases/EntityName.md)

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`name`](JSDocPropertyLikeTag.md#name)

***

### parent

> `readonly` **parent**: [`JSDoc`](JSDoc.md)

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`parent`](JSDocPropertyLikeTag.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`pos`](JSDocPropertyLikeTag.md#pos)

***

### tagName

> `readonly` **tagName**: [`Identifier`](Identifier.md)

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`tagName`](JSDocPropertyLikeTag.md#tagname)

***

### typeExpression?

> `readonly` `optional` **typeExpression**: [`JSDocTypeExpression`](JSDocTypeExpression.md)

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`typeExpression`](JSDocPropertyLikeTag.md#typeexpression)

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

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`forEachChild`](JSDocPropertyLikeTag.md#foreachchild)

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

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getChildAt`](JSDocPropertyLikeTag.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getChildCount`](JSDocPropertyLikeTag.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getChildren`](JSDocPropertyLikeTag.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getEnd`](JSDocPropertyLikeTag.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getFirstToken`](JSDocPropertyLikeTag.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getFullStart`](JSDocPropertyLikeTag.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getFullText`](JSDocPropertyLikeTag.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getFullWidth`](JSDocPropertyLikeTag.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getLastToken`](JSDocPropertyLikeTag.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getLeadingTriviaWidth`](JSDocPropertyLikeTag.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getSourceFile`](JSDocPropertyLikeTag.md#getsourcefile)

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

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getStart`](JSDocPropertyLikeTag.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getText`](JSDocPropertyLikeTag.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`JSDocPropertyLikeTag`](JSDocPropertyLikeTag.md).[`getWidth`](JSDocPropertyLikeTag.md#getwidth)
