[@eslint-react/jsx](../README.md) / isPaddingWhitespace

# Function: isPaddingWhitespace()

```ts
function isPaddingWhitespace(node: Node | null | undefined): node is JSXText;
```

Check if the node is whitespace padding that React would trim away during
rendering, that is, a `JSXText` node that cleans to nothing (see
[collapseMultilineText](collapseMultilineText.md)) and contains a newline.

For the looser "any whitespace-only text" check, see [isWhitespaceText](isWhitespaceText.md).

Reads the entity-decoded `node.value`; `value` and `raw` differ only when the
text contains HTML entities (ex: `&nbsp;`), which is never whitespace-only,
so reading either field yields the same result here.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`node is JSXText`

`true` if the node is purely formatting whitespace.
