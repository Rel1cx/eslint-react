[@eslint-react/core](../README.md) / ClassComponentSemanticNode

# ~~Interface: ClassComponentSemanticNode~~

## Deprecated

Class components are legacy. This type exists only to support legacy rules.

## Extends

- `SemanticNode`

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-displayname"></a> ~~`displayName`~~ | `Expression` \| `null` | - | - | - |
| <a id="property-flag"></a> ~~`flag`~~ | `bigint` | The flag of the node | `SemanticNode.flag` | - |
| <a id="property-hint"></a> ~~`hint`~~ | `bigint` | The hint of the node | `SemanticNode.hint` | - |
| <a id="property-id"></a> ~~`id`~~ | `BindingName` \| `null` | The identifier of the node | `SemanticNode.id` | - |
| <a id="property-key"></a> ~~`key`~~ | `string` | The unique key of the node | - | `SemanticNode.key` |
| <a id="property-kind"></a> ~~`kind`~~ | `"class-component"` | The kind of the node | `SemanticNode.kind` | - |
| <a id="property-methods"></a> ~~`methods`~~ | `TSESTreeMethodOrProperty`[] | - | - | - |
| <a id="property-name"></a> ~~`name`~~ | `string` \| `null` | The name of the node | - | `SemanticNode.name` |
| <a id="property-node"></a> ~~`node`~~ | `TSESTreeClass` | The AST node | `SemanticNode.node` | - |
