[@eslint-react/core](../README.md) / ClientFunctionSemanticNode

# Interface: ClientFunctionSemanticNode

Represents a React Client Function

## Extends

- [`SemanticFunc`](SemanticFunc.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-body"></a> `body` | `BlockStatement` \| `Expression` | The body of the function | - | [`SemanticFunc`](SemanticFunc.md).[`body`](SemanticFunc.md#property-body) |
| <a id="property-directives"></a> `directives` | `TSESTreeDirective`[] | The directives of the function (e.g., "use strict", "use client", "use server", etc.) | - | [`SemanticFunc`](SemanticFunc.md).[`directives`](SemanticFunc.md#property-directives) |
| <a id="property-flag"></a> `flag` | `bigint` | The flag of the node | - | [`SemanticFunc`](SemanticFunc.md).[`flag`](SemanticFunc.md#property-flag) |
| <a id="property-hint"></a> `hint` | `bigint` | The hint of the node | - | [`SemanticFunc`](SemanticFunc.md).[`hint`](SemanticFunc.md#property-hint) |
| <a id="property-id"></a> `id` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `PrivateIdentifier` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` \| `undefined` | The identifier of the function | - | [`SemanticFunc`](SemanticFunc.md).[`id`](SemanticFunc.md#property-id) |
| <a id="property-key"></a> `key` | `string` | The unique key of the node | - | [`SemanticFunc`](SemanticFunc.md).[`key`](SemanticFunc.md#property-key) |
| <a id="property-kind"></a> `kind` | `"client-function"` | The kind of function | [`SemanticFunc`](SemanticFunc.md).[`kind`](SemanticFunc.md#property-kind) | - |
| <a id="property-name"></a> `name` | `string` \| `undefined` | The name of the function | - | [`SemanticFunc`](SemanticFunc.md).[`name`](SemanticFunc.md#property-name) |
| <a id="property-node"></a> `node` | `TSESTreeFunction` | The AST node of the function | - | [`SemanticFunc`](SemanticFunc.md).[`node`](SemanticFunc.md#property-node) |
| <a id="property-parameters"></a> `parameters` | `Parameter`[] | The parameters of the function | - | [`SemanticFunc`](SemanticFunc.md).[`parameters`](SemanticFunc.md#property-parameters) |
| <a id="property-type"></a> `type` | `TSTypeAnnotation` \| `undefined` | The return type annotation of the function | - | [`SemanticFunc`](SemanticFunc.md).[`type`](SemanticFunc.md#property-type) |
| <a id="property-typeparameters"></a> `typeParameters` | `TSTypeParameterDeclaration` \| `undefined` | The type parameters of the function | - | [`SemanticFunc`](SemanticFunc.md).[`typeParameters`](SemanticFunc.md#property-typeparameters) |
