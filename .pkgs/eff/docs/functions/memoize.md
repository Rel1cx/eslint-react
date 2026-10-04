[@local/eff](../README.md) / memoize

# Function: memoize()

```ts
function memoize<
  A extends object,
  O extends
    | {}
    | null,
>(f: (a: A) => O): (ast: A) => O;
```

Creates a memoized function whose input is an object, caching results by
object identity.

**When to use**

Use to reuse the result of a synchronous computation whose output is stable
for a given object reference.

**Details**

Each memoized wrapper owns a private `WeakMap` keyed by object identity.

**Gotchas**

`undefined` is reserved to represent a cache miss and is therefore not
supported as a return value.

Structurally equal objects do not share cache entries. If the same object is
mutated after its first call, later calls still return the cached result for
that reference.

## Type Parameters

| Type Parameter                   |
| -------------------------------- |
| `A` _extends_ `object`           |
| `O` _extends_ \| \{ \} \| `null` |

## Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `f`       | (`a`: `A`) => `O` |

## Returns

(`ast`: `A`) => `O`

## Since

4.0.0
