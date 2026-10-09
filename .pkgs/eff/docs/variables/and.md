[@local/eff](../README.md) / and

# Variable: and

```ts
const and: {
<T, U>  (b: (data: T) => data is U): <S>(a: (data: T) => data is S) => (data: T) => data is S & U;
<T>  (b: (data: T) => boolean): (a: (data: T) => boolean) => (data: T) => boolean;
<T, S, U>  (a: (data: T) => data is S, b: (data: T) => data is U): (data: T) => data is S & U;
<T, S>  (a: (data: T) => data is S, b: (data: T) => boolean): (data: T) => data is S;
<T, U>  (a: (data: T) => boolean, b: (data: T) => data is U): (data: T) => data is U;
<T>  (a: (data: T) => boolean, b: (data: T) => boolean): (data: T) => boolean;
};
```

Creates a predicate that returns `true` only if both predicates are `true`.

**When to use**

Use when you want to combine `Predicate`s with AND, accepting values that
satisfy multiple conditions, including refinements that narrow to an
intersection.

**Details**

Evaluation short-circuits on the first `false`. For refinements, the output
type is an intersection.

**Example** (Checking both conditions)

```ts
import { Predicate } from "effect"

const hasAAndB = Predicate.and(
  Predicate.hasProperty("a"),
  Predicate.hasProperty("b")
)

const input: unknown = JSON.parse(`{"a":1,"b":"ok"}`)
if (hasAAndB(input)) {
  // input has both properties at this point
  const a = input.a
  const b = input.b

  const values = [a, b] // => [1, "ok"]
}
```

## Call Signature

```ts
<T, U>(b: (data: T) => data is U): <S>(a: (data: T) => data is S) => (data: T) => data is S & U;
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `b` | (`data`: `T`) => `data is U` |

### Returns

\<`S`\>(`a`: (`data`: `T`) => `data is S`) => (`data`: `T`) => `data is S & U`

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
<T, S, U>(a: (data: T) => data is S, b: (data: T) => data is U): (data: T) => data is S & U;
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `S` |
| `U` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | (`data`: `T`) => `data is S` |
| `b` | (`data`: `T`) => `data is U` |

### Returns

(`data`: `T`) => `data is S & U`

## Call Signature

```ts
<T, S>(a: (data: T) => data is S, b: (data: T) => boolean): (data: T) => data is S;
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `S` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | (`data`: `T`) => `data is S` |
| `b` | (`data`: `T`) => `boolean` |

### Returns

(`data`: `T`) => `data is S`

## Call Signature

```ts
<T, U>(a: (data: T) => boolean, b: (data: T) => data is U): (data: T) => data is U;
```

### Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `U` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `a` | (`data`: `T`) => `boolean` |
| `b` | (`data`: `T`) => `data is U` |

### Returns

(`data`: `T`) => `data is U`

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
