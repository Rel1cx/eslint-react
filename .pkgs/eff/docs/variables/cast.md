[@local/eff](../README.md) / cast

# Variable: cast

```ts
const cast: <A, B>(a: A) => B;
```

Returns the input value with a different static type.

**When to use**

Use when you need an explicit type-level cast and accept that the value is
returned unchanged at runtime.

**Gotchas**

This is a type-level cast only; it performs no runtime validation or
conversion.

## Type Parameters

| Type Parameter |
| -------------- |
| `A`            |
| `B`            |

## Parameters

| Parameter | Type |
| --------- | ---- |
| `a`       | `A`  |

## Returns

`B`

## See

[satisfies](../functions/satisfies.md) for checking assignability without changing the resulting type

## Since

4.0.0
