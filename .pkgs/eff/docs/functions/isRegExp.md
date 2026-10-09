[@local/eff](../README.md) / isRegExp

# Function: isRegExp()

```ts
function isRegExp(input: unknown): input is RegExp;
```

Checks whether a value is a `RegExp`.

**When to use**

Use when you need a `Predicate` runtime guard for regular expressions.

**Details**

Uses `instanceof RegExp`.

**Example** (Guarding RegExp values)

```ts
import { Predicate } from "effect";

const data: unknown = /abc/;

Predicate.isRegExp(data); // => true
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is RegExp`

## See

[isDate](isDate.md)

## Since

3.9.0
