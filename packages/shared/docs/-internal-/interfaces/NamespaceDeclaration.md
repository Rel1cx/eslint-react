[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / NamespaceDeclaration

# Interface: NamespaceDeclaration

## Extends

- [`ModuleDeclaration`](ModuleDeclaration.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`_declarationBrand`](ModuleDeclaration.md#_declarationbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`_jsdocContainerBrand`](ModuleDeclaration.md#_jsdoccontainerbrand)

***

### \_localsContainerBrand

> **\_localsContainerBrand**: `any`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`_localsContainerBrand`](ModuleDeclaration.md#_localscontainerbrand)

***

### \_statementBrand

> **\_statementBrand**: `any`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`_statementBrand`](ModuleDeclaration.md#_statementbrand)

***

### body

> `readonly` **body**: [`NamespaceBody`](../type-aliases/NamespaceBody.md)

#### Overrides

[`ModuleDeclaration`](ModuleDeclaration.md).[`body`](ModuleDeclaration.md#body)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`end`](ModuleDeclaration.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`flags`](ModuleDeclaration.md#flags)

***

### kind

> `readonly` **kind**: [`ModuleDeclaration`](../enumerations/SyntaxKind.md#moduledeclaration)

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`kind`](ModuleDeclaration.md#kind)

***

### modifiers?

> `readonly` `optional` **modifiers**: [`NodeArray`](NodeArray.md)\<[`ModifierLike`](../type-aliases/ModifierLike.md)\>

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`modifiers`](ModuleDeclaration.md#modifiers)

***

### name

> `readonly` **name**: [`Identifier`](Identifier.md)

#### Overrides

[`ModuleDeclaration`](ModuleDeclaration.md).[`name`](ModuleDeclaration.md#name)

***

### parent

> `readonly` **parent**: [`SourceFile`](SourceFile.md) \| [`ModuleBody`](../type-aliases/ModuleBody.md)

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`parent`](ModuleDeclaration.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`pos`](ModuleDeclaration.md#pos)

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

[`ModuleDeclaration`](ModuleDeclaration.md).[`forEachChild`](ModuleDeclaration.md#foreachchild)

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

[`ModuleDeclaration`](ModuleDeclaration.md).[`getChildAt`](ModuleDeclaration.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getChildCount`](ModuleDeclaration.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getChildren`](ModuleDeclaration.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getEnd`](ModuleDeclaration.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getFirstToken`](ModuleDeclaration.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getFullStart`](ModuleDeclaration.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getFullText`](ModuleDeclaration.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getFullWidth`](ModuleDeclaration.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getLastToken`](ModuleDeclaration.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getLeadingTriviaWidth`](ModuleDeclaration.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getSourceFile`](ModuleDeclaration.md#getsourcefile)

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

[`ModuleDeclaration`](ModuleDeclaration.md).[`getStart`](ModuleDeclaration.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getText`](ModuleDeclaration.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`ModuleDeclaration`](ModuleDeclaration.md).[`getWidth`](ModuleDeclaration.md#getwidth)
