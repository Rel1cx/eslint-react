[@local/eff](../README.md) / xor

# Function: xor()

```ts
function xor<T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
```

Creates a predicate that returns `true` if exactly one of the two predicates is `true`.

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

A predicate with exclusive-or semantics.

(`data`: `T`) => `boolean`
