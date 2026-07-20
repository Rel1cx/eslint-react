[@local/testkit](../README.md) / getFirstNodeOfType

# Function: getFirstNodeOfType()

```ts
function getFirstNodeOfType<T>(
  code: string,
  type: T["type"],
  options?: ParseCodeOptions,
): T;
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

`T`
