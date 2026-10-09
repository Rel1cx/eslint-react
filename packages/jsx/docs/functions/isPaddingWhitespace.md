[@eslint-react/jsx](../README.md) / isPaddingWhitespace

# Function: isPaddingWhitespace()

```ts
function isPaddingWhitespace(node: JSXChild): boolean;
```

Check if the node is whitespace padding that React would trim away during
rendering, that is, a `JSXText` node that cleans to nothing (see
[collapseMultilineText](collapseMultilineText.md)) and contains a newline.

For the looser "any whitespace-only text" check, see [isWhitespaceText](isWhitespaceText.md).

## Parameters

| Parameter | Type       | Description                  |
| --------- | ---------- | ---------------------------- |
| `node`    | `JSXChild` | The JSX child node to check. |

## Returns

`boolean`

`true` if the node is purely formatting whitespace.
