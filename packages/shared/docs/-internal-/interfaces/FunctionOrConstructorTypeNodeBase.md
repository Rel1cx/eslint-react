[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / FunctionOrConstructorTypeNodeBase

# Interface: FunctionOrConstructorTypeNodeBase

## Extends

- [`TypeNode`](TypeNode.md).[`SignatureDeclarationBase`](SignatureDeclarationBase.md)

## Extended by

- [`ConstructorTypeNode`](ConstructorTypeNode.md)
- [`FunctionTypeNode`](FunctionTypeNode.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`_declarationBrand`](SignatureDeclarationBase.md#_declarationbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`_jsdocContainerBrand`](SignatureDeclarationBase.md#_jsdoccontainerbrand)

***

### \_typeNodeBrand

> **\_typeNodeBrand**: `any`

#### Inherited from

[`TypeNode`](TypeNode.md).[`_typeNodeBrand`](TypeNode.md#_typenodebrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`end`](SignatureDeclarationBase.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`flags`](SignatureDeclarationBase.md#flags)

***

### kind

> `readonly` **kind**: [`FunctionType`](../enumerations/SyntaxKind.md#functiontype) \| [`ConstructorType`](../enumerations/SyntaxKind.md#constructortype)

#### Overrides

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`kind`](SignatureDeclarationBase.md#kind)

***

### name?

> `readonly` `optional` **name**: [`PropertyName`](../type-aliases/PropertyName.md)

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`name`](SignatureDeclarationBase.md#name)

***

### parameters

> `readonly` **parameters**: [`NodeArray`](NodeArray.md)\<[`ParameterDeclaration`](ParameterDeclaration.md)\>

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`parameters`](SignatureDeclarationBase.md#parameters)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`parent`](SignatureDeclarationBase.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`pos`](SignatureDeclarationBase.md#pos)

***

### type

> `readonly` **type**: [`TypeNode`](TypeNode.md)

#### Overrides

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`type`](SignatureDeclarationBase.md#type)

***

### typeParameters?

> `readonly` `optional` **typeParameters**: [`NodeArray`](NodeArray.md)\<[`TypeParameterDeclaration`](TypeParameterDeclaration.md)\>

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`typeParameters`](SignatureDeclarationBase.md#typeparameters)

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

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`forEachChild`](SignatureDeclarationBase.md#foreachchild)

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

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getChildAt`](SignatureDeclarationBase.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getChildCount`](SignatureDeclarationBase.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getChildren`](SignatureDeclarationBase.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getEnd`](SignatureDeclarationBase.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getFirstToken`](SignatureDeclarationBase.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getFullStart`](SignatureDeclarationBase.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getFullText`](SignatureDeclarationBase.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getFullWidth`](SignatureDeclarationBase.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getLastToken`](SignatureDeclarationBase.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getLeadingTriviaWidth`](SignatureDeclarationBase.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getSourceFile`](SignatureDeclarationBase.md#getsourcefile)

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

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getStart`](SignatureDeclarationBase.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getText`](SignatureDeclarationBase.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`getWidth`](SignatureDeclarationBase.md#getwidth)
