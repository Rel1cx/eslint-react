[@local/eff](../README.md) / isBoolean

# Function: isBoolean()

```ts
function isBoolean(input: unknown): input is boolean;
```

Checks whether a value is a `boolean`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
boolean.

**Details**

Uses `typeof input === "boolean"`.

**Example** (Guarding booleans)

```ts
import { Predicate } from "effect"

const data: unknown = true

if (Predicate.isBoolean(data)) {
  data ? "yes" : "no" // => "yes"
}
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

## Returns

`input is boolean`

## See

 - [isString](isString.md)
 - [isNumber](isNumber.md)

## Since

2.0.0
