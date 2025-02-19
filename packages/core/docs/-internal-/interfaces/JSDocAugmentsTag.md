[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / JSDocAugmentsTag

# Interface: JSDocAugmentsTag

Note that `@extends` is a synonym of `@augments`.
Both tags are represented by this interface.

## Extends

- [`JSDocTag`](JSDocTag.md)

## Properties

### class

> `readonly` **class**: [`ExpressionWithTypeArguments`](ExpressionWithTypeArguments.md) & `object`

#### Type declaration

##### expression

> `readonly` **expression**: [`Identifier`](Identifier.md) \| [`PropertyAccessEntityNameExpression`](PropertyAccessEntityNameExpression.md)

***

### comment?

> `readonly` `optional` **comment**: `string` \| [`NodeArray`](NodeArray.md)\<[`JSDocComment`](../type-aliases/JSDocComment.md)\>

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`comment`](JSDocTag.md#comment)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`end`](JSDocTag.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`flags`](JSDocTag.md#flags)

***

### kind

> `readonly` **kind**: [`JSDocAugmentsTag`](../enumerations/SyntaxKind.md#jsdocaugmentstag)

#### Overrides

[`JSDocTag`](JSDocTag.md).[`kind`](JSDocTag.md#kind)

***

### parent

> `readonly` **parent**: [`JSDoc`](JSDoc.md) \| [`JSDocTypeLiteral`](JSDocTypeLiteral.md)

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`parent`](JSDocTag.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`pos`](JSDocTag.md#pos)

***

### tagName

> `readonly` **tagName**: [`Identifier`](Identifier.md)

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`tagName`](JSDocTag.md#tagname)

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

[`JSDocTag`](JSDocTag.md).[`forEachChild`](JSDocTag.md#foreachchild)

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

[`JSDocTag`](JSDocTag.md).[`getChildAt`](JSDocTag.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getChildCount`](JSDocTag.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getChildren`](JSDocTag.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getEnd`](JSDocTag.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getFirstToken`](JSDocTag.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getFullStart`](JSDocTag.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getFullText`](JSDocTag.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getFullWidth`](JSDocTag.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getLastToken`](JSDocTag.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getLeadingTriviaWidth`](JSDocTag.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getSourceFile`](JSDocTag.md#getsourcefile)

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

[`JSDocTag`](JSDocTag.md).[`getStart`](JSDocTag.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getText`](JSDocTag.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`JSDocTag`](JSDocTag.md).[`getWidth`](JSDocTag.md#getwidth)
