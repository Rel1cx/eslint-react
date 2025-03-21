[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / InstanceofExpression

# Interface: InstanceofExpression

## Extends

- [`BinaryExpression`](BinaryExpression-1.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`_declarationBrand`](BinaryExpression-1.md#_declarationbrand)

***

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`_expressionBrand`](BinaryExpression-1.md#_expressionbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`_jsdocContainerBrand`](BinaryExpression-1.md#_jsdoccontainerbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`end`](BinaryExpression-1.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`flags`](BinaryExpression-1.md#flags)

***

### kind

> `readonly` **kind**: [`BinaryExpression`](../enumerations/SyntaxKind.md#binaryexpression)

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`kind`](BinaryExpression-1.md#kind)

***

### left

> `readonly` **left**: [`Expression`](Expression.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`left`](BinaryExpression-1.md#left)

***

### operatorToken

> `readonly` **operatorToken**: [`Token`](Token.md)\<[`InstanceOfKeyword`](../enumerations/SyntaxKind.md#instanceofkeyword)\>

#### Overrides

[`BinaryExpression`](BinaryExpression-1.md).[`operatorToken`](BinaryExpression-1.md#operatortoken)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`parent`](BinaryExpression-1.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`pos`](BinaryExpression-1.md#pos)

***

### right

> `readonly` **right**: [`Expression`](Expression.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`right`](BinaryExpression-1.md#right)

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

[`BinaryExpression`](BinaryExpression-1.md).[`forEachChild`](BinaryExpression-1.md#foreachchild)

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

[`BinaryExpression`](BinaryExpression-1.md).[`getChildAt`](BinaryExpression-1.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getChildCount`](BinaryExpression-1.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getChildren`](BinaryExpression-1.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getEnd`](BinaryExpression-1.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getFirstToken`](BinaryExpression-1.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getFullStart`](BinaryExpression-1.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getFullText`](BinaryExpression-1.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getFullWidth`](BinaryExpression-1.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getLastToken`](BinaryExpression-1.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getLeadingTriviaWidth`](BinaryExpression-1.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getSourceFile`](BinaryExpression-1.md#getsourcefile)

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

[`BinaryExpression`](BinaryExpression-1.md).[`getStart`](BinaryExpression-1.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getText`](BinaryExpression-1.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`BinaryExpression`](BinaryExpression-1.md).[`getWidth`](BinaryExpression-1.md#getwidth)
