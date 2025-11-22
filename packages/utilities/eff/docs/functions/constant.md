[@eslint-react/eff](../README.md) / constant

# Function: constant()

```ts
function constant<T>(x: T): () => T;
```

Returns a function that always returns the same value.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `x` | `T` | The value to return. |

## Returns

```ts
(): T;
```

### Returns

`T`
