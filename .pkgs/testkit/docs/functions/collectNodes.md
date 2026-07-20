[@local/testkit](../README.md) / collectNodes

# Function: collectNodes()

```ts
function collectNodes<T>(
  code: string,
  type: T["type"],
  options?: ParseCodeOptions,
): T[];
```

## Type Parameters

| Type Parameter       |
| -------------------- |
| `T` _extends_ `Node` |

## Parameters

| Parameter | Type                                                    |
| --------- | ------------------------------------------------------- |
| `code`    | `string`                                                |
| `type`    | `T`\[`"type"`\]                                         |
| `options` | [`ParseCodeOptions`](../interfaces/ParseCodeOptions.md) |

## Returns

`T`[]
