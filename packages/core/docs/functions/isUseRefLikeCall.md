[@eslint-react/core](../README.md) / isUseRefLikeCall

# Function: isUseRefLikeCall()

```ts
function isUseRefLikeCall(node: Node | null, additionalRefHooks?: RegExpLike): node is CallExpression;
```

Check if the node is a useRef-like call (ex: `useRef` or a custom ref hook).

## Parameters

| Parameter            | Type             | Description                                                              |
| -------------------- | ---------------- | ------------------------------------------------------------------------ |
| `node`               | `Node` \| `null` | The AST node to check.                                                   |
| `additionalRefHooks` | `RegExpLike`     | Regex pattern matching custom hooks that should be treated as ref hooks. |

## Returns

`node is CallExpression`

`true` if the node is a useRef-like call.
