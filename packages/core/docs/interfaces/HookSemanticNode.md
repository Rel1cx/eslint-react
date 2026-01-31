[@eslint-react/core](../README.md) / HookSemanticNode

# Interface: HookSemanticNode

Represents a semantic hook node in the AST
This interface extends SemanticNode and provides additional properties for React hook analysis

## Extends

- [`SemanticNode`](SemanticNode.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="directives"></a> `directives` | `StringLiteral`[] | The directives used in the function (e.g., "use strict", "use client", etc.) | - | - |
| <a id="flag"></a> `flag` | `bigint` | The flag of the node | - | [`SemanticNode`](SemanticNode.md).[`flag`](SemanticNode.md#flag) |
| <a id="hint"></a> `hint` | `bigint` | The hint of the node | - | [`SemanticNode`](SemanticNode.md).[`hint`](SemanticNode.md#hint) |
| <a id="hookcalls"></a> `hookCalls` | `CallExpression`[] | The other hooks called by the hook | - | - |
| <a id="id"></a> `id` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `PrivateIdentifier` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` \| `undefined` | The identifier of the hook | [`SemanticNode`](SemanticNode.md).[`id`](SemanticNode.md#id) | - |
| <a id="key"></a> `key` | `string` | The unique key of the node | - | [`SemanticNode`](SemanticNode.md).[`key`](SemanticNode.md#key) |
| <a id="kind"></a> `kind` | `string` | The kind of the node | - | [`SemanticNode`](SemanticNode.md).[`kind`](SemanticNode.md#kind) |
| <a id="name"></a> `name` | `string` | The name of the hook | [`SemanticNode`](SemanticNode.md).[`name`](SemanticNode.md#name) | - |
| <a id="node"></a> `node` | `TSESTreeFunction` | The AST node of the hook | [`SemanticNode`](SemanticNode.md).[`node`](SemanticNode.md#node) | - |
