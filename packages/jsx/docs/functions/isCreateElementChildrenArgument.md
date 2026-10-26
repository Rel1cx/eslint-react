[@eslint-react/jsx](../README.md) / isCreateElementChildrenArgument

# Function: isCreateElementChildrenArgument()

```ts
function isCreateElementChildrenArgument(context: RuleContext, node: Node | null | undefined): boolean;
```

Check if the node is passed as a children argument (the third argument or
later) of a `createElement` call.

## Parameters

| Parameter | Type                            | Description              |
| --------- | ------------------------------- | ------------------------ |
| `context` | `RuleContext`                   | The ESLint rule context. |
| `node`    | `Node` \| `null` \| `undefined` | The node to check.       |

## Returns

`boolean`

`true` if the node is a direct children argument of a `createElement` call.
