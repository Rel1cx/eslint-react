[@eslint-react/jsx](../README.md) / hasMeaningfulChildren

# Function: hasMeaningfulChildren()

```ts
function hasMeaningfulChildren(element: TSESTreeJSXElementLike): boolean;
```

Check if the element has at least one syntactically non-empty child.

A child counts when it is not whitespace-only `JSXText` as determined by
[isWhitespaceText](isWhitespaceText.md), an empty expression container (`{}` or
`{/* comment */}`), or an empty string literal expression (`{""}`). Same-line
whitespace does not count, unlike in [getChildren](getChildren.md). `{null}`, `{false}`,
and other dynamic expressions do count.

## Parameters

| Parameter | Type                     | Description                           |
| --------- | ------------------------ | ------------------------------------- |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`boolean`

`true` if the element has at least one syntactically non-empty child.
