[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / PrefixUnaryExpression

# Interface: PrefixUnaryExpression

## Extends

- [`UpdateExpression`](UpdateExpression.md)

## Extended by

- [`JsonMinusNumericLiteral`](JsonMinusNumericLiteral.md)

## Properties

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`_expressionBrand`](UpdateExpression.md#_expressionbrand)

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`_unaryExpressionBrand`](UpdateExpression.md#_unaryexpressionbrand)

***

### \_updateExpressionBrand

> **\_updateExpressionBrand**: `any`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`_updateExpressionBrand`](UpdateExpression.md#_updateexpressionbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`end`](UpdateExpression.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`flags`](UpdateExpression.md#flags)

***

### kind

> `readonly` **kind**: [`PrefixUnaryExpression`](../enumerations/SyntaxKind.md#prefixunaryexpression)

#### Overrides

[`UpdateExpression`](UpdateExpression.md).[`kind`](UpdateExpression.md#kind)

***

### operand

> `readonly` **operand**: [`UnaryExpression`](UnaryExpression.md)

***

### operator

> `readonly` **operator**: [`PrefixUnaryOperator`](../type-aliases/PrefixUnaryOperator.md)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`parent`](UpdateExpression.md#parent-1)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`pos`](UpdateExpression.md#pos)

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

[`UpdateExpression`](UpdateExpression.md).[`forEachChild`](UpdateExpression.md#foreachchild)

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

[`UpdateExpression`](UpdateExpression.md).[`getChildAt`](UpdateExpression.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getChildCount`](UpdateExpression.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getChildren`](UpdateExpression.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getEnd`](UpdateExpression.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getFirstToken`](UpdateExpression.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getFullStart`](UpdateExpression.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getFullText`](UpdateExpression.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getFullWidth`](UpdateExpression.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getLastToken`](UpdateExpression.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getLeadingTriviaWidth`](UpdateExpression.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getSourceFile`](UpdateExpression.md#getsourcefile)

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

[`UpdateExpression`](UpdateExpression.md).[`getStart`](UpdateExpression.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getText`](UpdateExpression.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`UpdateExpression`](UpdateExpression.md).[`getWidth`](UpdateExpression.md#getwidth)
