[@eslint-react/core](../README.md) / isUseEffectLikeCall

# Function: isUseEffectLikeCall()

```ts
function isUseEffectLikeCall(node: Node | null, additionalEffectHooks?: RegExpLike): node is CallExpression;
```

Check if the node is a useEffect-like call (ex: `useEffect`, `useLayoutEffect`, or a custom effect hook).

## Parameters

| Parameter               | Type             | Description                                                                 |
| ----------------------- | ---------------- | --------------------------------------------------------------------------- |
| `node`                  | `Node` \| `null` | The AST node to check.                                                      |
| `additionalEffectHooks` | `RegExpLike`     | Regex pattern matching custom hooks that should be treated as effect hooks. |

## Returns

`node is CallExpression`

`true` if the node is a useEffect-like call.
