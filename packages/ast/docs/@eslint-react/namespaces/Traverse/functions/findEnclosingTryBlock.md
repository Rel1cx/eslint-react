[@eslint-react/ast](../../../../README.md) / [Traverse](../README.md) / findEnclosingTryBlock

# Function: findEnclosingTryBlock()

```ts
function findEnclosingTryBlock(node: Node): TryStatement | null;
```

Finds the nearest TryStatement whose `try` block (not catch/finally) encloses the given node.

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`TryStatement` \| `null`

The enclosing TryStatement, or null if none is found.
