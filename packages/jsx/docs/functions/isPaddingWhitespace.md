[@eslint-react/jsx](../README.md) / isPaddingWhitespace

# Function: isPaddingWhitespace()

```ts
function isPaddingWhitespace(node: Node | null | undefined): node is JSXText;
```

Check if the node is whitespace-only `JSXText` that this module treats as
padding: it cleans to nothing (see [collapseMultilineText](collapseMultilineText.md)) and contains
a line feed (`\n`).

Reads the entity-decoded `node.value`, so an entity-encoded line break such as
`&#10;` matches even though the raw text contains no line break. For a
whitespace check based on raw source text, see [isWhitespaceText](isWhitespaceText.md).

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`node is JSXText`

`true` if the node is purely formatting whitespace by its decoded value.
