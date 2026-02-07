[@eslint-react/core](../README.md) / HookSemanticNode

# Interface: HookSemanticNode

Represents a semantic hook node in the AST
This interface extends SemanticNode and provides additional properties for React hook analysis

## Extends

- [`SemanticNode`](SemanticNode.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-directives"></a> `directives` | `StringLiteral`[] | The directives used in the function (e.g., "use strict", "use client", etc.) | - | - |
| <a id="property-flag"></a> `flag` | `bigint` | The flag of the node | - | [`SemanticNode`](SemanticNode.md).[`flag`](SemanticNode.md#property-flag) |
| <a id="property-hint"></a> `hint` | `bigint` | The hint of the node | - | [`SemanticNode`](SemanticNode.md).[`hint`](SemanticNode.md#property-hint) |
| <a id="property-hookcalls"></a> `hookCalls` | `CallExpression`[] | The other hooks called by the hook | - | - |
| <a id="property-id"></a> `id` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `PrivateIdentifier` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` \| `undefined` | The identifier of the hook | [`SemanticNode`](SemanticNode.md).[`id`](SemanticNode.md#property-id) | - |
| <a id="property-key"></a> `key` | `string` | The unique key of the node | - | [`SemanticNode`](SemanticNode.md).[`key`](SemanticNode.md#property-key) |
| <a id="property-kind"></a> `kind` | `string` | The kind of the node | - | [`SemanticNode`](SemanticNode.md).[`kind`](SemanticNode.md#property-kind) |
| <a id="property-name"></a> `name` | `string` | The name of the hook | [`SemanticNode`](SemanticNode.md).[`name`](SemanticNode.md#property-name) | - |
| <a id="property-node"></a> `node` | `TSESTreeFunction` | The AST node of the hook | [`SemanticNode`](SemanticNode.md).[`node`](SemanticNode.md#property-node) | - |
