[@local/eff](../README.md) / isNever

# Function: isNever()

```ts
function isNever(_: unknown): _ is never;
```

Type guard that always returns `false`.

**When to use**

Use when you need a `Predicate` that never accepts, e.g. in default branches.

**Example** (Matching no values)

```ts
import { Predicate } from "effect"

Predicate.isNever("anything") // => false
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `_` | `unknown` |

## Returns

`_ is never`

## See

[isUnknown](isUnknown.md)

## Since

2.0.0
