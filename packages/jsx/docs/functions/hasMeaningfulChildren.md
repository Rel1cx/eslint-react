[@eslint-react/jsx](../README.md) / hasMeaningfulChildren

# Function: hasMeaningfulChildren()

```ts
function hasMeaningfulChildren(element: TSESTreeJSXElementLike): boolean;
```

Check if the element has at least one syntactically non-empty child.

A child counts unless it is whitespace-only `JSXText` per
[isWhitespaceText](isWhitespaceText.md), an empty expression container, or a bare empty
string literal. Same-line whitespace does not count, unlike in
[getChildren](getChildren.md); `{null}`, `{false}`, and other dynamic expressions do. A
syntactic check, not a rendering oracle.

## Parameters

| Parameter | Type                     | Description                           |
| --------- | ------------------------ | ------------------------------------- |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`boolean`

`true` if the element has at least one syntactically non-empty child.
