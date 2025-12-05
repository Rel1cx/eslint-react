[@eslint-react/core](../README.md) / FunctionComponent

# Interface: FunctionComponent

Represents a React function component

## Extends

- [`SemanticNode`](SemanticNode.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="displayname"></a> `displayName` | `Expression` \| `undefined` | The display name of the component | - | - |
| <a id="flag"></a> `flag` | `bigint` | Flags describing the component's characteristics | [`SemanticNode`](SemanticNode.md).[`flag`](SemanticNode.md#flag) | - |
| <a id="hint"></a> `hint` | `bigint` | Hint for how the component was detected | [`SemanticNode`](SemanticNode.md).[`hint`](SemanticNode.md#hint) | - |
| <a id="hookcalls"></a> `hookCalls` | `CallExpression`[] | List of hook calls within the component | - | - |
| <a id="id"></a> `id` | `Identifier` \| `Identifier`[] \| `undefined` | The identifier or identifier sequence of the component | [`SemanticNode`](SemanticNode.md).[`id`](SemanticNode.md#id) | - |
| <a id="initpath"></a> `initPath` | `FunctionInitPath` \| `undefined` | The initialization path of the function | - | - |
| <a id="key"></a> `key` | `string` | - | - | [`SemanticNode`](SemanticNode.md).[`key`](SemanticNode.md#key) |
| <a id="kind"></a> `kind` | `"function"` | The kind of component | [`SemanticNode`](SemanticNode.md).[`kind`](SemanticNode.md#kind) | - |
| <a id="name"></a> `name` | `string` \| `undefined` | - | - | [`SemanticNode`](SemanticNode.md).[`name`](SemanticNode.md#name) |
| <a id="node"></a> `node` | `TSESTreeFunction` | The AST node of the function | [`SemanticNode`](SemanticNode.md).[`node`](SemanticNode.md#node) | - |
