[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / FlowContainer

# Interface: FlowContainer

## Extends

- [`Node`](Node.md)

## Extended by

- [`ExpressionStatement`](ExpressionStatement-1.md)
- [`Identifier`](Identifier-1.md)
- [`ElementAccessExpression`](ElementAccessExpression.md)
- [`PropertyAccessExpression`](PropertyAccessExpression.md)
- [`QualifiedName`](QualifiedName.md)
- [`ArrowFunction`](ArrowFunction.md)
- [`BindingElement`](BindingElement.md)
- [`BreakStatement`](BreakStatement-1.md)
- [`ContinueStatement`](ContinueStatement-1.md)
- [`DebuggerStatement`](DebuggerStatement-1.md)
- [`DoStatement`](DoStatement.md)
- [`ForInStatement`](ForInStatement-1.md)
- [`ForOfStatement`](ForOfStatement-1.md)
- [`ForStatement`](ForStatement-1.md)
- [`FunctionExpression`](FunctionExpression-1.md)
- [`GetAccessorDeclaration`](GetAccessorDeclaration.md)
- [`IfStatement`](IfStatement-1.md)
- [`LabeledStatement`](LabeledStatement-1.md)
- [`MetaProperty`](MetaProperty-1.md)
- [`MethodDeclaration`](MethodDeclaration.md)
- [`ReturnStatement`](ReturnStatement-1.md)
- [`SetAccessorDeclaration`](SetAccessorDeclaration.md)
- [`SuperExpression`](SuperExpression.md)
- [`SwitchStatement`](SwitchStatement-1.md)
- [`ThisExpression`](ThisExpression-1.md)
- [`ThrowStatement`](ThrowStatement-1.md)
- [`TryStatement`](TryStatement-1.md)
- [`VariableStatement`](VariableStatement.md)
- [`WhileStatement`](WhileStatement-1.md)
- [`WithStatement`](WithStatement-1.md)

## Properties

### \_flowContainerBrand

> **\_flowContainerBrand**: `any`

***

### end

> `readonly` **end**: `number`

#### Inherited from

[`Node`](Node.md).[`end`](Node.md#end)

***

### flags

> `readonly` **flags**: [`NodeFlags`](../enumerations/NodeFlags.md)

#### Inherited from

[`Node`](Node.md).[`flags`](Node.md#flags)

***

### kind

> `readonly` **kind**: [`SyntaxKind`](../enumerations/SyntaxKind.md)

#### Inherited from

[`Node`](Node.md).[`kind`](Node.md#kind)

***

### parent

> `readonly` **parent**: [`Node`](Node.md)

#### Inherited from

[`Node`](Node.md).[`parent`](Node.md#parent)

***

### pos

> `readonly` **pos**: `number`

#### Inherited from

[`Node`](Node.md).[`pos`](Node.md#pos)

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

[`Node`](Node.md).[`forEachChild`](Node.md#foreachchild)

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

[`Node`](Node.md).[`getChildAt`](Node.md#getchildat)

***

### getChildCount()

> **getChildCount**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`Node`](Node.md).[`getChildCount`](Node.md#getchildcount)

***

### getChildren()

> **getChildren**(`sourceFile`?): readonly [`Node`](Node.md)[]

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

readonly [`Node`](Node.md)[]

#### Inherited from

[`Node`](Node.md).[`getChildren`](Node.md#getchildren)

***

### getEnd()

> **getEnd**(): `number`

#### Returns

`number`

#### Inherited from

[`Node`](Node.md).[`getEnd`](Node.md#getend)

***

### getFirstToken()

> **getFirstToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`Node`](Node.md).[`getFirstToken`](Node.md#getfirsttoken)

***

### getFullStart()

> **getFullStart**(): `number`

#### Returns

`number`

#### Inherited from

[`Node`](Node.md).[`getFullStart`](Node.md#getfullstart)

***

### getFullText()

> **getFullText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`Node`](Node.md).[`getFullText`](Node.md#getfulltext)

***

### getFullWidth()

> **getFullWidth**(): `number`

#### Returns

`number`

#### Inherited from

[`Node`](Node.md).[`getFullWidth`](Node.md#getfullwidth)

***

### getLastToken()

> **getLastToken**(`sourceFile`?): `undefined` \| [`Node`](Node.md)

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`undefined` \| [`Node`](Node.md)

#### Inherited from

[`Node`](Node.md).[`getLastToken`](Node.md#getlasttoken)

***

### getLeadingTriviaWidth()

> **getLeadingTriviaWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`number`

#### Inherited from

[`Node`](Node.md).[`getLeadingTriviaWidth`](Node.md#getleadingtriviawidth)

***

### getSourceFile()

> **getSourceFile**(): [`SourceFile`](SourceFile.md)

#### Returns

[`SourceFile`](SourceFile.md)

#### Inherited from

[`Node`](Node.md).[`getSourceFile`](Node.md#getsourcefile)

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

[`Node`](Node.md).[`getStart`](Node.md#getstart)

***

### getText()

> **getText**(`sourceFile`?): `string`

#### Parameters

##### sourceFile?

[`SourceFile`](SourceFile.md)

#### Returns

`string`

#### Inherited from

[`Node`](Node.md).[`getText`](Node.md#gettext)

***

### getWidth()

> **getWidth**(`sourceFile`?): `number`

#### Parameters

##### sourceFile?

[`SourceFileLike`](SourceFileLike.md)

#### Returns

`number`

#### Inherited from

[`Node`](Node.md).[`getWidth`](Node.md#getwidth)
