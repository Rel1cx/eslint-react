[@local/eff](../README.md) / or

# Variable: or

```ts
const or: {
  <T, U>(b: (data: T) => data is U): <S>(a: (data: T) => data is S) => (data: T) => data is U | S;
  <T>(b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
  <T, S, U>(a: (data: T) => data is S, b: (data: T) => data is U): (data: T) => data is S | U;
  <T, S>(a: (data: T) => data is S, b: (data: T) => boolean): (data: T) => data is S;
  <T, U>(a: (data: T) => boolean, b: (data: T) => data is U): (data: T) => data is U;
  <T>(a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
};
```

Creates a predicate that returns `true` if either predicate is `true`.

**When to use**

Use when you want to combine `Predicate`s with OR, accepting values that
satisfy at least one condition, including refinements that narrow to a union.

**Details**

Evaluation short-circuits on the first `true`. For refinements, the output
type is a union.

**Example** (Checking either condition)

```ts
import { Predicate } from "effect";

const isStringOrNumber = Predicate.or(Predicate.isString, Predicate.isNumber);

isStringOrNumber("a"); // => true
```

## Call Signature

```ts
<T, U>(b: (data: T) => data is U): <S>(a: (data: T) => data is S) => (data: T) => data is U | S;
```

### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |

### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `b`       | (`data`: `T`) => `data is U` |

### Returns

\<`S`\>(`a`: (`data`: `T`) => `data is S`) => (`data`: `T`) => data is U \| S

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
<T, S, U>(a: (data: T) => data is S, b: (data: T) => data is U): (data: T) => data is S | U;
```

### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `S`            |
| `U`            |

### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `a`       | (`data`: `T`) => `data is S` |
| `b`       | (`data`: `T`) => `data is U` |

### Returns

(`data`: `T`) => data is S \| U

## Call Signature

```ts
<T, S>(a: (data: T) => data is S, b: (data: T) => boolean): (data: T) => data is S;
```

### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `S`            |

### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `a`       | (`data`: `T`) => `data is S` |
| `b`       | (`data`: `T`) => `boolean`   |

### Returns

(`data`: `T`) => `data is S`

## Call Signature

```ts
<T, U>(a: (data: T) => boolean, b: (data: T) => data is U): (data: T) => data is U;
```

### Type Parameters

| Type Parameter |
| -------------- |
| `T`            |
| `U`            |

### Parameters

| Parameter | Type                         |
| --------- | ---------------------------- |
| `a`       | (`data`: `T`) => `boolean`   |
| `b`       | (`data`: `T`) => `data is U` |

### Returns

(`data`: `T`) => `data is U`

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

- [and](and.md)
- [xor](xor.md)

## Since

2.0.0
