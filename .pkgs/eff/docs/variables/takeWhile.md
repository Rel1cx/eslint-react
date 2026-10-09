[@local/eff](../README.md) / takeWhile

# Variable: takeWhile

```ts
const takeWhile: {
  <A, B>(refinement: (a: NoInfer<A>, i: number) => a is B): (self: Iterable<A>) => B[];
  <A>(predicate: (a: NoInfer<A>, i: number) => boolean): (self: Iterable<A>) => A[];
  <A, B>(self: Iterable<A>, refinement: (a: A, i: number) => a is B): B[];
  <A>(self: Iterable<A>, predicate: (a: A, i: number) => boolean): A[];
};
```

Takes elements from the start while the predicate holds, stopping at the
first element that fails.

**When to use**

Use to keep the leading elements of an iterable while each element satisfies
a predicate, returning the retained prefix as an array.

**Details**

Supports refinements for type narrowing. The predicate receives
`(element, index)`.

**Example** (Taking while condition holds)

```ts
import { Array } from "effect";

Array.takeWhile([1, 3, 2, 4, 1, 2], (x) => x < 4); // => [1, 3, 2]
```

## Call Signature

```ts
<A, B>(refinement: (a: NoInfer<A>, i: number) => a is B): (self: Iterable<A>) => B[];
```

### Type Parameters

| Type Parameter |
| -------------- |
| `A`            |
| `B`            |

### Parameters

| Parameter    | Type                                                                                                                              |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| `refinement` | (`a`: [`NoInfer`](https://www.typescriptlang.org/docs/handbook/utility-types.html#noinfertype)\<`A`\>, `i`: `number`) => `a is B` |

### Returns

(`self`: [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`A`\>) => `B`[]

## Call Signature

```ts
<A>(predicate: (a: NoInfer<A>, i: number) => boolean): (self: Iterable<A>) => A[];
```

### Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

### Parameters

| Parameter   | Type                                                                                                                               |
| ----------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `predicate` | (`a`: [`NoInfer`](https://www.typescriptlang.org/docs/handbook/utility-types.html#noinfertype)\<`A`\>, `i`: `number`) => `boolean` |

### Returns

(`self`: [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`A`\>) => `A`[]

## Call Signature

```ts
<A, B>(self: Iterable<A>, refinement: (a: A, i: number) => a is B): B[];
```

### Type Parameters

| Type Parameter |
| -------------- |
| `A`            |
| `B`            |

### Parameters

| Parameter    | Type                                                                                                               |
| ------------ | ------------------------------------------------------------------------------------------------------------------ |
| `self`       | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`A`\> |
| `refinement` | (`a`: `A`, `i`: `number`) => `a is B`                                                                              |

### Returns

`B`[]

## Call Signature

```ts
<A>(self: Iterable<A>, predicate: (a: A, i: number) => boolean): A[];
```

### Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

### Parameters

| Parameter   | Type                                                                                                               |
| ----------- | ------------------------------------------------------------------------------------------------------------------ |
| `self`      | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<`A`\> |
| `predicate` | (`a`: `A`, `i`: `number`) => `boolean`                                                                             |

### Returns

`A`[]

## See

- take for keeping a fixed number of leading elements
- [dropWhile](dropWhile.md) for removing the matching prefix and keeping the rest
- span for splitting the matching prefix from the remaining elements

## Since

2.0.0
