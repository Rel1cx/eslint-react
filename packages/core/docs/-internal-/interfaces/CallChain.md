[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / CallChain

# Interface: CallChain

## Extends

- [`CallExpression`](CallExpression.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`CallExpression`](CallExpression.md).[`_declarationBrand`](CallExpression.md#_declarationbrand)

***

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`CallExpression`](CallExpression.md).[`_expressionBrand`](CallExpression.md#_expressionbrand)

***

### \_leftHandSideExpressionBrand

> **\_leftHandSideExpressionBrand**: `any`

#### Inherited from

[`CallExpression`](CallExpression.md).[`_leftHandSideExpressionBrand`](CallExpression.md#_lefthandsideexpressionbrand)

***

### \_optionalChainBrand

> **\_optionalChainBrand**: `any`

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`CallExpression`](CallExpression.md).[`_unaryExpressionBrand`](CallExpression.md#_unaryexpressionbrand)

***

### \_updateExpressionBrand

> **\_updateExpressionBrand**: `any`

#### Inherited from

[`CallExpression`](CallExpression.md).[`_updateExpressionBrand`](CallExpression.md#_updateexpressionbrand)

***

### arguments

> `readonly` **arguments**: [`NodeArray`](NodeArray.md)\<[`Expression`](Expression.md)\>

#### Inherited from

[`CallExpression`](CallExpression.md).[`arguments`](CallExpression.md#arguments-1)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`CallExpression`](CallExpression.md).[`end`](CallExpression.md#end)

***

### expression

> `readonly` **expression**: [`LeftHandSideExpression`](LeftHandSideExpression.md)

#### Inherited from

[`CallExpression`](CallExpression.md).[`expression`](CallExpression.md#expression)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`CallExpression`](CallExpression.md).[`flags`](CallExpression.md#flags)

***

### kind

> `readonly` **kind**: [`CallExpression`](../enumerations/SyntaxKind.md#callexpression)

#### Inherited from

[`CallExpression`](CallExpression.md).[`kind`](CallExpression.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`CallExpression`](CallExpression.md).[`parent`](CallExpression.md#parent-1)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`CallExpression`](CallExpression.md).[`pos`](CallExpression.md#pos)

***

### questionDotToken?

> `readonly` `optional` **questionDotToken**: [`QuestionDotToken`](../type-aliases/QuestionDotToken.md)

#### Inherited from

[`CallExpression`](CallExpression.md).[`questionDotToken`](CallExpression.md#questiondottoken)

***

### typeArguments?

> `readonly` `optional` **typeArguments**: [`NodeArray`](NodeArray.md)\<[`TypeNode`](TypeNode.md)\>

#### Inherited from

[`CallExpression`](CallExpression.md).[`typeArguments`](CallExpression.md#typearguments-1)

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

[`CallExpression`](CallExpression.md).[`forEachChild`](CallExpression.md#foreachchild)

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

[`CallExpression`](CallExpression.md).[`getChildAt`](CallExpression.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression.md).[`getChildCount`](CallExpression.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`CallExpression`](CallExpression.md).[`getChildren`](CallExpression.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression.md).[`getEnd`](CallExpression.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`CallExpression`](CallExpression.md).[`getFirstToken`](CallExpression.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression.md).[`getFullStart`](CallExpression.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`CallExpression`](CallExpression.md).[`getFullText`](CallExpression.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression.md).[`getFullWidth`](CallExpression.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`CallExpression`](CallExpression.md).[`getLastToken`](CallExpression.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression.md).[`getLeadingTriviaWidth`](CallExpression.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`CallExpression`](CallExpression.md).[`getSourceFile`](CallExpression.md#getsourcefile)

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

[`CallExpression`](CallExpression.md).[`getStart`](CallExpression.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`CallExpression`](CallExpression.md).[`getText`](CallExpression.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression.md).[`getWidth`](CallExpression.md#getwidth)
