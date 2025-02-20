[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / DeleteExpression

# Interface: DeleteExpression

## Extends

- [`UnaryExpression`](UnaryExpression.md)

## Properties

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`_expressionBrand`](UnaryExpression.md#_expressionbrand)

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`_unaryExpressionBrand`](UnaryExpression.md#_unaryexpressionbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`end`](UnaryExpression.md#end)

***

### expression

> `readonly` **expression**: [`UnaryExpression`](UnaryExpression.md)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`flags`](UnaryExpression.md#flags)

***

### kind

> `readonly` **kind**: [`DeleteExpression`](../enumerations/SyntaxKind.md#deleteexpression)

#### Overrides

[`UnaryExpression`](UnaryExpression.md).[`kind`](UnaryExpression.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`parent`](UnaryExpression.md#parent-1)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`pos`](UnaryExpression.md#pos)

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

[`UnaryExpression`](UnaryExpression.md).[`forEachChild`](UnaryExpression.md#foreachchild)

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

[`UnaryExpression`](UnaryExpression.md).[`getChildAt`](UnaryExpression.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getChildCount`](UnaryExpression.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getChildren`](UnaryExpression.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getEnd`](UnaryExpression.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getFirstToken`](UnaryExpression.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getFullStart`](UnaryExpression.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getFullText`](UnaryExpression.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getFullWidth`](UnaryExpression.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getLastToken`](UnaryExpression.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getLeadingTriviaWidth`](UnaryExpression.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getSourceFile`](UnaryExpression.md#getsourcefile)

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

[`UnaryExpression`](UnaryExpression.md).[`getStart`](UnaryExpression.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getText`](UnaryExpression.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`UnaryExpression`](UnaryExpression.md).[`getWidth`](UnaryExpression.md#getwidth)
