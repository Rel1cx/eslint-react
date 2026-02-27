[@eslint-react/eff](../README.md) / isTruthy

# Function: isTruthy()

```ts
function isTruthy<T>(data: T): data is Exclude<T, false | "" | 0 | null | undefined>;
```

A function that checks if the passed parameter is truthy and narrows its type accordingly.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` | The variable to check. |

## Returns

data is Exclude\<T, false \| "" \| 0 \| null \| undefined\>

True if the passed input is truthy, false otherwise.
