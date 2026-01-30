[@eslint-react/core](../README.md) / ClassComponentSemanticNode

# Interface: ClassComponentSemanticNode

Represents a React Class Component

## Extends

- [`SemanticNode`](SemanticNode.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="displayname"></a> `displayName` | `Expression` \| `undefined` | The display name of the component | - | - |
| <a id="flag"></a> `flag` | `bigint` | Flags describing the component's characteristics | [`SemanticNode`](SemanticNode.md).[`flag`](SemanticNode.md#flag) | - |
| <a id="hint"></a> `hint` | `bigint` | Hint for how the component was detected | [`SemanticNode`](SemanticNode.md).[`hint`](SemanticNode.md#hint) | - |
| <a id="id"></a> `id` | `BindingName` \| `undefined` | The identifier of the component | [`SemanticNode`](SemanticNode.md).[`id`](SemanticNode.md#id) | - |
| <a id="key"></a> `key` | `string` | - | - | [`SemanticNode`](SemanticNode.md).[`key`](SemanticNode.md#key) |
| <a id="kind"></a> `kind` | `"class-component"` | The kind of component | [`SemanticNode`](SemanticNode.md).[`kind`](SemanticNode.md#kind) | - |
| <a id="methods"></a> `methods` | `TSESTreeMethodOrProperty`[] | List of methods and properties in the class | - | - |
| <a id="name"></a> `name` | `string` \| `undefined` | - | - | [`SemanticNode`](SemanticNode.md).[`name`](SemanticNode.md#name) |
| <a id="node"></a> `node` | `TSESTreeClass` | The AST node of the class | [`SemanticNode`](SemanticNode.md).[`node`](SemanticNode.md#node) | - |
