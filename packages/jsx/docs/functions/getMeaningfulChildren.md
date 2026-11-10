[@eslint-react/jsx](../README.md) / getMeaningfulChildren

# Function: getMeaningfulChildren()

```ts
function getMeaningfulChildren(element: TSESTreeJSXElementLike): JSXChild[];
```

Get the children of a JSX element or fragment that are not syntactically
empty.

Stricter than [getChildren](getChildren.md) for same-line whitespace
(`<div> </div>` yields no children here). Dynamic expressions count, and
entity line breaks (`&#10;`, `&#13;`) are kept because the raw text is not
whitespace, whereas `getChildren` excludes them through Babel's decoded-value
cleaning. See [getChildren](getChildren.md) for a comparison table.

## Parameters

| Parameter | Type                     | Description                           |
| --------- | ------------------------ | ------------------------------------- |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`JSXChild`[]

The children that are not syntactically empty.
