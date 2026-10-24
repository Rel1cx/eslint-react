[@eslint-react/core](../README.md) / isUseStateLikeCall

# Function: isUseStateLikeCall()

```ts
function isUseStateLikeCall(node: CallExpression, additionalStateHooks?: RegExpLike): boolean;
```

Check if the node is a useState-like call (ex: `useState` or a custom state hook).

## Parameters

| Parameter               | Type             | Description                                                                |
| ----------------------- | ---------------- | -------------------------------------------------------------------------- |
| `node`                  | `CallExpression` | The AST node to check.                                                     |
| `additionalStateHooks?` | `RegExpLike`     | Regex pattern matching custom hooks that should be treated as state hooks. |

## Returns

`boolean`

`true` if the node is a useState-like call.
