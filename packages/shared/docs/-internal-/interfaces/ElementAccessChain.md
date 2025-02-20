[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ElementAccessChain

# Interface: ElementAccessChain

## Extends

- [`ElementAccessExpression`](ElementAccessExpression.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`_declarationBrand`](ElementAccessExpression.md#_declarationbrand)

***

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`_expressionBrand`](ElementAccessExpression.md#_expressionbrand)

***

### \_flowContainerBrand

> **\_flowContainerBrand**: `any`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`_flowContainerBrand`](ElementAccessExpression.md#_flowcontainerbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`_jsdocContainerBrand`](ElementAccessExpression.md#_jsdoccontainerbrand)

***

### \_leftHandSideExpressionBrand

> **\_leftHandSideExpressionBrand**: `any`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`_leftHandSideExpressionBrand`](ElementAccessExpression.md#_lefthandsideexpressionbrand)

***

### \_memberExpressionBrand

> **\_memberExpressionBrand**: `any`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`_memberExpressionBrand`](ElementAccessExpression.md#_memberexpressionbrand)

***

### \_optionalChainBrand

> **\_optionalChainBrand**: `any`

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`_unaryExpressionBrand`](ElementAccessExpression.md#_unaryexpressionbrand)

***

### \_updateExpressionBrand

> **\_updateExpressionBrand**: `any`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`_updateExpressionBrand`](ElementAccessExpression.md#_updateexpressionbrand)

***

### argumentExpression

> `readonly` **argumentExpression**: [`Expression`](Expression.md)

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`argumentExpression`](ElementAccessExpression.md#argumentexpression)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`end`](ElementAccessExpression.md#end)

***

### expression

> `readonly` **expression**: [`LeftHandSideExpression`](LeftHandSideExpression.md)

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`expression`](ElementAccessExpression.md#expression)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`flags`](ElementAccessExpression.md#flags)

***

### kind

> `readonly` **kind**: [`ElementAccessExpression`](../enumerations/SyntaxKind.md#elementaccessexpression)

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`kind`](ElementAccessExpression.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`parent`](ElementAccessExpression.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`pos`](ElementAccessExpression.md#pos)

***

### questionDotToken?

> `readonly` `optional` **questionDotToken**: [`QuestionDotToken`](../type-aliases/QuestionDotToken.md)

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`questionDotToken`](ElementAccessExpression.md#questiondottoken)

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

[`ElementAccessExpression`](ElementAccessExpression.md).[`forEachChild`](ElementAccessExpression.md#foreachchild)

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

[`ElementAccessExpression`](ElementAccessExpression.md).[`getChildAt`](ElementAccessExpression.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getChildCount`](ElementAccessExpression.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getChildren`](ElementAccessExpression.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getEnd`](ElementAccessExpression.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getFirstToken`](ElementAccessExpression.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getFullStart`](ElementAccessExpression.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getFullText`](ElementAccessExpression.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getFullWidth`](ElementAccessExpression.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getLastToken`](ElementAccessExpression.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getLeadingTriviaWidth`](ElementAccessExpression.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getSourceFile`](ElementAccessExpression.md#getsourcefile)

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

[`ElementAccessExpression`](ElementAccessExpression.md).[`getStart`](ElementAccessExpression.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getText`](ElementAccessExpression.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`ElementAccessExpression`](ElementAccessExpression.md).[`getWidth`](ElementAccessExpression.md#getwidth)
