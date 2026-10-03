[@local/eff](../README.md) / isNull

# Function: isNull()

```ts
function isNull(data: unknown): data is null;
```

A function that checks if the passed parameter is `null` and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is null`

True if the passed input is `null`, false otherwise.
