[@local/eff](../README.md) / eqv

# Variable: eqv

```ts
const eqv: {
<T>  (b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
<T>  (a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
};
```

Creates a predicate that returns `true` when both predicates agree.

**When to use**

Use when you want to check equivalence of two `Predicate`s.

**Details**

Returns `true` when both results are equal.

Results are compared with strict equality (`===`) on the predicates' raw
return values, so both predicates must return strict booleans; non-boolean
truthy/falsy returns (e.g. `s => s.length`) are not coerced and can violate
equivalence semantics.

**Example** (Defining equivalence)

```ts
import { Predicate } from "effect"

const isEven = (n: number) => n % 2 === 0
const same = Predicate.eqv(isEven, isEven)

same(3) // => true
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

[xor](xor.md)

## Since

2.0.0
