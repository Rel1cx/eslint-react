[@eslint-react/core](../README.md) / isRenderMethodCallback

# Function: isRenderMethodCallback()

```ts
function isRenderMethodCallback(node: TSESTreeFunction): boolean;
```

Check if the function is a callback passed to a class component's render method.

## Parameters

| Parameter | Type               | Description                 |
| --------- | ------------------ | --------------------------- |
| `node`    | `TSESTreeFunction` | The function node to check. |

## Returns

`boolean`

`true` if the function is a render method callback.
