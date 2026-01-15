[@eslint-react/core](../README.md) / isUseEffectLikeCall

# Function: isUseEffectLikeCall()

```ts
function isUseEffectLikeCall(node: Node | undefined, additionalEffectHooks: RegExpLike): node is CallExpression;
```

Detects useEffect calls and variations (useLayoutEffect, etc.) using regex pattern.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `undefined` | The AST node to check |
| `additionalEffectHooks` | `RegExpLike` | Regex pattern matching custom hooks that should be treated as effect hooks |

## Returns

`node is CallExpression`

True if the node is a useEffect-like call
