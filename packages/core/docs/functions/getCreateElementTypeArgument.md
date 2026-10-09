[@eslint-react/core](../README.md) / getCreateElementTypeArgument

# Function: getCreateElementTypeArgument()

```ts
function getCreateElementTypeArgument(context: RuleContext, node: Node | null): CallExpressionArgument | null;
```

Get the type argument (the first argument) of a `createElement` call.

## Parameters

| Parameter | Type             | Description              |
| --------- | ---------------- | ------------------------ |
| `context` | `RuleContext`    | The ESLint rule context. |
| `node`    | `Node` \| `null` | The node to inspect.     |

## Returns

`CallExpressionArgument` \| `null`

The type argument, or `null` when the node is not a `createElement` call or has no arguments.
