[@eslint-react/core](../README.md) / isUseEffectSetupCallback

# Function: isUseEffectSetupCallback()

```ts
function isUseEffectSetupCallback(node: Node): boolean;
```

Check if the node is the setup callback passed to a useEffect-like call.

## Parameters

| Parameter | Type   | Description            |
| --------- | ------ | ---------------------- |
| `node`    | `Node` | The AST node to check. |

## Returns

`boolean`

`true` if the node is a useEffect setup callback.
