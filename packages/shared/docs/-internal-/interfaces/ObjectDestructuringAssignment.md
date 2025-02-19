[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ObjectDestructuringAssignment

# Interface: ObjectDestructuringAssignment

## Extends

- [`AssignmentExpression`](AssignmentExpression.md)\<[`EqualsToken`](../type-aliases/EqualsToken.md)\>

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`_declarationBrand`](AssignmentExpression.md#_declarationbrand)

***

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`_expressionBrand`](AssignmentExpression.md#_expressionbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`_jsdocContainerBrand`](AssignmentExpression.md#_jsdoccontainerbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`end`](AssignmentExpression.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`flags`](AssignmentExpression.md#flags)

***

### kind

> `readonly` **kind**: [`BinaryExpression`](../enumerations/SyntaxKind.md#binaryexpression)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`kind`](AssignmentExpression.md#kind)

***

### left

> `readonly` **left**: [`ObjectLiteralExpression`](ObjectLiteralExpression.md)

#### Overrides

[`AssignmentExpression`](AssignmentExpression.md).[`left`](AssignmentExpression.md#left-1)

***

### operatorToken

> `readonly` **operatorToken**: [`EqualsToken`](../type-aliases/EqualsToken.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`operatorToken`](AssignmentExpression.md#operatortoken)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`parent`](AssignmentExpression.md#parent-1)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`pos`](AssignmentExpression.md#pos)

***

### right

> `readonly` **right**: [`Expression`](Expression.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`right`](AssignmentExpression.md#right-1)

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

[`AssignmentExpression`](AssignmentExpression.md).[`forEachChild`](AssignmentExpression.md#foreachchild)

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

[`AssignmentExpression`](AssignmentExpression.md).[`getChildAt`](AssignmentExpression.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getChildCount`](AssignmentExpression.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getChildren`](AssignmentExpression.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getEnd`](AssignmentExpression.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getFirstToken`](AssignmentExpression.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getFullStart`](AssignmentExpression.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getFullText`](AssignmentExpression.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getFullWidth`](AssignmentExpression.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getLastToken`](AssignmentExpression.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getLeadingTriviaWidth`](AssignmentExpression.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getSourceFile`](AssignmentExpression.md#getsourcefile)

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

[`AssignmentExpression`](AssignmentExpression.md).[`getStart`](AssignmentExpression.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getText`](AssignmentExpression.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`AssignmentExpression`](AssignmentExpression.md).[`getWidth`](AssignmentExpression.md#getwidth)
