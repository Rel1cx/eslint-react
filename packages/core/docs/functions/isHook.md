[@eslint-react/core](../README.md) / isHook

# Function: isHook()

```ts
function isHook(node: TSESTreeFunction | null): boolean;
```

Determine if a function node is a React Hook based on its name.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `TSESTreeFunction` \| `null` | The function node to check |

## Returns

`boolean`

True if the function is a React Hook, false otherwise
