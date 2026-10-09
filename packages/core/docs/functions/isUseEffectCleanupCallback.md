[@eslint-react/core](../README.md) / isUseEffectCleanupCallback

# Function: isUseEffectCleanupCallback()

```ts
function isUseEffectCleanupCallback(node: Node | null): boolean;
```

Check if the node is the cleanup callback returned by a useEffect-like setup callback.

## Parameters

| Parameter | Type             | Description            |
| --------- | ---------------- | ---------------------- |
| `node`    | `Node` \| `null` | The AST node to check. |

## Returns

`boolean`

`true` if the node is a useEffect cleanup callback.
