[@eslint-react/core](../README.md) / isJsxText

# Function: isJsxText()

```ts
function isJsxText(node: Node | null | undefined): node is JSXText | Literal;
```

Checks if a node is a `JSXText` or a `Literal` node

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `null` \| `undefined` | The AST node to check |

## Returns

node is JSXText \| Literal

`true` if the node is a `JSXText` or a `Literal` node
