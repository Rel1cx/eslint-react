[@local/eff](../README.md) / some

# Function: some()

```ts
function some<A>(collection: Iterable<(a: A) => boolean>): (a: A) => boolean;
```

Creates a predicate that returns `true` if any predicate in the collection returns `true`.

**When to use**

Use when you have a dynamic list of predicates and only need one to pass.

**Details**

Evaluation short-circuits on the first `true`. The collection is iterated
each time the predicate is called.

**Example** (Checking any predicate)

```ts
import { Predicate } from "effect";

const anyCheck = Predicate.some([Predicate.isString, Predicate.isNumber]);

anyCheck("ok"); // => true
```

## Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

## Parameters

| Parameter    | Type                                                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| `collection` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<(`a`: `A`) => `boolean`\> |

## Returns

(`a`: `A`) => `boolean`

## See

- [every](every.md)
- [or](../variables/or.md)

## Since

2.0.0
