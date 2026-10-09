[@local/eff](../README.md) / isObjectKeyword

# Function: isObjectKeyword()

```ts
function isObjectKeyword(input: unknown): input is object;
```

Checks whether a value is an `object` in the JavaScript sense (objects, arrays, functions).

**When to use**

Use when you need a `Predicate` guard that accepts arrays and functions as
well as objects.

**Details**

Returns `true` for arrays and functions, and `false` for `null`.

**Example** (Checking object keywords)

```ts
import { Predicate } from "effect";

Predicate.isObjectKeyword(() => 1); // => true
Predicate.isObjectKeyword(null); // => false
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is object`

## See

- [isObject](isObject.md)
- [isObjectOrArray](isObjectOrArray.md)

## Since

4.0.0
