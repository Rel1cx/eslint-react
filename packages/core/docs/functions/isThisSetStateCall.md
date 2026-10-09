[@eslint-react/core](../README.md) / isThisSetStateCall

# ~~Function: isThisSetStateCall()~~

```ts
function isThisSetStateCall(node: CallExpression): boolean;
```

Check if the call expression is a `this.setState(...)` call.

## Parameters

| Parameter | Type             | Description                        |
| --------- | ---------------- | ---------------------------------- |
| `node`    | `CallExpression` | The call expression node to check. |

## Returns

`boolean`

`true` if the node is a `this.setState(...)` call.

## Deprecated

Class components are legacy. This function exists only to support legacy rules.
