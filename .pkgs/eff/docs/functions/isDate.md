[@local/eff](../README.md) / isDate

# Function: isDate()

```ts
function isDate(input: unknown): input is Date;
```

Checks whether a value is a `Date`.

**When to use**

Use when you need a `Predicate` runtime guard for dates.

**Details**

Uses `instanceof Date`.

**Example** (Guarding Date values)

```ts
import { Predicate } from "effect";

const data: unknown = new Date();

Predicate.isDate(data); // => true
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is Date`

## See

[isRegExp](isRegExp.md)

## Since

2.0.0
