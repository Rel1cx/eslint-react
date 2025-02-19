[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / PropertyAccessChain

# Interface: PropertyAccessChain

## Extends

- [`PropertyAccessExpression`](PropertyAccessExpression.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`_declarationBrand`](PropertyAccessExpression.md#_declarationbrand)

***

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`_expressionBrand`](PropertyAccessExpression.md#_expressionbrand)

***

### \_flowContainerBrand

> **\_flowContainerBrand**: `any`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`_flowContainerBrand`](PropertyAccessExpression.md#_flowcontainerbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`_jsdocContainerBrand`](PropertyAccessExpression.md#_jsdoccontainerbrand)

***

### \_leftHandSideExpressionBrand

> **\_leftHandSideExpressionBrand**: `any`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`_leftHandSideExpressionBrand`](PropertyAccessExpression.md#_lefthandsideexpressionbrand)

***

### \_memberExpressionBrand

> **\_memberExpressionBrand**: `any`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`_memberExpressionBrand`](PropertyAccessExpression.md#_memberexpressionbrand)

***

### \_optionalChainBrand

> **\_optionalChainBrand**: `any`

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`_unaryExpressionBrand`](PropertyAccessExpression.md#_unaryexpressionbrand)

***

### \_updateExpressionBrand

> **\_updateExpressionBrand**: `any`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`_updateExpressionBrand`](PropertyAccessExpression.md#_updateexpressionbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`end`](PropertyAccessExpression.md#end)

***

### expression

> `readonly` **expression**: [`LeftHandSideExpression`](LeftHandSideExpression.md)

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`expression`](PropertyAccessExpression.md#expression)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`flags`](PropertyAccessExpression.md#flags)

***

### kind

> `readonly` **kind**: [`PropertyAccessExpression`](../enumerations/SyntaxKind.md#propertyaccessexpression)

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`kind`](PropertyAccessExpression.md#kind)

***

### name

> `readonly` **name**: [`MemberName`](../type-aliases/MemberName.md)

#### Overrides

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`name`](PropertyAccessExpression.md#name)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`parent`](PropertyAccessExpression.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`pos`](PropertyAccessExpression.md#pos)

***

### questionDotToken?

> `readonly` `optional` **questionDotToken**: [`QuestionDotToken`](../type-aliases/QuestionDotToken.md)

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`questionDotToken`](PropertyAccessExpression.md#questiondottoken)

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

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`forEachChild`](PropertyAccessExpression.md#foreachchild)

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

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getChildAt`](PropertyAccessExpression.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getChildCount`](PropertyAccessExpression.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getChildren`](PropertyAccessExpression.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getEnd`](PropertyAccessExpression.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getFirstToken`](PropertyAccessExpression.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getFullStart`](PropertyAccessExpression.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getFullText`](PropertyAccessExpression.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getFullWidth`](PropertyAccessExpression.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getLastToken`](PropertyAccessExpression.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getLeadingTriviaWidth`](PropertyAccessExpression.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getSourceFile`](PropertyAccessExpression.md#getsourcefile)

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

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getStart`](PropertyAccessExpression.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getText`](PropertyAccessExpression.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`PropertyAccessExpression`](PropertyAccessExpression.md).[`getWidth`](PropertyAccessExpression.md#getwidth)
