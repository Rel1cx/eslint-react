[@eslint-react/ast](../../../../README.md) / [Traverse](../README.md) / findEnclosingTryBlock

# Function: findEnclosingTryBlock()

```ts
function findEnclosingTryBlock(node: Node): TryStatement | null;
```

Find the nearest `TryStatement` whose `try` block (not `catch`/`finally`) encloses the given node.

This function relies on the `parent` pointers attached by the parser or by
`simpleTraverse` with `setParentPointers` enabled.

## Parameters

| Parameter | Type   | Description        |
| --------- | ------ | ------------------ |
| `node`    | `Node` | The node to check. |

## Returns

`TryStatement` \| `null`

The enclosing `TryStatement`, or `null` when none is found.
