[@eslint-react/jsx](../README.md) / hasChildren

# Function: hasChildren()

```ts
function hasChildren(element: TSESTreeJSXElementLike): boolean;
```

Check if the element has at least one meaningful child, that is, a child that
is not purely whitespace text or an empty string expression (`{""}`).

Unlike [getChildren](getChildren.md) (which only filters whitespace containing a newline),
this check treats any whitespace-only text as non-meaningful, so `hasChildren(node)`
is not always equal to `getChildren(node).length > 0` (ex: `<div> </div>`).

## Parameters

| Parameter | Type                     | Description                           |
| --------- | ------------------------ | ------------------------------------- |
| `element` | `TSESTreeJSXElementLike` | A `JSXElement` or `JSXFragment` node. |

## Returns

`boolean`

`true` if the element has at least one meaningful child.
