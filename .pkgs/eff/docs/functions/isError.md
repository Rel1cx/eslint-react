[@local/eff](../README.md) / isError

# Function: isError()

```ts
function isError(input: unknown): input is Error;
```

Checks whether a value is an `Error`.

**When to use**

Use when you need a `Predicate` guard for errors caught from unknown sources.

**Details**

Uses `instanceof Error`.

**Example** (Guarding errors)

```ts
import { Predicate } from "effect";

const data: unknown = new Error("boom");

Predicate.isError(data); // => true
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is Error`

## See

[isUnknown](isUnknown.md)

## Since

2.0.0
