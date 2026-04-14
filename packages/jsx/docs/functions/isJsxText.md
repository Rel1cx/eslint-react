[@eslint-react/jsx](../README.md) / isJsxText

# Function: isJsxText()

```ts
function isJsxText(node: Node | null): node is JSXText | Literal;
```

Check whether a node is a JSX text node.

Returns `true` for both `JSXText` nodes and `Literal` nodes that appear
as direct children of a JSX element (the parser may represent inline text
with either node type depending on context).

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `null` | The AST node to test. |

## Returns

node is JSXText \| Literal

`true` when `node` is a `JSXText` or `Literal`.
