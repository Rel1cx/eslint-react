[@local/eff](../README.md) / isObject

# Function: isObject()

```ts
function isObject(input: unknown): input is { [x: string | number | symbol]: unknown };
```

Checks whether a value is a non-null object value that is not an array.

**When to use**

Use to narrow unknown input to a non-null, non-array object with a
type guard.

**Details**

This is a structural runtime check using `typeof input === "object"`, so it
also accepts object instances such as `Date`, `Map`, class instances, and
typed arrays. It excludes `null` and arrays.

**Example** (Guarding objects)

```ts
import { isObject } from "@local/eff";

isObject({ a: 1 }); // => true
isObject([1, 2]); // => false
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

input is \{ \[x: string \| number \| symbol\]: unknown \}

## See

[isObjectOrArray](isObjectOrArray.md)

## Since

2.0.0
