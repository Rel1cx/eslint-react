[@eslint-react/core](../README.md) / isUseEffectLikeCall

# Function: isUseEffectLikeCall()

```ts
function isUseEffectLikeCall(node: CallExpression, additionalEffectHooks?: RegExpLike): boolean;
```

Check if the node is a useEffect-like call (ex: `useEffect`, `useLayoutEffect`, or a custom effect hook).

## Parameters

| Parameter                | Type             | Description                                                                 |
| ------------------------ | ---------------- | --------------------------------------------------------------------------- |
| `node`                   | `CallExpression` | The AST node to check.                                                      |
| `additionalEffectHooks?` | `RegExpLike`     | Regex pattern matching custom hooks that should be treated as effect hooks. |

## Returns

`boolean`

`true` if the node is a useEffect-like call.
