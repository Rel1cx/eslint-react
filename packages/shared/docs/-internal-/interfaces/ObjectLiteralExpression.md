[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ObjectLiteralExpression

# Interface: ObjectLiteralExpression

This interface is a base interface for ObjectLiteralExpression and JSXAttributes to extend from. JSXAttributes is similar to
ObjectLiteralExpression in that it contains array of properties; however, JSXAttributes' properties can only be
JSXAttribute or JSXSpreadAttribute. ObjectLiteralExpression, on the other hand, can only have properties of type
ObjectLiteralElement (e.g. PropertyAssignment, ShorthandPropertyAssignment etc.)

## Extends

- [`ObjectLiteralExpressionBase`](ObjectLiteralExpressionBase.md)\<[`ObjectLiteralElementLike`](../type-aliases/ObjectLiteralElementLike.md)\>.[`JSDocContainer`](JSDocContainer.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`ObjectLiteralExpressionBase`](ObjectLiteralExpressionBase.md).[`_declarationBrand`](ObjectLiteralExpressionBase.md#_declarationbrand)

***

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`ObjectLiteralExpressionBase`](ObjectLiteralExpressionBase.md).[`_expressionBrand`](ObjectLiteralExpressionBase.md#_expressionbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`_jsdocContainerBrand`](JSDocContainer.md#_jsdoccontainerbrand)

***

### \_leftHandSideExpressionBrand

> **\_leftHandSideExpressionBrand**: `any`

#### Inherited from

[`ObjectLiteralExpressionBase`](ObjectLiteralExpressionBase.md).[`_leftHandSideExpressionBrand`](ObjectLiteralExpressionBase.md#_lefthandsideexpressionbrand)

***

### \_memberExpressionBrand

> **\_memberExpressionBrand**: `any`

#### Inherited from

[`ObjectLiteralExpressionBase`](ObjectLiteralExpressionBase.md).[`_memberExpressionBrand`](ObjectLiteralExpressionBase.md#_memberexpressionbrand)

***

### \_primaryExpressionBrand

> **\_primaryExpressionBrand**: `any`

#### Inherited from

[`ObjectLiteralExpressionBase`](ObjectLiteralExpressionBase.md).[`_primaryExpressionBrand`](ObjectLiteralExpressionBase.md#_primaryexpressionbrand)

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`ObjectLiteralExpressionBase`](ObjectLiteralExpressionBase.md).[`_unaryExpressionBrand`](ObjectLiteralExpressionBase.md#_unaryexpressionbrand)

***

### \_updateExpressionBrand

> **\_updateExpressionBrand**: `any`

#### Inherited from

[`ObjectLiteralExpressionBase`](ObjectLiteralExpressionBase.md).[`_updateExpressionBrand`](ObjectLiteralExpressionBase.md#_updateexpressionbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`end`](JSDocContainer.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`flags`](JSDocContainer.md#flags)

***

### kind

> `readonly` **kind**: [`ObjectLiteralExpression`](../enumerations/SyntaxKind.md#objectliteralexpression)

#### Overrides

[`JSDocContainer`](JSDocContainer.md).[`kind`](JSDocContainer.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`parent`](JSDocContainer.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`pos`](JSDocContainer.md#pos)

***

### properties

> `readonly` **properties**: [`NodeArray`](NodeArray.md)\<[`ObjectLiteralElementLike`](../type-aliases/ObjectLiteralElementLike.md)\>

#### Inherited from

[`ObjectLiteralExpressionBase`](ObjectLiteralExpressionBase.md).[`properties`](ObjectLiteralExpressionBase.md#properties)

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

[`JSDocContainer`](JSDocContainer.md).[`forEachChild`](JSDocContainer.md#foreachchild)

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

[`JSDocContainer`](JSDocContainer.md).[`getChildAt`](JSDocContainer.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getChildCount`](JSDocContainer.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getChildren`](JSDocContainer.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getEnd`](JSDocContainer.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getFirstToken`](JSDocContainer.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getFullStart`](JSDocContainer.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getFullText`](JSDocContainer.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getFullWidth`](JSDocContainer.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getLastToken`](JSDocContainer.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getLeadingTriviaWidth`](JSDocContainer.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getSourceFile`](JSDocContainer.md#getsourcefile)

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

[`JSDocContainer`](JSDocContainer.md).[`getStart`](JSDocContainer.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getText`](JSDocContainer.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getWidth`](JSDocContainer.md#getwidth)
