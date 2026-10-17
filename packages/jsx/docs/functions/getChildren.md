[@eslint-react/jsx](../README.md) / getChildren

# Function: getChildren()

```ts
function getChildren(element: TSESTreeJSXElementLike): JSXChild[];
```

Get the meaningful children of a JSX element or fragment.

Similar to Babel's `buildChildren` helper, with two differences: only padding
whitespace (whitespace containing a newline) is skipped, whereas Babel's
`cleanJSXElementLiteralChild` drops all whitespace-only `JSXText`; and empty
string expressions (`{""}`) are skipped as well, which follows React's
rendering behavior rather than Babel's:

1. Iterate over `element.children`.
2. Skip `JSXText` nodes that clean to nothing (padding whitespace).
3. Skip `JSXExpressionContainer` nodes whose expression is empty.
4. Skip empty string expressions (`{""}`), which produce no DOM node.
5. Collect everything else.

## Parameters

| Parameter | Type                     | Description                           |
| --------- | ------------------------ | ------------------------------------- |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`JSXChild`[]

The children nodes that contribute to rendered output.
