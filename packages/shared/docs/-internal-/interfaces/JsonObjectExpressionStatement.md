[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JsonObjectExpressionStatement

# Interface: JsonObjectExpressionStatement

## Extends

- [`ExpressionStatement`](ExpressionStatement-1.md)

## Properties

### \_flowContainerBrand

> **\_flowContainerBrand**: `any`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`_flowContainerBrand`](ExpressionStatement-1.md#_flowcontainerbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`_jsdocContainerBrand`](ExpressionStatement-1.md#_jsdoccontainerbrand)

***

### \_statementBrand

> **\_statementBrand**: `any`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`_statementBrand`](ExpressionStatement-1.md#_statementbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`end`](ExpressionStatement-1.md#end)

***

### expression

> `readonly` **expression**: [`JsonObjectExpression`](../type-aliases/JsonObjectExpression.md)

#### Overrides

[`ExpressionStatement`](ExpressionStatement-1.md).[`expression`](ExpressionStatement-1.md#expression)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`flags`](ExpressionStatement-1.md#flags)

***

### kind

> `readonly` **kind**: [`ExpressionStatement`](../enumerations/SyntaxKind.md#expressionstatement)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`kind`](ExpressionStatement-1.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`parent`](ExpressionStatement-1.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`pos`](ExpressionStatement-1.md#pos)

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

[`ExpressionStatement`](ExpressionStatement-1.md).[`forEachChild`](ExpressionStatement-1.md#foreachchild)

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

[`ExpressionStatement`](ExpressionStatement-1.md).[`getChildAt`](ExpressionStatement-1.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getChildCount`](ExpressionStatement-1.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getChildren`](ExpressionStatement-1.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getEnd`](ExpressionStatement-1.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getFirstToken`](ExpressionStatement-1.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getFullStart`](ExpressionStatement-1.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getFullText`](ExpressionStatement-1.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getFullWidth`](ExpressionStatement-1.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getLastToken`](ExpressionStatement-1.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getLeadingTriviaWidth`](ExpressionStatement-1.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getSourceFile`](ExpressionStatement-1.md#getsourcefile)

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

[`ExpressionStatement`](ExpressionStatement-1.md).[`getStart`](ExpressionStatement-1.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getText`](ExpressionStatement-1.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`ExpressionStatement`](ExpressionStatement-1.md).[`getWidth`](ExpressionStatement-1.md#getwidth)
