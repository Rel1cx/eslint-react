[@eslint-react/core](../README.md) / isUseRefLikeCall

# Function: isUseRefLikeCall()

```ts
function isUseRefLikeCall(node: CallExpression, additionalRefHooks?: RegExpLike): boolean;
```

Check if the node is a useRef-like call (ex: `useRef` or a custom ref hook).

## Parameters

| Parameter             | Type             | Description                                                              |
| --------------------- | ---------------- | ------------------------------------------------------------------------ |
| `node`                | `CallExpression` | The AST node to check.                                                   |
| `additionalRefHooks?` | `RegExpLike`     | Regex pattern matching custom hooks that should be treated as ref hooks. |

## Returns

`boolean`

`true` if the node is a useRef-like call.
