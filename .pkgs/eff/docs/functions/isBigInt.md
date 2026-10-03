[@local/eff](../README.md) / isBigInt

# Function: isBigInt()

```ts
function isBigInt(data: unknown): data is bigint;
```

A function that checks if the passed parameter is a bigint and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is bigint`

True if the passed input is a bigint, false otherwise.
