[@eslint-react/jsx](../README.md) / isEmptyStringExpression

# Function: isEmptyStringExpression()

```ts
function isEmptyStringExpression(node: Node | null | undefined): boolean;
```

Check if the node is an empty string literal expression (`{""}`, `{''}`).

Node-shape check, not an evaluation: TS wrappers (`{"" as string}`, `{""!}`,
`{"" satisfies string}`), template literals (` {`} `, ` {`${''}`} ``), and
calls (`{String("")}`) do not match even though their runtime value is `""`;
only `value === ""` matches, so `{0}`, `{false}`, and `{NaN}` do not. A comment
attached to the literal does not affect the result.

## Parameters

| Parameter | Type                            | Description        |
| --------- | ------------------------------- | ------------------ |
| `node`    | `Node` \| `null` \| `undefined` | The node to check. |

## Returns

`boolean`

`true` if the node holds a bare empty string literal.

## Remarks

A content predicate, not a type guard: `false` does not mean the node is not
a `JSXExpressionContainer`.
