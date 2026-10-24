[@eslint-react/core](../README.md) / isFunctionComponentWrapperCall

# Function: isFunctionComponentWrapperCall()

```ts
function isFunctionComponentWrapperCall(context: RuleContext, node: CallExpression): boolean;
```

Check if the node is a call expression for a component wrapper.

## Parameters

| Parameter | Type             | Description              |
| --------- | ---------------- | ------------------------ |
| `context` | `RuleContext`    | The ESLint rule context. |
| `node`    | `CallExpression` | The node to check.       |

## Returns

`boolean`

`true` if the node is a call expression for a component wrapper.
