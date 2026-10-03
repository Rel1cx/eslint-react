[@local/testkit](../README.md) / collectNodes

# Function: collectNodes()

```ts
function collectNodes<T extends Node>(input: string | Node, type: T["type"], options?: ParseCodeOptions): T[];
```

Collects every node of the given `type` under `input`.
When `input` is a string it is parsed with `parseCode` (`options` apply);
when it is a node its subtree is traversed as-is (`options` are ignored)
and existing parent pointers are left untouched.

## Type Parameters

| Type Parameter       |
| -------------------- |
| `T` _extends_ `Node` |

## Parameters

| Parameter | Type                                                    | Description                                         |
| --------- | ------------------------------------------------------- | --------------------------------------------------- |
| `input`   | `string` \| `Node`                                      | Source code or an AST node to search.               |
| `type`    | `T`\[`"type"`\]                                         | The node type to collect.                           |
| `options` | [`ParseCodeOptions`](../interfaces/ParseCodeOptions.md) | Parser options, only used when `input` is a string. |

## Returns

`T`[]

The matching nodes in traversal order.
