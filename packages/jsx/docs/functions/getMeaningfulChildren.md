[@eslint-react/jsx](../README.md) / getMeaningfulChildren

# Function: getMeaningfulChildren()

```ts
function getMeaningfulChildren(element: TSESTreeJSXElementLike): JSXChild[];
```

Get the children of a JSX element or fragment that are not syntactically empty.

Unlike [getChildren](getChildren.md), all whitespace-only `JSXText` as determined by
[isWhitespaceText](isWhitespaceText.md) is excluded, so `getMeaningfulChildren` is stricter
for same-line whitespace (ex: `<div> </div>` yields no children here but one
child from `getChildren`). Like `getChildren`, empty expression containers and
empty string literal expressions are also excluded, and this is a syntactic
check: `{null}`, `{false}`, and other dynamic expressions count as children.

## Parameters

| Parameter | Type                     | Description                           |
| --------- | ------------------------ | ------------------------------------- |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`JSXChild`[]

The children that are not syntactically empty.
