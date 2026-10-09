[@local/eff](../README.md) / isBigInt

# Function: isBigInt()

```ts
function isBigInt(input: unknown): input is bigint;
```

Checks whether a value is a `bigint`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
bigint.

**Details**

Uses `typeof input === "bigint"`.

**Example** (Guarding bigints)

```ts
import { Predicate } from "effect"

const data: unknown = 1n

if (Predicate.isBigInt(data)) {
  data + 2n // => 3n
}
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

## Returns

`input is bigint`

## See

[isNumber](isNumber.md)

## Since

2.0.0
