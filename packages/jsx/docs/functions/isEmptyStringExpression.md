[@eslint-react/jsx](../README.md) / isEmptyStringExpression

# Function: isEmptyStringExpression()

```ts
function isEmptyStringExpression(node: Node | null | undefined): node is JSXExpressionContainer;
```

Check if the node is an empty string literal expression (`{""}`).

Only a literal empty string matches; template literals and other expressions
that happen to evaluate to `""` are not evaluated by this predicate.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`node is JSXExpressionContainer`

`true` if the node is a `{""}` expression container.
