[@local/eff](../README.md) / some

# Function: some()

```ts
function some<T>(collection: Iterable<(data: T) => boolean>): (data: T) => boolean;
```

Creates a predicate that returns `true` if any predicate in the collection returns `true`.

## Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

## Parameters

| Parameter    | Type                                                                                                                                      | Description                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `collection` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<(`data`: `T`) => `boolean`\> | The collection of predicates to check. |

## Returns

A predicate that short-circuits on the first `true`.

(`data`: `T`) => `boolean`
