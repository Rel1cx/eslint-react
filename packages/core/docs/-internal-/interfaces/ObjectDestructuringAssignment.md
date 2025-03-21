[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ObjectDestructuringAssignment

# Interface: ObjectDestructuringAssignment

## Extends

- [`AssignmentExpression`](AssignmentExpression-1.md)\<[`EqualsToken`](../type-aliases/EqualsToken.md)\>

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`_declarationBrand`](AssignmentExpression-1.md#_declarationbrand)

***

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`_expressionBrand`](AssignmentExpression-1.md#_expressionbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`_jsdocContainerBrand`](AssignmentExpression-1.md#_jsdoccontainerbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`end`](AssignmentExpression-1.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`flags`](AssignmentExpression-1.md#flags)

***

### kind

> `readonly` **kind**: [`BinaryExpression`](../enumerations/SyntaxKind.md#binaryexpression)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`kind`](AssignmentExpression-1.md#kind)

***

### left

> `readonly` **left**: [`ObjectLiteralExpression`](ObjectLiteralExpression.md)

#### Overrides

[`AssignmentExpression`](AssignmentExpression-1.md).[`left`](AssignmentExpression-1.md#left)

***

### operatorToken

> `readonly` **operatorToken**: [`EqualsToken`](../type-aliases/EqualsToken.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`operatorToken`](AssignmentExpression-1.md#operatortoken)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`parent`](AssignmentExpression-1.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`pos`](AssignmentExpression-1.md#pos)

***

### right

> `readonly` **right**: [`Expression`](Expression.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`right`](AssignmentExpression-1.md#right)

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

[`AssignmentExpression`](AssignmentExpression-1.md).[`forEachChild`](AssignmentExpression-1.md#foreachchild)

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

[`AssignmentExpression`](AssignmentExpression-1.md).[`getChildAt`](AssignmentExpression-1.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getChildCount`](AssignmentExpression-1.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getChildren`](AssignmentExpression-1.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getEnd`](AssignmentExpression-1.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getFirstToken`](AssignmentExpression-1.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getFullStart`](AssignmentExpression-1.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getFullText`](AssignmentExpression-1.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getFullWidth`](AssignmentExpression-1.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getLastToken`](AssignmentExpression-1.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getLeadingTriviaWidth`](AssignmentExpression-1.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getSourceFile`](AssignmentExpression-1.md#getsourcefile)

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

[`AssignmentExpression`](AssignmentExpression-1.md).[`getStart`](AssignmentExpression-1.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getText`](AssignmentExpression-1.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression-1.md).[`getWidth`](AssignmentExpression-1.md#getwidth)
