[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / Node

# Interface: Node

## Extends

- [`ReadonlyTextRange`](ReadonlyTextRange.md)

## Extended by

- [`Declaration`](Declaration.md)
- [`LocalsContainer`](LocalsContainer.md)
- [`Statement`](Statement.md)
- [`Token`](Token.md)
- [`Bundle`](Bundle.md)
- [`TypeNode`](TypeNode.md)
- [`Expression`](Expression.md)
- [`QualifiedName`](QualifiedName.md)
- [`ArrayBindingPattern`](ArrayBindingPattern.md)
- [`CaseBlock`](CaseBlock.md)
- [`CaseClause`](CaseClause.md)
- [`CatchClause`](CatchClause.md)
- [`ComputedPropertyName`](ComputedPropertyName.md)
- [`Decorator`](Decorator.md)
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
- [`JSDocContainer`](JSDocContainer.md)
- [`FlowContainer`](FlowContainer.md)
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

> `readonly` **parent**: [`Node`](Node.md)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`ReadonlyTextRange`](ReadonlyTextRange.md).[`pos`](ReadonlyTextRange.md#pos)

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

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

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

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

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
