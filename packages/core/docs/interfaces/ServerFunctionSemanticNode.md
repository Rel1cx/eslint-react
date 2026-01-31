[@eslint-react/core](../README.md) / ServerFunctionSemanticNode

# Interface: ServerFunctionSemanticNode

Represents a React Server Function

## Extends

- [`SemanticFunc`](SemanticFunc.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="body"></a> `body` | `BlockStatement` \| `Expression` | The body of the function | - | [`SemanticFunc`](SemanticFunc.md).[`body`](SemanticFunc.md#body) |
| <a id="directives"></a> `directives` | `StringLiteral`[] | The directives of the function (e.g., "use strict", "use client", "use server", etc.) | - | [`SemanticFunc`](SemanticFunc.md).[`directives`](SemanticFunc.md#directives) |
| <a id="flag"></a> `flag` | `bigint` | The flag of the node | - | [`SemanticFunc`](SemanticFunc.md).[`flag`](SemanticFunc.md#flag) |
| <a id="hint"></a> `hint` | `bigint` | The hint of the node | - | [`SemanticFunc`](SemanticFunc.md).[`hint`](SemanticFunc.md#hint) |
| <a id="id"></a> `id` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `PrivateIdentifier` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` \| `undefined` | The identifier of the function | - | [`SemanticFunc`](SemanticFunc.md).[`id`](SemanticFunc.md#id) |
| <a id="key"></a> `key` | `string` | The unique key of the node | - | [`SemanticFunc`](SemanticFunc.md).[`key`](SemanticFunc.md#key) |
| <a id="kind"></a> `kind` | `"server-function"` | The kind of function | [`SemanticFunc`](SemanticFunc.md).[`kind`](SemanticFunc.md#kind) | - |
| <a id="name"></a> `name` | `string` \| `undefined` | The name of the function | - | [`SemanticFunc`](SemanticFunc.md).[`name`](SemanticFunc.md#name) |
| <a id="node"></a> `node` | `TSESTreeFunction` | The AST node of the function | - | [`SemanticFunc`](SemanticFunc.md).[`node`](SemanticFunc.md#node) |
| <a id="parameters"></a> `parameters` | `Parameter`[] | The parameters of the function | - | [`SemanticFunc`](SemanticFunc.md).[`parameters`](SemanticFunc.md#parameters) |
| <a id="type"></a> `type` | `TSTypeAnnotation` \| `undefined` | The return type annotation of the function | - | [`SemanticFunc`](SemanticFunc.md).[`type`](SemanticFunc.md#type) |
| <a id="typeparameters"></a> `typeParameters` | `TSTypeParameterDeclaration` \| `undefined` | The type parameters of the function | - | [`SemanticFunc`](SemanticFunc.md).[`typeParameters`](SemanticFunc.md#typeparameters) |
