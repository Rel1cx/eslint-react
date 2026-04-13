[@eslint-react/core](../README.md) / isHookDefinition

# Function: isHookDefinition()

```ts
function isHookDefinition(node: FunctionExpression | null): boolean;
```

Determine if a function node is a React Hook based on its name.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `FunctionExpression` \| `null` | The function node to check |

## Returns

`boolean`

True if the function is a React Hook, false otherwise
