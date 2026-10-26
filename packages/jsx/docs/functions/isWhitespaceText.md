[@eslint-react/jsx](../README.md) / isWhitespaceText

# Function: isWhitespaceText()

```ts
function isWhitespaceText(node: Node | null | undefined): node is JSXText;
```

Check if the node is whitespace-only text.

Looser variant of [isPaddingWhitespace](isPaddingWhitespace.md); matches every `JSXText` node
whose raw content is empty after trimming, regardless of newlines.

Reads `node.raw` rather than the entity-decoded `value`; for whitespace-only
text the two are identical (an entity is never whitespace), matching React's
behavior of rendering entity text like `&nbsp;` as a real text node.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`node is JSXText`

`true` if the node is a whitespace-only `JSXText`.
