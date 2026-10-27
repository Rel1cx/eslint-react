[@eslint-react/jsx](../README.md) / isWhitespaceText

# Function: isWhitespaceText()

```ts
function isWhitespaceText(node: Node | null | undefined): boolean;
```

Check if the node is whitespace-only `JSXText` by its raw source text.

Uses `node.raw`, not the entity-decoded `value`, so `&nbsp;`/`&#32;` count as
content even when their decoded value is whitespace; this is not a model of
React's whitespace collapsing. Same-line whitespace matches here, while
[isPaddingWhitespace](isPaddingWhitespace.md) (the decoded-value counterpart) also requires a
line break.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`boolean`

`true` if the node is whitespace-only `JSXText` in its raw form.

## Remarks

A content predicate, not a type guard: `false` does not mean the node is not
`JSXText`.
