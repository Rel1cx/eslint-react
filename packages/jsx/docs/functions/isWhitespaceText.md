[@eslint-react/jsx](../README.md) / isWhitespaceText

# Function: isWhitespaceText()

```ts
function isWhitespaceText(node: JSXChild): boolean;
```

Check whether a JSX child node is **any** whitespace‑only text.

This is a looser variant of [isWhitespace](isWhitespace.md) — it matches every
`JSXText` node whose raw content is empty after trimming, regardless of
whether it contains a newline.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `JSXChild` | A JSX child node. |

## Returns

`boolean`

`true` when the node is a whitespace‑only `JSXText`.
