[@eslint-react/core](../README.md) / SemanticNode

# Interface: SemanticNode

Represents a semantic node in the AST
This is the base interface for all semantic nodes in the React semantic analysis

## Extended by

- [`FunctionComponentSemanticNode`](FunctionComponentSemanticNode.md)
- [`ClassComponentSemanticNode`](ClassComponentSemanticNode.md)
- [`HookSemanticNode`](HookSemanticNode.md)
- [`SemanticFunc`](SemanticFunc.md)

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-flag"></a> `flag` | `bigint` | The flag of the node |
| <a id="property-hint"></a> `hint` | `bigint` | The hint of the node |
| <a id="property-id"></a> `id` | `Node` \| `undefined` | The identifier of the node |
| <a id="property-key"></a> `key` | `string` | The unique key of the node |
| <a id="property-kind"></a> `kind` | `string` | The kind of the node |
| <a id="property-name"></a> `name` | `string` \| `undefined` | The name of the node |
| <a id="property-node"></a> `node` | `Node` | The AST node |
