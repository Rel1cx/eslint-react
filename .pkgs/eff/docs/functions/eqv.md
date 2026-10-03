[@local/eff](../README.md) / eqv

# Function: eqv()

```ts
function eqv<T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
```

Creates a predicate that returns `true` when both predicates agree on the result.

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

A predicate with equivalence semantics.

(`data`: `T`) => `boolean`
