[@eslint-react/core](../README.md) / isUseStateLikeCall

# Function: isUseStateLikeCall()

```ts
function isUseStateLikeCall(node: Node | null, additionalStateHooks?: RegExpLike): node is CallExpression;
```

Check if the node is a useState-like call (ex: `useState` or a custom state hook).

## Parameters

| Parameter              | Type             | Description                                                                |
| ---------------------- | ---------------- | -------------------------------------------------------------------------- |
| `node`                 | `Node` \| `null` | The AST node to check.                                                     |
| `additionalStateHooks` | `RegExpLike`     | Regex pattern matching custom hooks that should be treated as state hooks. |

## Returns

`node is CallExpression`

`true` if the node is a useState-like call.
