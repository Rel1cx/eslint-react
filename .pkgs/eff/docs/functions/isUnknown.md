[@local/eff](../README.md) / isUnknown

# Function: isUnknown()

```ts
function isUnknown(_: unknown): _ is unknown;
```

Type guard that always returns `true`.

**When to use**

Use when you need a `Predicate` that always accepts, e.g. as a placeholder.

**Example** (Matching every value)

```ts
import { Predicate } from "effect"

Predicate.isUnknown(123) // => true
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_` | `unknown` |

## Returns

`_ is unknown`

## See

[isNever](isNever.md)

## Since

2.0.0
