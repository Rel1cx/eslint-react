[@eslint-react/core](../README.md) / isFunctionOfUseEffectCleanup

# Function: isFunctionOfUseEffectCleanup()

```ts
function isFunctionOfUseEffectCleanup(node: Node | undefined): boolean;
```

Determines if a node is the cleanup function returned by a useEffect-like hook's setup function.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `undefined` | The AST node to check |

## Returns

`boolean`
