[@local/eff](../README.md) / isNotNullish

# Function: isNotNullish()

```ts
function isNotNullish<T>(data: T): data is NonNullable<T>;
```

A refinement that checks if the passed parameter is not `null` and not `undefined`, keeping other falsy values.

## Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

## Parameters

| Parameter | Type | Description            |
| --------- | ---- | ---------------------- |
| `data`    | `T`  | The variable to check. |

## Returns

`data is NonNullable<T>`

True if the passed input is not nullish, false otherwise.
