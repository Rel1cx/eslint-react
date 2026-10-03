[@local/eff](../README.md) / isUndefined

# Function: isUndefined()

```ts
function isUndefined(data: unknown): data is undefined;
```

A function that checks if the passed parameter is `undefined` and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is undefined`

True if the passed input is `undefined`, false otherwise.
