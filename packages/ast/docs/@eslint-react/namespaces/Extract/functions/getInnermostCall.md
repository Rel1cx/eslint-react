[@eslint-react/ast](../../../../README.md) / [Extract](../README.md) / getInnermostCall

# Function: getInnermostCall()

```ts
function getInnermostCall(node: CallExpression): CallExpression;
```

Unwrap curried call wrappers like `connect(...)(Component)` to get the innermost call expression.
Type expressions and chain expressions around each callee are unwrapped along the way.

## Parameters

| Parameter | Type             | Description                               |
| --------- | ---------------- | ----------------------------------------- |
| `node`    | `CallExpression` | The outermost call expression to inspect. |

## Returns

`CallExpression`

The innermost call expression, whose callee is not itself a call expression.
