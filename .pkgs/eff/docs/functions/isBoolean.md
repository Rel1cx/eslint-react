[@local/eff](../README.md) / isBoolean

# Function: isBoolean()

```ts
function isBoolean(data: unknown): data is boolean;
```

A function that checks if the passed parameter is a boolean and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is boolean`

True if the passed input is a boolean, false otherwise.
