[@eslint-react/core](../README.md) / isReactHookCall

# Function: isReactHookCall()

```ts
function isReactHookCall(node: Node | undefined): node is CallExpression;
```

Check if the given node is a React Hook call by its name.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `undefined` | The node to check. |

## Returns

`node is CallExpression`

`true` if the node is a React Hook call, `false` otherwise.
