[@local/testkit](../README.md) / getTextOf

# Function: getTextOf()

```ts
function getTextOf(code: string, node: Node): string;
```

Returns the source text covered by `node`'s range.

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `code` | `string` | The source text `node` was parsed from. |
| `node` | `Node` | The node whose text to read. |

## Returns

`string`

The slice of `code` covered by `node`.
