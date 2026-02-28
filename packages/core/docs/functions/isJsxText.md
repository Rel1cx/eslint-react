[@eslint-react/core](../README.md) / isJsxText

# Function: isJsxText()

```ts
function isJsxText(node: Node | null): node is JSXText | Literal;
```

Check if a node is a `JSXText` or a `Literal` node

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `null` | The AST node to check |

## Returns

node is JSXText \| Literal

`true` if the node is a `JSXText` or a `Literal` node
