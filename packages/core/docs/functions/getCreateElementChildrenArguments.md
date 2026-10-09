[@eslint-react/core](../README.md) / getCreateElementChildrenArguments

# Function: getCreateElementChildrenArguments()

```ts
function getCreateElementChildrenArguments(context: RuleContext, node: Node | null): CallExpressionArgument[];
```

Get the children arguments (the arguments after the props object) of a `createElement` call.

## Parameters

| Parameter | Type             | Description              |
| --------- | ---------------- | ------------------------ |
| `context` | `RuleContext`    | The ESLint rule context. |
| `node`    | `Node` \| `null` | The node to inspect.     |

## Returns

`CallExpressionArgument`[]

The children arguments, or an empty array when the node is not a `createElement` call.
