[@eslint-react/eff](../README.md) / isArray

# Function: isArray()

```ts
function isArray<T>(data: T | ArrayLike<unknown>): data is NarrowedTo<T, readonly unknown[]>;
```

A function that checks if the passed parameter is an Array and narrows its type accordingly.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `T` \| `ArrayLike`\<`unknown`\> | The variable to check. |

## Returns

`data is NarrowedTo<T, readonly unknown[]>`

True if the passed input is an Array, false otherwise. s
