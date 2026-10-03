[@local/eff](../README.md) / isDate

# Function: isDate()

```ts
function isDate(data: unknown): data is Date;
```

A function that checks if the passed parameter is a `Date` and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is Date`

True if the passed input is a `Date`, false otherwise.
