[@eslint-react/var](../README.md) / resolveEnclosingAssignmentTarget

# Function: resolveEnclosingAssignmentTarget()

```ts
function resolveEnclosingAssignmentTarget(node: Node): EnclosingAssignmentTarget;
```

Resolve the enclosing assignment target (variable, property, etc.) of the node.

## Parameters

| Parameter | Type   | Description                              |
| --------- | ------ | ---------------------------------------- |
| `node`    | `Node` | The starting node for the upward search. |

## Returns

[`EnclosingAssignmentTarget`](../type-aliases/EnclosingAssignmentTarget.md)

The enclosing assignment target node, or `null` when not found.
