[@eslint-react/core](../README.md) / FunctionComponentSemanticNode

# Interface: FunctionComponentSemanticNode

Represents a React Function Component

## Extends

- [`SemanticNode`](SemanticNode.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-directives"></a> `directives` | `TSESTreeDirective`[] | The directives used in the function (e.g., "use strict", "use client", etc.) | - | - |
| <a id="property-displayname"></a> `displayName` | `Expression` \| `null` | The display name of the component | - | - |
| <a id="property-flag"></a> `flag` | `bigint` | Flags describing the component's characteristics | [`SemanticNode`](SemanticNode.md).[`flag`](SemanticNode.md#property-flag) | - |
| <a id="property-hint"></a> `hint` | `bigint` | Hint for how the component was detected | [`SemanticNode`](SemanticNode.md).[`hint`](SemanticNode.md#property-hint) | - |
| <a id="property-hookcalls"></a> `hookCalls` | `CallExpression`[] | List of hook calls within the component | - | - |
| <a id="property-id"></a> `id` | \| `ArrayExpression` \| `ArrayPattern` \| `ArrowFunctionExpression` \| `AssignmentExpression` \| `AwaitExpression` \| `PrivateInExpression` \| `SymmetricBinaryExpression` \| `CallExpression` \| `ChainExpression` \| `ClassExpression` \| `ConditionalExpression` \| `FunctionExpression` \| `Identifier` \| `ImportExpression` \| `JSXElement` \| `JSXFragment` \| `BigIntLiteral` \| `BooleanLiteral` \| `NullLiteral` \| `NumberLiteral` \| `RegExpLiteral` \| `StringLiteral` \| `LogicalExpression` \| `MemberExpressionComputedName` \| `MemberExpressionNonComputedName` \| `MetaProperty` \| `NewExpression` \| `ObjectExpression` \| `ObjectPattern` \| `PrivateIdentifier` \| `SequenceExpression` \| `Super` \| `TaggedTemplateExpression` \| `TemplateLiteral` \| `ThisExpression` \| `TSAsExpression` \| `TSInstantiationExpression` \| `TSNonNullExpression` \| `TSSatisfiesExpression` \| `TSTypeAssertion` \| `UnaryExpressionBitwiseNot` \| `UnaryExpressionDelete` \| `UnaryExpressionMinus` \| `UnaryExpressionNot` \| `UnaryExpressionPlus` \| `UnaryExpressionTypeof` \| `UnaryExpressionVoid` \| `UpdateExpression` \| `YieldExpression` \| `null` | The identifier or identifier sequence of the component | [`SemanticNode`](SemanticNode.md).[`id`](SemanticNode.md#property-id) | - |
| <a id="property-initpath"></a> `initPath` | `FunctionInitPath` \| `null` | The initialization path of the function | - | - |
| <a id="property-isexportdefault"></a> `isExportDefault` | `boolean` | Indicates if the component is inside an export default declaration | - | - |
| <a id="property-isexportdefaultdeclaration"></a> `isExportDefaultDeclaration` | `boolean` | Indicates if the component is itself an export default declaration | - | - |
| <a id="property-key"></a> `key` | `string` | The unique key of the node | - | [`SemanticNode`](SemanticNode.md).[`key`](SemanticNode.md#property-key) |
| <a id="property-kind"></a> `kind` | `"function-component"` | The kind of component | [`SemanticNode`](SemanticNode.md).[`kind`](SemanticNode.md#property-kind) | - |
| <a id="property-name"></a> `name` | `string` \| `null` | The name of the node | - | [`SemanticNode`](SemanticNode.md).[`name`](SemanticNode.md#property-name) |
| <a id="property-node"></a> `node` | `TSESTreeFunction` | The AST node of the function | [`SemanticNode`](SemanticNode.md).[`node`](SemanticNode.md#property-node) | - |
| <a id="property-rets"></a> `rets` | (`Expression` \| `null`)[] | List of expressions returned by the component | - | - |
