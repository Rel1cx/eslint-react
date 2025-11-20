[@eslint-react/core](../README.md) / isUseEffectLikeCall

# Function: isUseEffectLikeCall()

```ts
function isUseEffectLikeCall(node: Node | undefined): boolean;
```

Detects useEffect calls and variations (useLayoutEffect, etc.) using regex pattern.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `undefined` | The AST node to check |

## Returns

`boolean`

True if the node is a useEffect-like call
