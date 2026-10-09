[@local/eff](../README.md) / isFunction

# Function: isFunction()

```ts
function isFunction(input: unknown): input is Function;
```

Checks whether a value is a `function`.

**When to use**

Use when you need a `Predicate` guard to narrow an `unknown` value to a
callable function.

**Details**

Uses `typeof input === "function"`.

**Example** (Guarding functions)

```ts
import { Predicate } from "effect";

const data: unknown = () => 1;

if (Predicate.isFunction(data)) {
  data(); // => 1
}
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is Function`

## See

[isObjectKeyword](isObjectKeyword.md)

## Since

2.0.0
