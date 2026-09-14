[@eslint-react/core](../README.md) / isCreateElementChildrenArgument

# Function: isCreateElementChildrenArgument()

```ts
function isCreateElementChildrenArgument(context: RichContext, node: Node): boolean;
```

Check if the node is passed as a children argument (the third argument or
later) of a `createElement` call.

## Parameters

| Parameter | Type                                            | Description            |
| --------- | ----------------------------------------------- | ---------------------- |
| `context` | [`RichContext`](../type-aliases/RichContext.md) | The rich rule context. |
| `node`    | `Node`                                          | The node to check.     |

## Returns

`boolean`

`true` if the node is a direct children argument of a `createElement` call.
