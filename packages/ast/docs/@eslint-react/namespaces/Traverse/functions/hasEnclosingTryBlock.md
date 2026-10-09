[@eslint-react/ast](../../../../README.md) / [Traverse](../README.md) / hasEnclosingTryBlock

# Function: hasEnclosingTryBlock()

```ts
function hasEnclosingTryBlock(node: Node): boolean;
```

Check whether the given node is enclosed by the `try` block (not `catch`/`finally`) of a `TryStatement`.

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`boolean`

`true` when an enclosing `try` block exists.
