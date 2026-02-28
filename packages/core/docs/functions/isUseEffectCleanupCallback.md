[@eslint-react/core](../README.md) / isUseEffectCleanupCallback

# Function: isUseEffectCleanupCallback()

```ts
function isUseEffectCleanupCallback(node: Node | null): boolean;
```

Determine if a node is the cleanup function returned by a useEffect-like hook's setup function

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `null` | The AST node to check |

## Returns

`boolean`
