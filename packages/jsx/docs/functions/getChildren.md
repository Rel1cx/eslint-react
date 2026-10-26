[@eslint-react/jsx](../README.md) / getChildren

# Function: getChildren()

```ts
function getChildren(element: TSESTreeJSXElementLike): JSXChild[];
```

Get the children of a JSX element or fragment after removing syntactic JSX
artifacts: padding whitespace, empty expression containers, and empty string
literal expressions.

Same-line whitespace is kept because it renders as a text node. This is a
syntactic filter, not a runtime-rendering guarantee: `{null}`, `{false}`, and
other expressions that may render nothing are kept.

## Parameters

| Parameter | Type                     | Description                           |
| --------- | ------------------------ | ------------------------------------- |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`JSXChild`[]

The children that remain after removing padding artifacts.
