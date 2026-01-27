[@eslint-react/core](../README.md) / SemanticFunc

# Interface: SemanticFunc

## Extends

- [`SemanticNode`](SemanticNode.md)

## Extended by

- [`ClientFunctionSemanticNode`](ClientFunctionSemanticNode.md)
- [`ServerFunctionSemanticNode`](ServerFunctionSemanticNode.md)

## Properties

| Property | Type | Overrides | Inherited from |
| ------ | ------ | ------ | ------ |
| <a id="body"></a> `body` | `BlockStatement` \| `Expression` | - | - |
| <a id="directives"></a> `directives` | `StringLiteral`[] | - | - |
| <a id="flag"></a> `flag` | `bigint` | - | [`SemanticNode`](SemanticNode.md).[`flag`](SemanticNode.md#flag) |
| <a id="hint"></a> `hint` | `bigint` | - | [`SemanticNode`](SemanticNode.md).[`hint`](SemanticNode.md#hint) |
| <a id="id"></a> `id` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `PrivateIdentifier` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` \| `undefined` | [`SemanticNode`](SemanticNode.md).[`id`](SemanticNode.md#id) | - |
| <a id="key"></a> `key` | `string` | - | [`SemanticNode`](SemanticNode.md).[`key`](SemanticNode.md#key) |
| <a id="kind"></a> `kind` | `string` | - | [`SemanticNode`](SemanticNode.md).[`kind`](SemanticNode.md#kind) |
| <a id="name"></a> `name` | `string` \| `undefined` | [`SemanticNode`](SemanticNode.md).[`name`](SemanticNode.md#name) | - |
| <a id="node"></a> `node` | `TSESTreeFunction` | [`SemanticNode`](SemanticNode.md).[`node`](SemanticNode.md#node) | - |
| <a id="parameters"></a> `parameters` | `Parameter`[] | - | - |
| <a id="type"></a> `type` | `TSTypeAnnotation` \| `undefined` | - | - |
| <a id="typeparameters"></a> `typeParameters` | `TSTypeParameterDeclaration` \| `undefined` | - | - |
