[@local/eff](../README.md) / isNumber

# Function: isNumber()

```ts
function isNumber(input: unknown): input is number;
```

Checks whether a value is a `number`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
number.

**Details**

Uses `typeof input === "number"` and does not exclude `NaN` or `Infinity`.

**Example** (Guarding numbers)

```ts
import { Predicate } from "effect";

const data: unknown = 42;

if (Predicate.isNumber(data)) {
  data + 1; // => 43
}
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is number`

## See

- [isBigInt](isBigInt.md)
- [isString](isString.md)

## Since

2.0.0
