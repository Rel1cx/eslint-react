[@local/eff](../README.md) / dropWhile

# Variable: dropWhile

```ts
const dropWhile: {
  <A>(predicate: (a: NoInfer<A>, i: number) => boolean): (self: Iterable<A>) => A[];
  <A>(self: Iterable<A>, predicate: (a: A, i: number) => boolean): A[];
};
```

Drops elements from the start while the predicate holds, returning the rest.

**When to use**

Use to remove a leading prefix of elements that satisfy a predicate.

**Details**

The predicate receives `(element, index)`.

**Example** (Dropping while condition holds)

```ts
import { Array } from "effect";

Array.dropWhile([1, 2, 3, 4, 5], (x) => x < 4); // => [4, 5]
```

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

- [takeWhile](takeWhile.md) — keep the matching prefix instead
- drop — drop a fixed count

## Since

2.0.0
