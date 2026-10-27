[@eslint-react/jsx](../README.md) / isWhitespaceText

# Function: isWhitespaceText()

```ts
function isWhitespaceText(node: Node | null | undefined): boolean;
```

Check if the node is whitespace-only `JSXText`, based on its raw source text.

Matches any `JSXText` node whose raw text is empty after trimming, regardless
of newlines. Same-line whitespace matches here; [isPaddingWhitespace](isPaddingWhitespace.md)
additionally requires a line feed and uses the decoded value.

Reads `node.raw` rather than the entity-decoded `value`, so entity text such
as `&nbsp;` or `&#32;` is treated as content even when its decoded value is
whitespace. This is a syntactic check on the source text, not a model of
React's whitespace collapsing.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`boolean`

`true` if the node is whitespace-only `JSXText` in its raw form.

## Remarks

This is a content predicate, not a type guard: a `false` result does not
mean the node is not `JSXText`, only that it is not whitespace-only text.
