[@local/eff](../README.md) / memoize

# Function: memoize()

```ts
function memoize<
  A,
  O extends
    | {}
    | null,
>(f: (a: A) => O): (a: A) => O;
```

Creates a memoized function that caches the result of a synchronous,
stable-output computation for any type of key.

**Details**

Object keys are cached by identity in a private `WeakMap`, so entries can
be garbage collected; primitive keys are cached by value in a private
`Map`.

**Gotchas**

- `undefined` is reserved to represent a cache miss and is not supported
  as a return value.
- Structurally equal objects do not share cache entries, and mutating an
  object after its first call does not change the cached result for that
  reference.

## Type Parameters

| Type Parameter                   |
| -------------------------------- |
| `A`                              |
| `O` _extends_ \| \{ \} \| `null` |

## Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `f`       | (`a`: `A`) => `O` |

## Returns

(`a`: `A`) => `O`

## Since

4.0.0
