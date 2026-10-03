[@local/eff](../README.md) / isString

# Function: isString()

```ts
function isString(data: unknown): data is string;
```

A function that checks if the passed parameter is a string and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is string`

True if the passed input is a string, false otherwise.
