[@eslint-react/eff](../README.md) / tryAddToSet

# Function: tryAddToSet()

```ts
function tryAddToSet<T>(set: Set<T>, value: T): boolean;
```

Attempts to add a value to a Set, but only if it doesn't already exist.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `set` | [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<`T`\> | The Set to potentially add to. |
| `value` | `T` | The value to add if it doesn't already exist in the Set. |

## Returns

`boolean`

`true` if the value was added, `false` if it already existed.
