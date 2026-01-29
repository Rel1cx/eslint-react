[@eslint-react/core](../README.md) / FunctionComponentSemanticNode

# Interface: FunctionComponentSemanticNode

Represents a React Function Component

## Extends

- [`SemanticNode`](SemanticNode.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="directives"></a> `directives` | `StringLiteral`[] | The directives used in the function (e.g., "use strict", "use client", etc.) | - | - |
| <a id="displayname"></a> `displayName` | `Expression` \| `undefined` | The display name of the component | - | - |
| <a id="flag"></a> `flag` | `bigint` | Flags describing the component's characteristics | [`SemanticNode`](SemanticNode.md).[`flag`](SemanticNode.md#flag) | - |
| <a id="hint"></a> `hint` | `bigint` | Hint for how the component was detected | [`SemanticNode`](SemanticNode.md).[`hint`](SemanticNode.md#hint) | - |
| <a id="hookcalls"></a> `hookCalls` | `CallExpression`[] | List of hook calls within the component | - | - |
| <a id="id"></a> `id` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `PrivateIdentifier` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` \| `undefined` | The identifier or identifier sequence of the component | [`SemanticNode`](SemanticNode.md).[`id`](SemanticNode.md#id) | - |
| <a id="initpath"></a> `initPath` | `FunctionInitPath` \| `undefined` | The initialization path of the function | - | - |
| <a id="isexportdefault"></a> `isExportDefault` | `boolean` | Indicates if the component is inside an export default declaration | - | - |
| <a id="isexportdefaultdeclaration"></a> `isExportDefaultDeclaration` | `boolean` | Indicates if the component is itself an export default declaration | - | - |
| <a id="key"></a> `key` | `string` | - | - | [`SemanticNode`](SemanticNode.md).[`key`](SemanticNode.md#key) |
| <a id="kind"></a> `kind` | `"function"` | The kind of component | [`SemanticNode`](SemanticNode.md).[`kind`](SemanticNode.md#kind) | - |
| <a id="name"></a> `name` | `string` \| `undefined` | - | - | [`SemanticNode`](SemanticNode.md).[`name`](SemanticNode.md#name) |
| <a id="node"></a> `node` | `TSESTreeFunction` | The AST node of the function | [`SemanticNode`](SemanticNode.md).[`node`](SemanticNode.md#node) | - |
| <a id="rets"></a> `rets` | (`Expression` \| `null`)[] | List of expressions returned by the component | - | - |
