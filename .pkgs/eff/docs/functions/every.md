[@local/eff](../README.md) / every

# Function: every()

```ts
function every<T>(collection: Iterable<(data: T) => boolean>): (data: T) => boolean;
```

Creates a predicate that returns `true` if all predicates in the collection return `true`.

## Type Parameters

| Type Parameter |
| -------------- |
| `T`            |

## Parameters

| Parameter    | Type                                                                                                                                      | Description                            |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- |
| `collection` | [`Iterable`](https://www.typescriptlang.org/docs/handbook/iterators-and-generators.html#iterable-interface)\<(`data`: `T`) => `boolean`\> | The collection of predicates to check. |

## Returns

A predicate that short-circuits on the first `false`.

(`data`: `T`) => `boolean`
