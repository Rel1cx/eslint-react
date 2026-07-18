[@eslint-react/jsx](../README.md) / isPaddingWhitespace

# Function: isPaddingWhitespace()

```ts
function isPaddingWhitespace(node: JSXChild): boolean;
```

Check whether a JSX child node is whitespace padding that React would
trim away during rendering.

A child is considered whitespace padding when it is a `JSXText` node whose
content is empty after applying React's whitespace normalization
(see [collapseMultilineText](collapseMultilineText.md), modelled after Babel's
`cleanJSXElementLiteralChild`) **and** it contains a newline. This is the
whitespace that appears between JSX tags purely for formatting.

For the looser "any whitespace-only text" check, see [isWhitespaceText](isWhitespaceText.md).

## Parameters

| Parameter | Type       | Description       |
| --------- | ---------- | ----------------- |
| `node`    | `JSXChild` | A JSX child node. |

## Returns

`boolean`

`true` when the node is purely formatting whitespace.
