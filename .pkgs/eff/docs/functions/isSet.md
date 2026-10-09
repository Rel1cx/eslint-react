[@local/eff](../README.md) / isSet

# Function: isSet()

```ts
function isSet(input: unknown): input is Set<unknown>;
```

Checks whether a value is a `Set`.

**When to use**

Use when you need a `Predicate` runtime guard for `Set` values.

**Details**

Uses `instanceof Set`.

**Example** (Guarding a Set)

```ts
import { Predicate } from "effect";

const data: unknown = new Set([1, 2]);

if (Predicate.isSet(data)) {
  data.size; // => 2
}
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is Set<unknown>`

## See

- [isMap](isMap.md)
- [isIterable](isIterable.md)

## Since

2.0.0
