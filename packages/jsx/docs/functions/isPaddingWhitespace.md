[@eslint-react/jsx](../README.md) / isPaddingWhitespace

# Function: isPaddingWhitespace()

```ts
function isPaddingWhitespace(node: Node | null | undefined): boolean;
```

Check if the node is whitespace-only `JSXText` that this module treats as
padding: it cleans to nothing (see [collapseMultilineText](collapseMultilineText.md)) and holds a
line break (`\r\n`, `\n`, or `\r`), matching Babel's
`cleanJSXElementLiteralChild` line splitting.

Uses the entity-decoded `value`, so `&#10;`/`&#13;` match even though the raw
text has no line break; [isWhitespaceText](isWhitespaceText.md) is the raw-text counterpart.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`boolean`

`true` if the node is formatting whitespace by its decoded value.

## Remarks

Entity-decoded line breaks follow Babel's cleaning; `tsc --jsx` may emit them
as children instead.
A content predicate, not a type guard: `false` does not mean the node is not
`JSXText`.
