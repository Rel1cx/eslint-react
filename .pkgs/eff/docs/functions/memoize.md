[@local/eff](../README.md) / memoize

# Function: memoize()

```ts
function memoize<A, O>(f: (a: A) => O): (ast: A) => O;
```

Creates a memoized function whose input is an object, caching results by
object identity.

**When to use**

Use to reuse the result of a synchronous computation whose output is stable
for a given object reference.

**Details**

Each memoized wrapper owns a private `WeakMap` keyed by object identity.
Cached `undefined` results are still returned because the cache is checked
with `WeakMap.has`.

**Gotchas**

Structurally equal objects do not share cache entries. If the same object is
mutated after its first call, later calls still return the cached result for
that reference.

## Type Parameters

| Type Parameter         |
| ---------------------- |
| `A` _extends_ `object` |
| `O`                    |

## Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `f`       | (`a`: `A`) => `O` |

## Returns

(`ast`: `A`) => `O`

## Since

4.0.0
