[@local/eff](../README.md) / isString

# Function: isString()

```ts
function isString(input: unknown): input is string;
```

Checks whether a value is a `string`.

**When to use**

Use when you need a type guard to narrow an `unknown` value to a
string.

**Details**

Uses `typeof input === "string"`.

**Example** (Guarding strings)

```ts
import { isString } from "@local/eff";

const data: unknown = "hi";

if (isString(data)) {
  data.toUpperCase(); // => "HI"
}
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is string`

## See

- [isNumber](isNumber.md)
- [isBoolean](isBoolean.md)

## Since

2.0.0
