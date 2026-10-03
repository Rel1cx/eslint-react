[@local/eff](../README.md) / isMap

# Function: isMap()

```ts
function isMap(data: unknown): data is Map<unknown, unknown>;
```

A function that checks if the passed parameter is a `Map` and narrows its type accordingly.

## Parameters

| Parameter | Type      | Description            |
| --------- | --------- | ---------------------- |
| `data`    | `unknown` | The variable to check. |

## Returns

`data is Map<unknown, unknown>`

True if the passed input is a `Map`, false otherwise.
