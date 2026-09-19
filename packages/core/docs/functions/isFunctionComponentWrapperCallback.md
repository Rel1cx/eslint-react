[@eslint-react/core](../README.md) / isFunctionComponentWrapperCallback

# Function: isFunctionComponentWrapperCallback()

```ts
function isFunctionComponentWrapperCallback(context: RichContext, node: Node): boolean;
```

Check if the node is a callback function passed to a component wrapper.

## Parameters

| Parameter | Type                                            | Description            |
| --------- | ----------------------------------------------- | ---------------------- |
| `context` | [`RichContext`](../type-aliases/RichContext.md) | The rich rule context. |
| `node`    | `Node`                                          | The node to check.     |

## Returns

`boolean`

`true` if the node is a callback function passed to a component wrapper.
