[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / JsonMinusNumericLiteral

# Interface: JsonMinusNumericLiteral

## Extends

- [`PrefixUnaryExpression`](PrefixUnaryExpression.md)

## Properties

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`_expressionBrand`](PrefixUnaryExpression.md#_expressionbrand)

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`_unaryExpressionBrand`](PrefixUnaryExpression.md#_unaryexpressionbrand)

***

### \_updateExpressionBrand

> **\_updateExpressionBrand**: `any`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`_updateExpressionBrand`](PrefixUnaryExpression.md#_updateexpressionbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`end`](PrefixUnaryExpression.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`flags`](PrefixUnaryExpression.md#flags)

***

### kind

> `readonly` **kind**: [`PrefixUnaryExpression`](../enumerations/SyntaxKind.md#prefixunaryexpression)

#### Overrides

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`kind`](PrefixUnaryExpression.md#kind)

***

### operand

> `readonly` **operand**: [`NumericLiteral`](NumericLiteral.md)

#### Overrides

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`operand`](PrefixUnaryExpression.md#operand)

***

### operator

> `readonly` **operator**: [`MinusToken`](../enumerations/SyntaxKind.md#minustoken)

#### Overrides

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`operator`](PrefixUnaryExpression.md#operator)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`parent`](PrefixUnaryExpression.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`pos`](PrefixUnaryExpression.md#pos)

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

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`forEachChild`](PrefixUnaryExpression.md#foreachchild)

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

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getChildAt`](PrefixUnaryExpression.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getChildCount`](PrefixUnaryExpression.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getChildren`](PrefixUnaryExpression.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getEnd`](PrefixUnaryExpression.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getFirstToken`](PrefixUnaryExpression.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getFullStart`](PrefixUnaryExpression.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getFullText`](PrefixUnaryExpression.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getFullWidth`](PrefixUnaryExpression.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getLastToken`](PrefixUnaryExpression.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getLeadingTriviaWidth`](PrefixUnaryExpression.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getSourceFile`](PrefixUnaryExpression.md#getsourcefile)

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

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getStart`](PrefixUnaryExpression.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getText`](PrefixUnaryExpression.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`PrefixUnaryExpression`](PrefixUnaryExpression.md).[`getWidth`](PrefixUnaryExpression.md#getwidth)
