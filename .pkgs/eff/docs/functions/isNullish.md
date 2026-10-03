[@local/eff](../README.md) / isNullish

# Function: isNullish()

```ts
function isNullish<T>(data: T): data is T & (null | undefined);
```

A function that checks if the passed parameter is `null` or `undefined` and narrows its type accordingly.

## Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

## Parameters

| Parameter | Type | Description            |
| --------- | ---- | ---------------------- |
| `data`    | `T`  | The variable to check. |

## Returns

data is T & (null \| undefined)

True if the passed input is nullish, false otherwise.
