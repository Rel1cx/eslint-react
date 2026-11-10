[@eslint-react/jsx](../README.md) / isEmptyExpressionContainer

# Function: isEmptyExpressionContainer()

```ts
function isEmptyExpressionContainer(node: Node | null | undefined): boolean;
```

Check if the node is an empty expression container (`{}`, `{ }`,
`{/* comment */}`), including multiline and TypeScript directive comments.

It holds a `JSXEmptyExpression`, so it renders nothing, like whitespace
padding. A comment attached to a real expression (`{/* comment */} null`) is
not empty.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`boolean`

`true` if the node is an empty `JSXExpressionContainer`.

## Remarks

A content predicate, not a type guard: `false` does not mean the node is not
a `JSXExpressionContainer`.
