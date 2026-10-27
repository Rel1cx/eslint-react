[@eslint-react/jsx](../README.md) / isEmptyExpressionContainer

# Function: isEmptyExpressionContainer()

```ts
function isEmptyExpressionContainer(node: Node | null | undefined): boolean;
```

Check if the node is an empty expression container (`{}`, `{/* comment */}`).

An empty `JSXExpressionContainer` holds no expression, so it produces no DOM
node and is treated as non-rendered content, same as whitespace padding.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`boolean`

`true` if the node is an empty `JSXExpressionContainer`.

## Remarks

This is a content predicate, not a type guard: a `false` result does not
mean the node is not a `JSXExpressionContainer`.
