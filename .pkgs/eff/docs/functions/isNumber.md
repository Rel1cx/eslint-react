[@local/eff](../README.md) / isNumber

# Function: isNumber()

```ts
function isNumber(data: unknown): data is number;
```

A function that checks if the passed parameter is a number and narrows its type accordingly.

Note: `NaN` and `Infinity` are considered numbers by this check.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is number`

True if the passed input is a number, false otherwise.
