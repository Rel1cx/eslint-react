[@local/testkit](../README.md) / getFirstNodeOfType

# Function: getFirstNodeOfType()

```ts
function getFirstNodeOfType<T extends Node>(
   input: string | Node, 
   type: T["type"], 
   options?: ParseCodeOptions
): T;
```

Returns the first node of the given `type` under `input`.

## Type Parameters

| Type Parameter |
| ------ |
| `T` *extends* `Node` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `input` | `string` \| `Node` | Source code or an AST node to search. |
| `type` | `T`\[`"type"`\] | The node type to find. |
| `options` | [`ParseCodeOptions`](../interfaces/ParseCodeOptions.md) | Parser options, only used when `input` is a string. |

## Returns

`T`

The first matching node in traversal order.
