[@eslint-react/jsx](../README.md) / getChildren

# Function: getChildren()

```ts
function getChildren(element: TSESTreeJSXElementLike): JSXChild[];
```

Get the meaningful children of a JSX element or fragment

Mirrors Babel's `buildChildren` helper:

1. Iterate over `element.children`.
2. Skip `JSXText` nodes that clean to nothing (padding whitespace).
3. Skip `JSXExpressionContainer` nodes whose expression is empty.
4. Skip `JSXEmptyExpression` nodes.
5. Collect everything else.

## Parameters

| Parameter | Type                     | Description                          |
| --------- | ------------------------ | ------------------------------------ |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node |

## Returns

`JSXChild`[]

An array of children nodes that contribute to rendered output
