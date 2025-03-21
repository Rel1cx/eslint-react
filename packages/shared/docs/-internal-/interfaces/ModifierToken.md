[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ModifierToken

# Interface: ModifierToken\<TKind\>

## Extends

- [`KeywordToken`](KeywordToken-1.md)\<`TKind`\>

## Type Parameters

### TKind

`TKind` *extends* [`ModifierSyntaxKind`](../type-aliases/ModifierSyntaxKind.md)

## Properties

### end

> `readonly` **end**: `number`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`end`](KeywordToken-1.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`flags`](KeywordToken-1.md#flags)

***

### kind

> `readonly` **kind**: `TKind`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`kind`](KeywordToken-1.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`parent`](KeywordToken-1.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`pos`](KeywordToken-1.md#pos)

## Methods

### forEachChild()

> **forEachChild**\<`T`\>(`cbNode`, `cbNodeArray`?): `undefined` \| `T`

#### Type Parameters

##### T

`T`

#### Parameters

##### cbNode

(`node`) => `undefined` \| `T`

##### cbNodeArray?

(`nodes`) => `undefined` \| `T`

#### Returns

`undefined` \| `T`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`forEachChild`](KeywordToken-1.md#foreachchild)

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

[`KeywordToken`](KeywordToken-1.md).[`getChildAt`](KeywordToken-1.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getChildCount`](KeywordToken-1.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getChildren`](KeywordToken-1.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getEnd`](KeywordToken-1.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getFirstToken`](KeywordToken-1.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getFullStart`](KeywordToken-1.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getFullText`](KeywordToken-1.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getFullWidth`](KeywordToken-1.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getLastToken`](KeywordToken-1.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getLeadingTriviaWidth`](KeywordToken-1.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getSourceFile`](KeywordToken-1.md#getsourcefile)

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

[`KeywordToken`](KeywordToken-1.md).[`getStart`](KeywordToken-1.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getText`](KeywordToken-1.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken-1.md).[`getWidth`](KeywordToken-1.md#getwidth)
