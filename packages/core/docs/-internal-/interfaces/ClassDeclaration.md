[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ClassDeclaration

# Interface: ClassDeclaration

## Extends

- [`ClassLikeDeclarationBase`](ClassLikeDeclarationBase.md).[`DeclarationStatement`](DeclarationStatement.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`_declarationBrand`](DeclarationStatement.md#_declarationbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`_jsdocContainerBrand`](DeclarationStatement.md#_jsdoccontainerbrand)

***

### \_statementBrand

> **\_statementBrand**: `any`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`_statementBrand`](DeclarationStatement.md#_statementbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`end`](DeclarationStatement.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`flags`](DeclarationStatement.md#flags)

***

### heritageClauses?

> `readonly` `optional` **heritageClauses**: [`NodeArray`](NodeArray.md)\<[`HeritageClause`](HeritageClause.md)\>

#### Inherited from

[`ClassLikeDeclarationBase`](ClassLikeDeclarationBase.md).[`heritageClauses`](ClassLikeDeclarationBase.md#heritageclauses)

***

### kind

> `readonly` **kind**: [`ClassDeclaration`](../enumerations/SyntaxKind.md#classdeclaration)

#### Overrides

[`DeclarationStatement`](DeclarationStatement.md).[`kind`](DeclarationStatement.md#kind)

***

### members

> `readonly` **members**: [`NodeArray`](NodeArray.md)\<[`ClassElement`](ClassElement.md)\>

#### Inherited from

[`ClassLikeDeclarationBase`](ClassLikeDeclarationBase.md).[`members`](ClassLikeDeclarationBase.md#members)

***

### modifiers?

> `readonly` `optional` **modifiers**: [`NodeArray`](NodeArray.md)\<[`ModifierLike`](../type-aliases/ModifierLike.md)\>

***

### name?

> `readonly` `optional` **name**: [`Identifier`](Identifier.md)

May be undefined in `export default class { ... }`.

#### Overrides

[`DeclarationStatement`](DeclarationStatement.md).[`name`](DeclarationStatement.md#name)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`parent`](DeclarationStatement.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`pos`](DeclarationStatement.md#pos)

***

### typeParameters?

> `readonly` `optional` **typeParameters**: [`NodeArray`](NodeArray.md)\<[`TypeParameterDeclaration`](TypeParameterDeclaration.md)\>

#### Inherited from

[`ClassLikeDeclarationBase`](ClassLikeDeclarationBase.md).[`typeParameters`](ClassLikeDeclarationBase.md#typeparameters)

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

[`DeclarationStatement`](DeclarationStatement.md).[`forEachChild`](DeclarationStatement.md#foreachchild)

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

[`DeclarationStatement`](DeclarationStatement.md).[`getChildAt`](DeclarationStatement.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getChildCount`](DeclarationStatement.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getChildren`](DeclarationStatement.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getEnd`](DeclarationStatement.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getFirstToken`](DeclarationStatement.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getFullStart`](DeclarationStatement.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getFullText`](DeclarationStatement.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getFullWidth`](DeclarationStatement.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getLastToken`](DeclarationStatement.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getLeadingTriviaWidth`](DeclarationStatement.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getSourceFile`](DeclarationStatement.md#getsourcefile)

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

[`DeclarationStatement`](DeclarationStatement.md).[`getStart`](DeclarationStatement.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getText`](DeclarationStatement.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`DeclarationStatement`](DeclarationStatement.md).[`getWidth`](DeclarationStatement.md#getwidth)
