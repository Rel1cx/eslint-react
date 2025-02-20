[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / NamedTupleMember

# Interface: NamedTupleMember

## Extends

- [`TypeNode`](TypeNode.md).[`Declaration`](Declaration.md).[`JSDocContainer`](JSDocContainer.md)

## Properties

### \_declarationBrand

> **\_declarationBrand**: `any`

#### Inherited from

[`Declaration`](Declaration.md).[`_declarationBrand`](Declaration.md#_declarationbrand)

***

### \_jsdocContainerBrand

> **\_jsdocContainerBrand**: `any`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`_jsdocContainerBrand`](JSDocContainer.md#_jsdoccontainerbrand)

***

### \_typeNodeBrand

> **\_typeNodeBrand**: `any`

#### Inherited from

[`TypeNode`](TypeNode.md).[`_typeNodeBrand`](TypeNode.md#_typenodebrand)

***

### dotDotDotToken?

> `readonly` `optional` **dotDotDotToken**: [`Token`](Token.md)\<[`DotDotDotToken`](../enumerations/SyntaxKind.md#dotdotdottoken)\>

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`end`](JSDocContainer.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`flags`](JSDocContainer.md#flags)

***

### kind

> `readonly` **kind**: [`NamedTupleMember`](../enumerations/SyntaxKind.md#namedtuplemember)

#### Overrides

[`JSDocContainer`](JSDocContainer.md).[`kind`](JSDocContainer.md#kind)

***

### name

> `readonly` **name**: [`Identifier`](Identifier.md)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`parent`](JSDocContainer.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`pos`](JSDocContainer.md#pos)

***

### questionToken?

> `readonly` `optional` **questionToken**: [`Token`](Token.md)\<[`QuestionToken`](../enumerations/SyntaxKind.md#questiontoken)\>

***

### type

> `readonly` **type**: [`TypeNode`](TypeNode.md)

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

[`JSDocContainer`](JSDocContainer.md).[`forEachChild`](JSDocContainer.md#foreachchild)

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

[`JSDocContainer`](JSDocContainer.md).[`getChildAt`](JSDocContainer.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getChildCount`](JSDocContainer.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getChildren`](JSDocContainer.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getEnd`](JSDocContainer.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getFirstToken`](JSDocContainer.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getFullStart`](JSDocContainer.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getFullText`](JSDocContainer.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getFullWidth`](JSDocContainer.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getLastToken`](JSDocContainer.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getLeadingTriviaWidth`](JSDocContainer.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getSourceFile`](JSDocContainer.md#getsourcefile)

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

[`JSDocContainer`](JSDocContainer.md).[`getStart`](JSDocContainer.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getText`](JSDocContainer.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`JSDocContainer`](JSDocContainer.md).[`getWidth`](JSDocContainer.md#getwidth)
