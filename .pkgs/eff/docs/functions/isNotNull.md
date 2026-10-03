[@local/eff](../README.md) / isNotNull

# Function: isNotNull()

```ts
function isNotNull<T>(data: T): data is Exclude<T, null>;
```

A refinement that checks if the passed parameter is not `null`, preserving other falsy values.

## Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

## Parameters

| Parameter | Type | Description            |
| --------- | ---- | ---------------------- |
| `data`    | `T`  | The variable to check. |

## Returns

`data is Exclude<T, null>`

True if the passed input is not `null`, false otherwise.
