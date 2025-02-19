[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / RegularExpressionLiteral

# Interface: RegularExpressionLiteral

## Extends

- [`LiteralExpression`](LiteralExpression.md)

## Properties

### \_expressionBrand

> **\_expressionBrand**: `any`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`_expressionBrand`](LiteralExpression.md#_expressionbrand)

***

### \_leftHandSideExpressionBrand

> **\_leftHandSideExpressionBrand**: `any`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`_leftHandSideExpressionBrand`](LiteralExpression.md#_lefthandsideexpressionbrand)

***

### \_literalExpressionBrand

> **\_literalExpressionBrand**: `any`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`_literalExpressionBrand`](LiteralExpression.md#_literalexpressionbrand)

***

### \_memberExpressionBrand

> **\_memberExpressionBrand**: `any`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`_memberExpressionBrand`](LiteralExpression.md#_memberexpressionbrand)

***

### \_primaryExpressionBrand

> **\_primaryExpressionBrand**: `any`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`_primaryExpressionBrand`](LiteralExpression.md#_primaryexpressionbrand)

***

### \_unaryExpressionBrand

> **\_unaryExpressionBrand**: `any`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`_unaryExpressionBrand`](LiteralExpression.md#_unaryexpressionbrand)

***

### \_updateExpressionBrand

> **\_updateExpressionBrand**: `any`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`_updateExpressionBrand`](LiteralExpression.md#_updateexpressionbrand)

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`end`](LiteralExpression.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`flags`](LiteralExpression.md#flags)

***

### hasExtendedUnicodeEscape?

> `optional` **hasExtendedUnicodeEscape**: `boolean`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`hasExtendedUnicodeEscape`](LiteralExpression.md#hasextendedunicodeescape)

***

### isUnterminated?

> `optional` **isUnterminated**: `boolean`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`isUnterminated`](LiteralExpression.md#isunterminated)

***

### kind

> `readonly` **kind**: [`RegularExpressionLiteral`](../enumerations/SyntaxKind.md#regularexpressionliteral)

#### Overrides

[`LiteralExpression`](LiteralExpression.md).[`kind`](LiteralExpression.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`parent`](LiteralExpression.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`pos`](LiteralExpression.md#pos)

***

### text

> **text**: `string`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`text`](LiteralExpression.md#text)

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

[`LiteralExpression`](LiteralExpression.md).[`forEachChild`](LiteralExpression.md#foreachchild)

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

[`LiteralExpression`](LiteralExpression.md).[`getChildAt`](LiteralExpression.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getChildCount`](LiteralExpression.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getChildren`](LiteralExpression.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getEnd`](LiteralExpression.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getFirstToken`](LiteralExpression.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getFullStart`](LiteralExpression.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getFullText`](LiteralExpression.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getFullWidth`](LiteralExpression.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getLastToken`](LiteralExpression.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getLeadingTriviaWidth`](LiteralExpression.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getSourceFile`](LiteralExpression.md#getsourcefile)

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

[`LiteralExpression`](LiteralExpression.md).[`getStart`](LiteralExpression.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getText`](LiteralExpression.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`LiteralExpression`](LiteralExpression.md).[`getWidth`](LiteralExpression.md#getwidth)
