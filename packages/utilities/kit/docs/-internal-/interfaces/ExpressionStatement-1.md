[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / ExpressionStatement

# Interface: ExpressionStatement

## Extends

- [`Statement`](Statement.md).[`FlowContainer`](FlowContainer.md)

## Extended by

- [`JsonObjectExpressionStatement`](JsonObjectExpressionStatement.md)

## Properties

### \_flowContainerBrand

> **\_flowContainerBrand**: `any`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`_flowContainerBrand`](FlowContainer.md#_flowcontainerbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`Statement`](Statement.md).[`_jsdocContainerBrand`](Statement.md#_jsdoccontainerbrand)

***

### \_statementBrand

> **\_statementBrand**: `any`

#### Inherited from

[`Statement`](Statement.md).[`_statementBrand`](Statement.md#_statementbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`end`](FlowContainer.md#end)

***

### expression

> `readonly` **expression**: [`Expression`](Expression.md)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`flags`](FlowContainer.md#flags)

***

### kind

> `readonly` **kind**: [`ExpressionStatement`](../README.md#expressionstatement-1)

#### Overrides

[`FlowContainer`](FlowContainer.md).[`kind`](FlowContainer.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`parent`](FlowContainer.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`pos`](FlowContainer.md#pos)

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

[`FlowContainer`](FlowContainer.md).[`forEachChild`](FlowContainer.md#foreachchild)

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

[`FlowContainer`](FlowContainer.md).[`getChildAt`](FlowContainer.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getChildCount`](FlowContainer.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getChildren`](FlowContainer.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getEnd`](FlowContainer.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getFirstToken`](FlowContainer.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getFullStart`](FlowContainer.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getFullText`](FlowContainer.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getFullWidth`](FlowContainer.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getLastToken`](FlowContainer.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getLeadingTriviaWidth`](FlowContainer.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getSourceFile`](FlowContainer.md#getsourcefile)

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

[`FlowContainer`](FlowContainer.md).[`getStart`](FlowContainer.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getText`](FlowContainer.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`FlowContainer`](FlowContainer.md).[`getWidth`](FlowContainer.md#getwidth)
