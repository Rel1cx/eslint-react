[@eslint-react/core](../README.md) / isHookCall

# Function: isHookCall()

```ts
function isHookCall(node: Node | null): node is CallExpression;
```

Check if the given node is a React Hook call by its name.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `null` | The node to check. |

## Returns

`node is CallExpression`

`true` if the node is a React Hook call, `false` otherwise.
