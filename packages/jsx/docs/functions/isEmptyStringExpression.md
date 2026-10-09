[@eslint-react/jsx](../README.md) / isEmptyStringExpression

# Function: isEmptyStringExpression()

```ts
function isEmptyStringExpression(node: JSXChild): boolean;
```

Check if the node is an empty string expression (`{""}`).

React's reconciler and SSR renderer explicitly skip empty strings, producing no
DOM node, so such expressions are treated as non-rendered children, same as
whitespace padding.

## Parameters

| Parameter | Type       | Description                  |
| --------- | ---------- | ---------------------------- |
| `node`    | `JSXChild` | The JSX child node to check. |

## Returns

`boolean`

`true` if the node is a `{""}` expression container.
