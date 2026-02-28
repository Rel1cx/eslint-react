[@eslint-react/core](../README.md) / ClassComponentSemanticNode

# Interface: ClassComponentSemanticNode

Represents a React Class Component

## Extends

- [`SemanticNode`](SemanticNode.md)

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-displayname"></a> `displayName` | `Expression` \| `null` | The display name of the component | - | - |
| <a id="property-flag"></a> `flag` | `bigint` | Flags describing the component's characteristics | [`SemanticNode`](SemanticNode.md).[`flag`](SemanticNode.md#property-flag) | - |
| <a id="property-hint"></a> `hint` | `bigint` | Hint for how the component was detected | [`SemanticNode`](SemanticNode.md).[`hint`](SemanticNode.md#property-hint) | - |
| <a id="property-id"></a> `id` | `BindingName` \| `null` | The identifier of the component | [`SemanticNode`](SemanticNode.md).[`id`](SemanticNode.md#property-id) | - |
| <a id="property-key"></a> `key` | `string` | The unique key of the node | - | [`SemanticNode`](SemanticNode.md).[`key`](SemanticNode.md#property-key) |
| <a id="property-kind"></a> `kind` | `"class-component"` | The kind of component | [`SemanticNode`](SemanticNode.md).[`kind`](SemanticNode.md#property-kind) | - |
| <a id="property-methods"></a> `methods` | `TSESTreeMethodOrProperty`[] | List of methods and properties in the class | - | - |
| <a id="property-name"></a> `name` | `string` \| `null` | The name of the node | - | [`SemanticNode`](SemanticNode.md).[`name`](SemanticNode.md#property-name) |
| <a id="property-node"></a> `node` | `TSESTreeClass` | The AST node of the class | [`SemanticNode`](SemanticNode.md).[`node`](SemanticNode.md#property-node) | - |
