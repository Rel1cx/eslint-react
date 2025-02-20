[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / InstanceofExpression

# Interface: InstanceofExpression

## Extends

- [`BinaryExpression`](BinaryExpression.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`_declarationBrand`](BinaryExpression.md#_declarationbrand)

***

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`_expressionBrand`](BinaryExpression.md#_expressionbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`_jsdocContainerBrand`](BinaryExpression.md#_jsdoccontainerbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`end`](BinaryExpression.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`flags`](BinaryExpression.md#flags)

***

### kind

> `readonly` **kind**: [`BinaryExpression`](../enumerations/SyntaxKind.md#binaryexpression)

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`kind`](BinaryExpression.md#kind)

***

### left

> `readonly` **left**: [`Expression`](Expression.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`left`](BinaryExpression.md#left-1)

***

### operatorToken

> `readonly` **operatorToken**: [`Token`](Token.md)\<[`InstanceOfKeyword`](../enumerations/SyntaxKind.md#instanceofkeyword)\>

#### Overrides

[`BinaryExpression`](BinaryExpression.md).[`operatorToken`](BinaryExpression.md#operatortoken)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`parent`](BinaryExpression.md#parent-1)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`pos`](BinaryExpression.md#pos)

***

### right

> `readonly` **right**: [`Expression`](Expression.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`right`](BinaryExpression.md#right-1)

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

[`BinaryExpression`](BinaryExpression.md).[`forEachChild`](BinaryExpression.md#foreachchild)

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

[`BinaryExpression`](BinaryExpression.md).[`getChildAt`](BinaryExpression.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getChildCount`](BinaryExpression.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getChildren`](BinaryExpression.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getEnd`](BinaryExpression.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getFirstToken`](BinaryExpression.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getFullStart`](BinaryExpression.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getFullText`](BinaryExpression.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getFullWidth`](BinaryExpression.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getLastToken`](BinaryExpression.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getLeadingTriviaWidth`](BinaryExpression.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getSourceFile`](BinaryExpression.md#getsourcefile)

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

[`BinaryExpression`](BinaryExpression.md).[`getStart`](BinaryExpression.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getText`](BinaryExpression.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression.md).[`getWidth`](BinaryExpression.md#getwidth)
