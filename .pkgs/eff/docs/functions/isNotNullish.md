[@local/eff](../README.md) / isNotNullish

# Function: isNotNullish()

```ts
function isNotNullish<A>(input: A): input is NonNullable<A>;
```

Checks whether a value is not `null` and not `undefined`.

**When to use**

Use when you need a `Predicate` refinement that filters out nullish values
but keeps other falsy ones.

**Details**

Uses `input != null`.

**Example** (Filtering non-nullish values)

```ts
import { Predicate } from "effect"

const values = [0, null, "", undefined]
const present = values.filter(Predicate.isNotNullish) // => [0, ""]
```

## Type Parameters

| Type Parameter |
| ------ |
| `A` |

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `A` |

## Returns

`input is NonNullable<A>`

## See

 - [isNullish](isNullish.md)
 - [isNotNull](isNotNull.md)
 - [isNotUndefined](isNotUndefined.md)

## Since

4.0.0
