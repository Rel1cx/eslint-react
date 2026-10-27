[@eslint-react/jsx](../README.md) / isEmptyStringExpression

# Function: isEmptyStringExpression()

```ts
function isEmptyStringExpression(node: Node | null | undefined): boolean;
```

Check if the node is an empty string literal expression (`{""}`).

Only a literal empty string matches; template literals and other expressions
that happen to evaluate to `""` are not evaluated by this predicate.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`boolean`

`true` if the node is an expression container holding an empty string literal.

## Remarks

This is a content predicate, not a type guard: a `false` result does not
mean the node is not a `JSXExpressionContainer`.
