[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / JsonObjectExpressionStatement

# Interface: JsonObjectExpressionStatement

## Extends

- [`ExpressionStatement`](ExpressionStatement.md)

## Properties

### \_flowContainerBrand

> **\_flowContainerBrand**: `any`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`_flowContainerBrand`](ExpressionStatement.md#_flowcontainerbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`_jsdocContainerBrand`](ExpressionStatement.md#_jsdoccontainerbrand)

***

### \_statementBrand

> **\_statementBrand**: `any`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`_statementBrand`](ExpressionStatement.md#_statementbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`end`](ExpressionStatement.md#end)

***

### expression

> `readonly` **expression**: [`JsonObjectExpression`](../type-aliases/JsonObjectExpression.md)

#### Overrides

[`ExpressionStatement`](ExpressionStatement.md).[`expression`](ExpressionStatement.md#expression-1)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`flags`](ExpressionStatement.md#flags)

***

### kind

> `readonly` **kind**: [`ExpressionStatement`](../enumerations/SyntaxKind.md#expressionstatement)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`kind`](ExpressionStatement.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`parent`](ExpressionStatement.md#parent-1)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`pos`](ExpressionStatement.md#pos)

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

[`ExpressionStatement`](ExpressionStatement.md).[`forEachChild`](ExpressionStatement.md#foreachchild)

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

[`ExpressionStatement`](ExpressionStatement.md).[`getChildAt`](ExpressionStatement.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getChildCount`](ExpressionStatement.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getChildren`](ExpressionStatement.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getEnd`](ExpressionStatement.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getFirstToken`](ExpressionStatement.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getFullStart`](ExpressionStatement.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getFullText`](ExpressionStatement.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getFullWidth`](ExpressionStatement.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getLastToken`](ExpressionStatement.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getLeadingTriviaWidth`](ExpressionStatement.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getSourceFile`](ExpressionStatement.md#getsourcefile)

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

[`ExpressionStatement`](ExpressionStatement.md).[`getStart`](ExpressionStatement.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getText`](ExpressionStatement.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement.md).[`getWidth`](ExpressionStatement.md#getwidth)
