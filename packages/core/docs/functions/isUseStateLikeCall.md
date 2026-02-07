[@eslint-react/core](../README.md) / isUseStateLikeCall

# Function: isUseStateLikeCall()

```ts
function isUseStateLikeCall(node: Node | undefined, additionalStateHooks?: RegExpLike): node is CallExpression;
```

Detect useState calls and variations (useCustomState, etc.) using a regex pattern

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `node` | `Node` \| `undefined` | The AST node to check |
| `additionalStateHooks` | `RegExpLike` | Regex pattern matching custom hooks that should be treated as state hooks |

## Returns

`node is CallExpression`

True if the node is a useState-like call
