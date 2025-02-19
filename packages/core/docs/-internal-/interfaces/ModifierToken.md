[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ModifierToken

# Interface: ModifierToken\<TKind\>

## Extends

- [`KeywordToken`](KeywordToken.md)\<`TKind`\>

## Type Parameters

• **TKind** *extends* [`ModifierSyntaxKind`](../type-aliases/ModifierSyntaxKind.md)

## Properties

### end

> `readonly` **end**: `number`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`end`](KeywordToken.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`flags`](KeywordToken.md#flags)

***

### kind

> `readonly` **kind**: `TKind`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`kind`](KeywordToken.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`parent`](KeywordToken.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`pos`](KeywordToken.md#pos)

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

[`KeywordToken`](KeywordToken.md).[`forEachChild`](KeywordToken.md#foreachchild)

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

[`KeywordToken`](KeywordToken.md).[`getChildAt`](KeywordToken.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getChildCount`](KeywordToken.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getChildren`](KeywordToken.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getEnd`](KeywordToken.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getFirstToken`](KeywordToken.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getFullStart`](KeywordToken.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getFullText`](KeywordToken.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getFullWidth`](KeywordToken.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getLastToken`](KeywordToken.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getLeadingTriviaWidth`](KeywordToken.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getSourceFile`](KeywordToken.md#getsourcefile)

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

[`KeywordToken`](KeywordToken.md).[`getStart`](KeywordToken.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getText`](KeywordToken.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`KeywordToken`](KeywordToken.md).[`getWidth`](KeywordToken.md#getwidth)
