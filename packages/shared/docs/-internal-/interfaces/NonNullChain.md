[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / NonNullChain

# Interface: NonNullChain

## Extends

- [`NonNullExpression`](NonNullExpression.md)

## Properties

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`_expressionBrand`](NonNullExpression.md#_expressionbrand)

***

### \_leftHandSideExpressionBrand

> **\_leftHandSideExpressionBrand**: `any`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`_leftHandSideExpressionBrand`](NonNullExpression.md#_lefthandsideexpressionbrand)

***

### \_optionalChainBrand

> **\_optionalChainBrand**: `any`

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`_unaryExpressionBrand`](NonNullExpression.md#_unaryexpressionbrand)

***

### \_updateExpressionBrand

> **\_updateExpressionBrand**: `any`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`_updateExpressionBrand`](NonNullExpression.md#_updateexpressionbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`end`](NonNullExpression.md#end)

***

### expression

> `readonly` **expression**: [`Expression`](Expression.md)

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`expression`](NonNullExpression.md#expression)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`flags`](NonNullExpression.md#flags)

***

### kind

> `readonly` **kind**: [`NonNullExpression`](../enumerations/SyntaxKind.md#nonnullexpression)

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`kind`](NonNullExpression.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`parent`](NonNullExpression.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`pos`](NonNullExpression.md#pos)

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

[`NonNullExpression`](NonNullExpression.md).[`forEachChild`](NonNullExpression.md#foreachchild)

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

[`NonNullExpression`](NonNullExpression.md).[`getChildAt`](NonNullExpression.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getChildCount`](NonNullExpression.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getChildren`](NonNullExpression.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getEnd`](NonNullExpression.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getFirstToken`](NonNullExpression.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getFullStart`](NonNullExpression.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getFullText`](NonNullExpression.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getFullWidth`](NonNullExpression.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getLastToken`](NonNullExpression.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getLeadingTriviaWidth`](NonNullExpression.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getSourceFile`](NonNullExpression.md#getsourcefile)

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

[`NonNullExpression`](NonNullExpression.md).[`getStart`](NonNullExpression.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getText`](NonNullExpression.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`NonNullExpression`](NonNullExpression.md).[`getWidth`](NonNullExpression.md#getwidth)
