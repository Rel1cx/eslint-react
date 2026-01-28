[@eslint-react/eff](../README.md) / isObject

# Function: isObject()

```ts
function isObject<T>(data: object | T): data is NarrowedTo<T, object>;
```

Check if the given parameter is of type `"object"` via `typeof`, excluding `null`.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `data` | `object` \| `T` | The variable to be checked for being an object type. |

## Returns

`data is NarrowedTo<T, object>`

The input type, narrowed to only objects.
