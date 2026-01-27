[@eslint-react/core](../README.md) / ReactHook

# Interface: ReactHook

## Extends

- [`SemanticNode`](SemanticNode.md)

## Properties

| Property | Type | Overrides | Inherited from |
| ------ | ------ | ------ | ------ |
| <a id="flag"></a> `flag` | `bigint` | - | [`SemanticNode`](SemanticNode.md).[`flag`](SemanticNode.md#flag) |
| <a id="hint"></a> `hint` | `bigint` | - | [`SemanticNode`](SemanticNode.md).[`hint`](SemanticNode.md#hint) |
| <a id="hookcalls"></a> `hookCalls` | `CallExpression`[] | - | - |
| <a id="id"></a> `id` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `PrivateIdentifier` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` \| `undefined` | [`SemanticNode`](SemanticNode.md).[`id`](SemanticNode.md#id) | - |
| <a id="key"></a> `key` | `string` | - | [`SemanticNode`](SemanticNode.md).[`key`](SemanticNode.md#key) |
| <a id="kind"></a> `kind` | `string` | - | [`SemanticNode`](SemanticNode.md).[`kind`](SemanticNode.md#kind) |
| <a id="name"></a> `name` | `string` | [`SemanticNode`](SemanticNode.md).[`name`](SemanticNode.md#name) | - |
| <a id="node"></a> `node` | `TSESTreeFunction` | [`SemanticNode`](SemanticNode.md).[`node`](SemanticNode.md#node) | - |
