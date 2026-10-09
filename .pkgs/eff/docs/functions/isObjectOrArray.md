[@local/eff](../README.md) / isObjectOrArray

# Function: isObjectOrArray()

```ts
function isObjectOrArray(input: unknown): input is unknown[] | { [x: string | number | symbol]: unknown };
```

Checks whether a value is an object or an array (non-null object).

**When to use**

Use when you need a `Predicate` guard that accepts plain objects and arrays,
but not `null`.

**Details**

Uses `typeof input === "object" && input !== null` and includes arrays.

**Example** (Checking objects or arrays)

```ts
import { Predicate } from "effect"

Predicate.isObjectOrArray([]) // => true
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `input` | `unknown` |

## Returns

input is unknown\[\] \| \{ \[x: string \| number \| symbol\]: unknown \}

## See

 - [isObject](isObject.md)
 - [isObjectKeyword](isObjectKeyword.md)

## Since

4.0.0
