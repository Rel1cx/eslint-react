[@local/eff](../README.md) / xor

# Variable: xor

```ts
const xor: {
  <T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
  <T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
};
```

Creates a predicate that returns `true` if exactly one predicate is `true`.

**When to use**

Use when you want to combine two `Predicate`s with exclusive-or semantics.

**Details**

Returns `true` when results differ.

**Example** (Checking exclusive-or conditions)

```ts
import { Predicate } from "effect";

const isEven = (n: number) => n % 2 === 0;
const isPositive = (n: number) => n > 0;
const either = Predicate.xor(isEven, isPositive);

either(-2); // => true
```

## Call Signature

```ts
<T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
```

### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

### Parameters

| Parameter | Type                       |
| --------- | -------------------------- |
| `b`       | (`data`: `T`) => `boolean` |

### Returns

(`a`: (`data`: `T`) => `boolean`) => (`data`: `T`) => `boolean`

## Call Signature

```ts
<T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
```

### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

### Parameters

| Parameter | Type                       |
| --------- | -------------------------- |
| `a`       | (`data`: `T`) => `boolean` |
| `b`       | (`data`: `T`) => `boolean` |

### Returns

(`data`: `T`) => `boolean`

## See

- [or](or.md)
- [and](and.md)

## Since

2.0.0
