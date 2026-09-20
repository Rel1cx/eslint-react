[@eslint-react/jsx](../README.md) / isWhitespaceText

# Function: isWhitespaceText()

```ts
function isWhitespaceText(node: JSXChild): boolean;
```

Check if the node is whitespace-only text.

Looser variant of [isPaddingWhitespace](isPaddingWhitespace.md); matches every `JSXText` node
whose raw content is empty after trimming, regardless of newlines.

## Parameters

| Parameter | Type       | Description                  |
| --------- | ---------- | ---------------------------- |
| `node`    | `JSXChild` | The JSX child node to check. |

## Returns

`boolean`

`true` if the node is a whitespace-only `JSXText`.
