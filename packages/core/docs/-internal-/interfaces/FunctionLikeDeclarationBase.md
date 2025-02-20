[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / FunctionLikeDeclarationBase

# Interface: FunctionLikeDeclarationBase

Several node kinds share function-like features such as a signature,
a name, and a body. These nodes should extend FunctionLikeDeclarationBase.
Examples:
- FunctionDeclaration
- MethodDeclaration
- AccessorDeclaration

## Extends

- [`SignatureDeclarationBase`](SignatureDeclarationBase.md)

## Extended by

- [`ArrowFunction`](ArrowFunction.md)
- [`ConstructorDeclaration`](ConstructorDeclaration.md)
- [`FunctionDeclaration`](FunctionDeclaration.md)
- [`FunctionExpression`](FunctionExpression.md)
- [`GetAccessorDeclaration`](GetAccessorDeclaration.md)
- [`MethodDeclaration`](MethodDeclaration.md)
- [`SetAccessorDeclaration`](SetAccessorDeclaration.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`_declarationBrand`](SignatureDeclarationBase.md#_declarationbrand)

***

### \_functionLikeDeclarationBrand

> **\_functionLikeDeclarationBrand**: `any`

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`_jsdocContainerBrand`](SignatureDeclarationBase.md#_jsdoccontainerbrand)

***

### asteriskToken?

> `readonly` `optional` **asteriskToken**: [`AsteriskToken`](../type-aliases/AsteriskToken.md)

***

### body?

> `readonly` `optional` **body**: [`Expression`](Expression.md) \| [`Block`](Block.md)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`end`](SignatureDeclarationBase.md#end)

***

### exclamationToken?

> `readonly` `optional` **exclamationToken**: [`ExclamationToken`](../type-aliases/ExclamationToken.md)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`SignatureDeclarationBase`](SignatureDeclarationBase.md).[`flags`](SignatureDeclarationBase.md#flags)

***

### kind

> `readonly` **kind**: [`MethodSignature`](../enumerations/SyntaxKind.md#methodsignature) \| [`MethodDeclaration`](../enumerations/SyntaxKind.md#methoddeclaration) \| [`Constructor`](../enumerations/SyntaxKind.md#constructor) \| [`GetAccessor`](../enumerations/SyntaxKind.md#getaccessor) \| [`SetAccessor`](../enumerations/SyntaxKind.md#setaccessor) \| [`CallSignature`](../enumerations/SyntaxKind.md#callsignature) \| [`ConstructSignature`](../enumerations/SyntaxKind.md#constructsignature) \| [`IndexSignature`](../enumerations/SyntaxKind.md#indexsignature) \| [`FunctionType`](../enumerations/SyntaxKind.md#functiontype) \| [`ConstructorType`](../enumerations/SyntaxKind.md#constructortype) \| [`FunctionExpression`](../enumerations/SyntaxKind.md#functionexpression) \| [`ArrowFunction`](../enumerations/SyntaxKind.md#arrowfunction) \| [`FunctionDeclaration`](../enumerations/SyntaxKind.md#functiondeclaration) \| [`JSDocFunctionType`](../enumerations/SyntaxKind.md#jsdocfunctiontype)

#### Inherited from

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

### questionToken?

> `readonly` `optional` **questionToken**: [`QuestionToken`](../type-aliases/QuestionToken.md)

***

### type?

> `readonly` `optional` **type**: [`TypeNode`](TypeNode.md)

#### Inherited from

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
