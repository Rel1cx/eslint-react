[@eslint-react/core](../README.md) / isFunctionComponentWrapperCall

# Function: isFunctionComponentWrapperCall()

```ts
function isFunctionComponentWrapperCall(context: RichContext, node: Node): boolean;
```

Check if the node is a call expression for a component wrapper.

## Parameters

| Parameter | Type                                            | Description            |
| --------- | ----------------------------------------------- | ---------------------- |
| `context` | [`RichContext`](../type-aliases/RichContext.md) | The rich rule context. |
| `node`    | `Node`                                          | The node to check.     |

## Returns

`boolean`

`true` if the node is a call expression for a component wrapper.
