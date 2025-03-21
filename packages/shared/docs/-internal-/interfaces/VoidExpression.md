[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / VoidExpression

# Interface: VoidExpression

## Extends

- [`UnaryExpression`](UnaryExpression-1.md)

## Properties

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`_expressionBrand`](UnaryExpression-1.md#_expressionbrand)

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`_unaryExpressionBrand`](UnaryExpression-1.md#_unaryexpressionbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`end`](UnaryExpression-1.md#end)

***

### expression

> `readonly` **expression**: [`UnaryExpression`](UnaryExpression-1.md)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`flags`](UnaryExpression-1.md#flags)

***

### kind

> `readonly` **kind**: [`VoidExpression`](../enumerations/SyntaxKind.md#voidexpression)

#### Overrides

[`UnaryExpression`](UnaryExpression-1.md).[`kind`](UnaryExpression-1.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`parent`](UnaryExpression-1.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`pos`](UnaryExpression-1.md#pos)

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

[`UnaryExpression`](UnaryExpression-1.md).[`forEachChild`](UnaryExpression-1.md#foreachchild)

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

[`UnaryExpression`](UnaryExpression-1.md).[`getChildAt`](UnaryExpression-1.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getChildCount`](UnaryExpression-1.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getChildren`](UnaryExpression-1.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getEnd`](UnaryExpression-1.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getFirstToken`](UnaryExpression-1.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getFullStart`](UnaryExpression-1.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getFullText`](UnaryExpression-1.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getFullWidth`](UnaryExpression-1.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getLastToken`](UnaryExpression-1.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getLeadingTriviaWidth`](UnaryExpression-1.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getSourceFile`](UnaryExpression-1.md#getsourcefile)

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

[`UnaryExpression`](UnaryExpression-1.md).[`getStart`](UnaryExpression-1.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getText`](UnaryExpression-1.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression-1.md).[`getWidth`](UnaryExpression-1.md#getwidth)
