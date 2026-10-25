[@eslint-react/ast](../../../../README.md) / [Traverse](../README.md) / simpleTraverse

# Function: simpleTraverse()

```ts
function simpleTraverse(root: Node, options?: SimpleTraverseOptions): void;
```

Walk the AST from `root`, calling `enter` before and `leave` after a node's children.

This is a lightweight local equivalent of `simpleTraverse` from
`@typescript-eslint/typescript-estree`: it only depends on the visitor keys, so importing it does
not load the TypeScript compiler. Parent pointers are not attached unless `setParentPointers` is
enabled; the parent of each node is passed to `enter` and `leave` instead. Node types missing
from the visitor keys are not descended into, which allows pruning subtrees (ex: function or
class bodies) with a custom map.

## Parameters

| Parameter  | Type                                                                | Description                |
| ---------- | ------------------------------------------------------------------- | -------------------------- |
| `root`     | `Node`                                                              | The root node to traverse. |
| `options?` | [`SimpleTraverseOptions`](../type-aliases/SimpleTraverseOptions.md) | Traversal options.         |

## Returns

`void`
