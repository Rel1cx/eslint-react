[@eslint-react/core](../README.md) / isHookDefinition

# Function: isHookDefinition()

```ts
function isHookDefinition(node: TSESTreeFunction | null): boolean;
```

Check if the function node is a hook definition based on its name.

## Parameters

| Parameter | Type                         | Description                 |
| --------- | ---------------------------- | --------------------------- |
| `node`    | `TSESTreeFunction` \| `null` | The function node to check. |

## Returns

`boolean`

`true` if the function is a hook definition.
