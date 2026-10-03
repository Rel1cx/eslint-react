[@local/eff](../README.md) / isNotUndefined

# Function: isNotUndefined()

```ts
function isNotUndefined<T>(data: T): data is Exclude<T, undefined>;
```

A refinement that checks if the passed parameter is not `undefined`, preserving other falsy values.

## Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

## Parameters

| Parameter | Type | Description            |
| --------- | ---- | ---------------------- |
| `data`    | `T`  | The variable to check. |

## Returns

`data is Exclude<T, undefined>`

True if the passed input is not `undefined`, false otherwise.
