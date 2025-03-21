[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / CallChain

# Interface: CallChain

## Extends

- [`CallExpression`](CallExpression-1.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`_declarationBrand`](CallExpression-1.md#_declarationbrand)

***

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`_expressionBrand`](CallExpression-1.md#_expressionbrand)

***

### \_leftHandSideExpressionBrand

> **\_leftHandSideExpressionBrand**: `any`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`_leftHandSideExpressionBrand`](CallExpression-1.md#_lefthandsideexpressionbrand)

***

### \_optionalChainBrand

> **\_optionalChainBrand**: `any`

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`_unaryExpressionBrand`](CallExpression-1.md#_unaryexpressionbrand)

***

### \_updateExpressionBrand

> **\_updateExpressionBrand**: `any`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`_updateExpressionBrand`](CallExpression-1.md#_updateexpressionbrand)

***

### arguments

> `readonly` **arguments**: [`NodeArray`](NodeArray.md)\<[`Expression`](Expression.md)\>

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`arguments`](CallExpression-1.md#arguments)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`end`](CallExpression-1.md#end)

***

### expression

> `readonly` **expression**: [`LeftHandSideExpression`](LeftHandSideExpression.md)

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`expression`](CallExpression-1.md#expression)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`flags`](CallExpression-1.md#flags)

***

### kind

> `readonly` **kind**: [`CallExpression`](../enumerations/SyntaxKind.md#callexpression)

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`kind`](CallExpression-1.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`parent`](CallExpression-1.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`pos`](CallExpression-1.md#pos)

***

### questionDotToken?

> `readonly` `optional` **questionDotToken**: [`QuestionDotToken`](../type-aliases/QuestionDotToken.md)

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`questionDotToken`](CallExpression-1.md#questiondottoken)

***

### typeArguments?

> `readonly` `optional` **typeArguments**: [`NodeArray`](NodeArray.md)\<[`TypeNode`](TypeNode.md)\>

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`typeArguments`](CallExpression-1.md#typearguments)

## Methods

### forEachChild()

> **forEachChild**\<`T`\>(`cbNode`, `cbNodeArray`?): `undefined` \| `T`

#### Type Parameters

##### T

`T`

#### Parameters

##### cbNode

(`node`) => `undefined` \| `T`

##### cbNodeArray?

(`nodes`) => `undefined` \| `T`

#### Returns

`undefined` \| `T`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`forEachChild`](CallExpression-1.md#foreachchild)

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

[`CallExpression`](CallExpression-1.md).[`getChildAt`](CallExpression-1.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getChildCount`](CallExpression-1.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getChildren`](CallExpression-1.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getEnd`](CallExpression-1.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getFirstToken`](CallExpression-1.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getFullStart`](CallExpression-1.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getFullText`](CallExpression-1.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getFullWidth`](CallExpression-1.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getLastToken`](CallExpression-1.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getLeadingTriviaWidth`](CallExpression-1.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getSourceFile`](CallExpression-1.md#getsourcefile)

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

[`CallExpression`](CallExpression-1.md).[`getStart`](CallExpression-1.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getText`](CallExpression-1.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`CallExpression`](CallExpression-1.md).[`getWidth`](CallExpression-1.md#getwidth)
