[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / getCalleeName

# Function: getCalleeName()

```ts
function getCalleeName(node: CallExpression): string | null;
```

Get the name of the callee of a call expression.

## Parameters

| Parameter | Type             | Description                     |
| --------- | ---------------- | ------------------------------- |
| `node`    | `CallExpression` | The call expression to inspect. |

## Returns

`string` \| `null`

The callee name (ex: `"useState"`), or `null` when it cannot be statically determined.
