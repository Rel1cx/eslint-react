[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ImportTypeNode

# Interface: ImportTypeNode

## Extends

- [`NodeWithTypeArguments`](NodeWithTypeArguments.md)

## Properties

### \_typeNodeBrand

> **\_typeNodeBrand**: `any`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`_typeNodeBrand`](NodeWithTypeArguments.md#_typenodebrand)

***

### argument

> `readonly` **argument**: [`TypeNode`](TypeNode.md)

***

### ~~assertions?~~

> `readonly` `optional` **assertions**: [`ImportTypeAssertionContainer`](ImportTypeAssertionContainer.md)

#### Deprecated

***

### attributes?

> `readonly` `optional` **attributes**: `ImportAttributes`

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`end`](NodeWithTypeArguments.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`flags`](NodeWithTypeArguments.md#flags)

***

### isTypeOf

> `readonly` **isTypeOf**: `boolean`

***

### kind

> `readonly` **kind**: [`ImportType`](../enumerations/SyntaxKind.md#importtype)

#### Overrides

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`kind`](NodeWithTypeArguments.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`parent`](NodeWithTypeArguments.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`pos`](NodeWithTypeArguments.md#pos)

***

### qualifier?

> `readonly` `optional` **qualifier**: [`EntityName`](../type-aliases/EntityName.md)

***

### typeArguments?

> `readonly` `optional` **typeArguments**: [`NodeArray`](NodeArray.md)\<[`TypeNode`](TypeNode.md)\>

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`typeArguments`](NodeWithTypeArguments.md#typearguments)

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

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`forEachChild`](NodeWithTypeArguments.md#foreachchild)

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

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getChildAt`](NodeWithTypeArguments.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getChildCount`](NodeWithTypeArguments.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getChildren`](NodeWithTypeArguments.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getEnd`](NodeWithTypeArguments.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getFirstToken`](NodeWithTypeArguments.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getFullStart`](NodeWithTypeArguments.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getFullText`](NodeWithTypeArguments.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getFullWidth`](NodeWithTypeArguments.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getLastToken`](NodeWithTypeArguments.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getLeadingTriviaWidth`](NodeWithTypeArguments.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getSourceFile`](NodeWithTypeArguments.md#getsourcefile)

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

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getStart`](NodeWithTypeArguments.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getText`](NodeWithTypeArguments.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`NodeWithTypeArguments`](NodeWithTypeArguments.md).[`getWidth`](NodeWithTypeArguments.md#getwidth)
