[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / NotEmittedTypeElement

# Interface: NotEmittedTypeElement

## Extends

- [`TypeElement`](TypeElement.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`TypeElement`](TypeElement.md).[`_declarationBrand`](TypeElement.md#_declarationbrand)

***

### \_typeElementBrand

> **\_typeElementBrand**: `any`

#### Inherited from

[`TypeElement`](TypeElement.md).[`_typeElementBrand`](TypeElement.md#_typeelementbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`TypeElement`](TypeElement.md).[`end`](TypeElement.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`TypeElement`](TypeElement.md).[`flags`](TypeElement.md#flags)

***

### kind

> `readonly` **kind**: [`NotEmittedTypeElement`](../enumerations/SyntaxKind.md#notemittedtypeelement)

#### Overrides

[`TypeElement`](TypeElement.md).[`kind`](TypeElement.md#kind)

***

### name?

> `readonly` `optional` **name**: [`PropertyName`](../type-aliases/PropertyName.md)

#### Inherited from

[`TypeElement`](TypeElement.md).[`name`](TypeElement.md#name)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`TypeElement`](TypeElement.md).[`parent`](TypeElement.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`TypeElement`](TypeElement.md).[`pos`](TypeElement.md#pos)

***

### questionToken?

> `readonly` `optional` **questionToken**: [`QuestionToken`](../type-aliases/QuestionToken.md)

#### Inherited from

[`TypeElement`](TypeElement.md).[`questionToken`](TypeElement.md#questiontoken)

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

[`TypeElement`](TypeElement.md).[`forEachChild`](TypeElement.md#foreachchild)

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

[`TypeElement`](TypeElement.md).[`getChildAt`](TypeElement.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`TypeElement`](TypeElement.md).[`getChildCount`](TypeElement.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`TypeElement`](TypeElement.md).[`getChildren`](TypeElement.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`TypeElement`](TypeElement.md).[`getEnd`](TypeElement.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`TypeElement`](TypeElement.md).[`getFirstToken`](TypeElement.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`TypeElement`](TypeElement.md).[`getFullStart`](TypeElement.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`TypeElement`](TypeElement.md).[`getFullText`](TypeElement.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`TypeElement`](TypeElement.md).[`getFullWidth`](TypeElement.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`TypeElement`](TypeElement.md).[`getLastToken`](TypeElement.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`TypeElement`](TypeElement.md).[`getLeadingTriviaWidth`](TypeElement.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`TypeElement`](TypeElement.md).[`getSourceFile`](TypeElement.md#getsourcefile)

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

[`TypeElement`](TypeElement.md).[`getStart`](TypeElement.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`TypeElement`](TypeElement.md).[`getText`](TypeElement.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`TypeElement`](TypeElement.md).[`getWidth`](TypeElement.md#getwidth)
