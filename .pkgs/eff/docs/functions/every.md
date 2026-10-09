[@local/eff](../README.md) / every

# Function: every()

```ts
function every<A>(collection: Iterable<(a: A) => boolean>): (a: A) => boolean;
```

Creates a predicate that returns `true` if all predicates in the collection return `true`.

**When to use**

Use when you have a dynamic list of predicates to apply.

**Details**

Evaluation short-circuits on the first `false`. The collection is iterated
each time the predicate is called.

**Example** (Checking all predicates)

```ts
import { Predicate } from "effect"

const allChecks = Predicate.every([Predicate.isNumber, (n: number) => n > 0])

allChecks(2) // => true
```

## Type Parameters

| Type Parameter |
| ------ |
| `A` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `collection` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<(`a`: `A`) => `boolean`\> |

## Returns

(`a`: `A`) => `boolean`

## See

 - [some](some.md)
 - [and](../variables/and.md)

## Since

2.0.0
