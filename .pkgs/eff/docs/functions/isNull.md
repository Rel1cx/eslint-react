[@local/eff](../README.md) / isNull

# Function: isNull()

```ts
function isNull(input: unknown): input is null;
```

Checks whether a value is `null`.

**When to use**

Use when you need a `Predicate` guard for nullable values.

**Details**

Uses `input === null`.

**Example** (Guarding null values)

```ts
import { Predicate } from "effect"

const data: unknown = null

Predicate.isNull(data) // => true
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

## Returns

`input is null`

## See

 - [isNotNull](isNotNull.md)
 - [isNullish](isNullish.md)

## Since

2.0.0
