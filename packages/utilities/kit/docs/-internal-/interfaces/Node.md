[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / Node

# Interface: Node

## Extends

- [`ReadonlyTextRange`](ReadonlyTextRange.md)

## Extended by

- [`Token`](Token.md)
- [`Declaration`](Declaration.md)
- [`LocalsContainer`](LocalsContainer.md)
- [`Statement`](Statement.md)
- [`Bundle`](Bundle.md)
- [`TypeNode`](TypeNode.md)
- [`Expression`](Expression.md)
- [`QualifiedName`](QualifiedName.md)
- [`ArrayBindingPattern`](ArrayBindingPattern.md)
- [`CaseBlock`](CaseBlock.md)
- [`CaseClause`](CaseClause.md)
- [`CatchClause`](CatchClause.md)
- [`ComputedPropertyName`](ComputedPropertyName.md)
- [`Decorator`](Decorator-1.md)
- [`DefaultClause`](DefaultClause.md)
- [`ExternalModuleReference`](ExternalModuleReference.md)
- [`HeritageClause`](HeritageClause.md)
- [`JSDoc`](JSDoc.md)
- [`JsxClosingElement`](JsxClosingElement.md)
- [`ModuleBlock`](ModuleBlock.md)
- [`NamedExports`](NamedExports.md)
- [`NamedImports`](NamedImports.md)
- [`ObjectBindingPattern`](ObjectBindingPattern.md)
- [`TemplateSpan`](TemplateSpan.md)
- [`VariableDeclarationList`](VariableDeclarationList.md)
- [`FlowContainer`](FlowContainer.md)
- [`JSDocContainer`](JSDocContainer.md)
- [`ImportTypeAssertionContainer`](ImportTypeAssertionContainer.md)
- [`JSDocTag`](JSDocTag.md)
- [`LiteralLikeNode`](LiteralLikeNode.md)
- [`JSDocText`](JSDocText.md)
- [`JSDocLink`](JSDocLink.md)
- [`JSDocLinkCode`](JSDocLinkCode.md)
- [`JSDocLinkPlain`](JSDocLinkPlain.md)
- [`JSDocMemberName`](JSDocMemberName.md)
- [`JSDocNameReference`](JSDocNameReference.md)

## Properties

### end

> `readonly` **end**: `number`

#### Inherited from

[`ReadonlyTextRange`](ReadonlyTextRange.md).[`end`](ReadonlyTextRange.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

***

### kind

> `readonly` **kind**: [`SyntaxKind`](../enumerations/SyntaxKind.md)

***

### parent

> `readonly` **parent**: `Node`

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`ReadonlyTextRange`](ReadonlyTextRange.md).[`pos`](ReadonlyTextRange.md#pos)

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

***

### getChildAt()

> **getChildAt**(`index`, `sourceFile`?): `Node`

#### Parameters

##### index

`number`

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`Node`

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly `Node`[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly `Node`[]

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| `Node`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| `Node`

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| `Node`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| `Node`

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

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

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`
