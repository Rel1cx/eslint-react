[@eslint-react/jsx](../README.md) / isWhitespaceText

# Function: isWhitespaceText()

```ts
function isWhitespaceText(node: JSXChild): boolean;
```

Check if the node is whitespace-only text.

Looser variant of [isPaddingWhitespace](isPaddingWhitespace.md); matches every `JSXText` node
whose raw content is empty after trimming, regardless of newlines.

Reads `node.raw` rather than the entity-decoded `value`; for whitespace-only
text the two are identical (an entity is never whitespace), matching React's
behavior of rendering entity text like `&nbsp;` as a real text node.

## Parameters

| Parameter | Type       | Description                  |
| --------- | ---------- | ---------------------------- |
| `node`    | `JSXChild` | The JSX child node to check. |

## Returns

`boolean`

`true` if the node is a whitespace-only `JSXText`.
