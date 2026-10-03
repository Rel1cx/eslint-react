[@local/eff](../README.md) / nor

# Function: nor()

```ts
function nor<T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
```

Creates a predicate that returns `true` when neither predicate is `true`.

## Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

## Parameters

| Parameter | Type                       | Description           |
| --------- | -------------------------- | --------------------- |
| `a`       | (`data`: `T`) => `boolean` | The first predicate.  |
| `b`       | (`data`: `T`) => `boolean` | The second predicate. |

## Returns

The negation of `or` applied to the two predicates.

(`data`: `T`) => `boolean`
