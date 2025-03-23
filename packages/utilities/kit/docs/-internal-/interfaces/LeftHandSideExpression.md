[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / LeftHandSideExpression

# Interface: LeftHandSideExpression

## Extends

- [`UpdateExpression`](UpdateExpression-1.md)

## Extended by

- [`CallExpression`](CallExpression-1.md)
- [`NonNullExpression`](NonNullExpression.md)
- [`PartiallyEmittedExpression`](PartiallyEmittedExpression.md)
- [`MemberExpression`](MemberExpression.md)

## Properties

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`_expressionBrand`](UpdateExpression-1.md#_expressionbrand)

***

### \_leftHandSideExpressionBrand

> **\_leftHandSideExpressionBrand**: `any`

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`_unaryExpressionBrand`](UpdateExpression-1.md#_unaryexpressionbrand)

***

### \_updateExpressionBrand

> **\_updateExpressionBrand**: `any`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`_updateExpressionBrand`](UpdateExpression-1.md#_updateexpressionbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`end`](UpdateExpression-1.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`flags`](UpdateExpression-1.md#flags)

***

### kind

> `readonly` **kind**: [`SyntaxKind`](../enumerations/SyntaxKind.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`kind`](UpdateExpression-1.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`parent`](UpdateExpression-1.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`pos`](UpdateExpression-1.md#pos)

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

[`UpdateExpression`](UpdateExpression-1.md).[`forEachChild`](UpdateExpression-1.md#foreachchild)

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

[`UpdateExpression`](UpdateExpression-1.md).[`getChildAt`](UpdateExpression-1.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getChildCount`](UpdateExpression-1.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getChildren`](UpdateExpression-1.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getEnd`](UpdateExpression-1.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getFirstToken`](UpdateExpression-1.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getFullStart`](UpdateExpression-1.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getFullText`](UpdateExpression-1.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getFullWidth`](UpdateExpression-1.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getLastToken`](UpdateExpression-1.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getLeadingTriviaWidth`](UpdateExpression-1.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getSourceFile`](UpdateExpression-1.md#getsourcefile)

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

[`UpdateExpression`](UpdateExpression-1.md).[`getStart`](UpdateExpression-1.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getText`](UpdateExpression-1.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression-1.md).[`getWidth`](UpdateExpression-1.md#getwidth)
