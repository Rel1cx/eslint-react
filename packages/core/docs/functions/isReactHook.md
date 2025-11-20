[@eslint-react/core](../README.md) / isReactHook

# Function: isReactHook()

```ts
function isReactHook(node: TSESTreeFunction | undefined): boolean;
```

Determines if a function node is a React Hook based on its name.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `TSESTreeFunction` \| `undefined` | The function node to check |

## Returns

`boolean`

True if the function is a React Hook, false otherwise
