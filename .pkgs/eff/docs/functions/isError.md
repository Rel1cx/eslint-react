[@local/eff](../README.md) / isError

# Function: isError()

```ts
function isError(data: unknown): data is Error;
```

A function that checks if the passed parameter is an `Error` and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is Error`

True if the passed input is an `Error`, false otherwise.
