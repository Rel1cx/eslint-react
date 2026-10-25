[@eslint-react/ast](../../../../README.md) / [Collect](../README.md) / getReturnStatements

# Function: getReturnStatements()

```ts
function getReturnStatements(node: Node): readonly ReturnStatement[];
```

Get all return statements in the subtree of `node` that belong to its function.

Return statements nested inside another function are excluded. When `node` is a function, its
own returns are collected; otherwise returns in its subtree are collected as long as they are
not nested inside a function. The search never expands beyond the subtree of `node`.

## Parameters

| Parameter | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| `node`    | `Node` | The node whose subtree is searched. |

## Returns

readonly `ReturnStatement`[]

The return statements in the subtree, in source order.
