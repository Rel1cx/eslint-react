[@local/eff](../README.md) / isSet

# Function: isSet()

```ts
function isSet(data: unknown): data is Set<unknown>;
```

A function that checks if the passed parameter is a `Set` and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is Set<unknown>`

True if the passed input is a `Set`, false otherwise.
