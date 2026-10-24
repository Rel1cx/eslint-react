[@eslint-react/core](../README.md) / isHookCall

# Function: isHookCall()

```ts
function isHookCall(node: CallExpression): boolean;
```

Check if the node is a React Hook call by its name.

## Parameters

| Parameter | Type             | Description        |
| --------- | ---------------- | ------------------ |
| `node`    | `CallExpression` | The node to check. |

## Returns

`boolean`

`true` if the node is a React Hook call, `false` otherwise.
