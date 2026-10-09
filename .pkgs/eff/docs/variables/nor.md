[@local/eff](../README.md) / nor

# Variable: nor

```ts
const nor: {
<T>  (b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
<T>  (a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
};
```

Creates a predicate that returns `true` when neither predicate is `true`.

**When to use**

Use when you want to combine two `Predicate`s with logical NOR semantics.

**Details**

Returns the negation of `or`.

**Example** (Checking NOR conditions)

```ts
import { Predicate } from "effect"

const neither = Predicate.nor(Predicate.isString, Predicate.isNumber)

neither(true) // => true
```

## Call Signature

```ts
<T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `b` | (`data`: `T`) => `boolean` |

### Returns

(`a`: (`data`: `T`) => `boolean`) => (`data`: `T`) => `boolean`

## Call Signature

```ts
<T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | (`data`: `T`) => `boolean` |
| `b` | (`data`: `T`) => `boolean` |

### Returns

(`data`: `T`) => `boolean`

## See

 - [or](or.md)
 - [not](../functions/not.md)

## Since

2.0.0
