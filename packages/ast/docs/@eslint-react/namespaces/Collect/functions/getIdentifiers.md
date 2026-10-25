[@eslint-react/ast](../../../../README.md) / [Collect](../README.md) / getIdentifiers

# Function: getIdentifiers()

```ts
function getIdentifiers(node: Node): readonly Identifier[];
```

Get all identifiers referenced within an expression-like node, in source order.

The property name of a non-computed member access is not a reference, so `obj.prop` collects
only `obj`. Non-computed object property keys are not visited either. Nested function and class
bodies are ignored, and statement roots contribute only their expression-bearing parts.

## Parameters

| Parameter | Type   | Description                                           |
| --------- | ------ | ----------------------------------------------------- |
| `node`    | `Node` | The expression-like node to collect identifiers from. |

## Returns

readonly `Identifier`[]

All identifiers referenced by the node.
