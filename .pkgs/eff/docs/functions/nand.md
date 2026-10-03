[@local/eff](../README.md) / nand

# Function: nand()

```ts
function nand<T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
```

Creates a predicate that returns `true` unless both predicates are `true`.

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

The negation of `and` applied to the two predicates.

(`data`: `T`) => `boolean`
