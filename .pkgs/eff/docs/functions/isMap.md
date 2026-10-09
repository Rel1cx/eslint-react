[@local/eff](../README.md) / isMap

# Function: isMap()

```ts
function isMap(input: unknown): input is Map<unknown, unknown>;
```

Checks whether a value is a `Map`.

**When to use**

Use when you need a `Predicate` runtime guard for `Map` values.

**Details**

Uses `instanceof Map`.

**Example** (Guarding a Map)

```ts
import { Predicate } from "effect"

const data: unknown = new Map([["a", 1]])

if (Predicate.isMap(data)) {
  data.size // => 1
}
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

## Returns

`input is Map<unknown, unknown>`

## See

 - [isSet](isSet.md)
 - [isIterable](isIterable.md)

## Since

2.0.0
