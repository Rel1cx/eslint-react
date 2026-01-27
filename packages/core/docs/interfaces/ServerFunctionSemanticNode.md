[@eslint-react/core](../README.md) / ServerFunctionSemanticNode

# Interface: ServerFunctionSemanticNode

## Extends

- [`SemanticFunc`](SemanticFunc.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="body"></a> `body` | `BlockStatement` \| `Expression` | - | - | [`SemanticFunc`](SemanticFunc.md).[`body`](SemanticFunc.md#body) |
| <a id="directives"></a> `directives` | `StringLiteral`[] | - | - | [`SemanticFunc`](SemanticFunc.md).[`directives`](SemanticFunc.md#directives) |
| <a id="flag"></a> `flag` | `bigint` | - | - | [`SemanticFunc`](SemanticFunc.md).[`flag`](SemanticFunc.md#flag) |
| <a id="hint"></a> `hint` | `bigint` | - | - | [`SemanticFunc`](SemanticFunc.md).[`hint`](SemanticFunc.md#hint) |
| <a id="id"></a> `id` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `PrivateIdentifier` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` \| `undefined` | - | - | [`SemanticFunc`](SemanticFunc.md).[`id`](SemanticFunc.md#id) |
| <a id="key"></a> `key` | `string` | - | - | [`SemanticFunc`](SemanticFunc.md).[`key`](SemanticFunc.md#key) |
| <a id="kind"></a> `kind` | `"server-function"` | The kind of function | [`SemanticFunc`](SemanticFunc.md).[`kind`](SemanticFunc.md#kind) | - |
| <a id="name"></a> `name` | `string` \| `undefined` | - | - | [`SemanticFunc`](SemanticFunc.md).[`name`](SemanticFunc.md#name) |
| <a id="node"></a> `node` | `TSESTreeFunction` | - | - | [`SemanticFunc`](SemanticFunc.md).[`node`](SemanticFunc.md#node) |
| <a id="parameters"></a> `parameters` | `Parameter`[] | - | - | [`SemanticFunc`](SemanticFunc.md).[`parameters`](SemanticFunc.md#parameters) |
| <a id="type"></a> `type` | `TSTypeAnnotation` \| `undefined` | - | - | [`SemanticFunc`](SemanticFunc.md).[`type`](SemanticFunc.md#type) |
| <a id="typeparameters"></a> `typeParameters` | `TSTypeParameterDeclaration` \| `undefined` | - | - | [`SemanticFunc`](SemanticFunc.md).[`typeParameters`](SemanticFunc.md#typeparameters) |
