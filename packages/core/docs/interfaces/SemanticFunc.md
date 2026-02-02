[@eslint-react/core](../README.md) / SemanticFunc

# Interface: SemanticFunc

Represents a semantic function node in the AST
This interface extends SemanticNode and provides additional properties for function analysis

## Extends

- [`SemanticNode`](SemanticNode.md)

## Extended by

- [`ClientFunctionSemanticNode`](ClientFunctionSemanticNode.md)
- [`ServerFunctionSemanticNode`](ServerFunctionSemanticNode.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="body"></a> `body` | `BlockStatement` \| `Expression` | The body of the function | - | - |
| <a id="directives"></a> `directives` | `TSESTreeDirective`[] | The directives of the function (e.g., "use strict", "use client", "use server", etc.) | - | - |
| <a id="flag"></a> `flag` | `bigint` | The flag of the node | - | [`SemanticNode`](SemanticNode.md).[`flag`](SemanticNode.md#flag) |
| <a id="hint"></a> `hint` | `bigint` | The hint of the node | - | [`SemanticNode`](SemanticNode.md).[`hint`](SemanticNode.md#hint) |
| <a id="id"></a> `id` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `PrivateIdentifier` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` \| `undefined` | The identifier of the function | [`SemanticNode`](SemanticNode.md).[`id`](SemanticNode.md#id) | - |
| <a id="key"></a> `key` | `string` | The unique key of the node | - | [`SemanticNode`](SemanticNode.md).[`key`](SemanticNode.md#key) |
| <a id="kind"></a> `kind` | `string` | The kind of the node | - | [`SemanticNode`](SemanticNode.md).[`kind`](SemanticNode.md#kind) |
| <a id="name"></a> `name` | `string` \| `undefined` | The name of the function | [`SemanticNode`](SemanticNode.md).[`name`](SemanticNode.md#name) | - |
| <a id="node"></a> `node` | `TSESTreeFunction` | The AST node of the function | [`SemanticNode`](SemanticNode.md).[`node`](SemanticNode.md#node) | - |
| <a id="parameters"></a> `parameters` | `Parameter`[] | The parameters of the function | - | - |
| <a id="type"></a> `type` | `TSTypeAnnotation` \| `undefined` | The return type annotation of the function | - | - |
| <a id="typeparameters"></a> `typeParameters` | `TSTypeParameterDeclaration` \| `undefined` | The type parameters of the function | - | - |
