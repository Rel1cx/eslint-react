[@local/eff](../README.md) / isUndefined

# Function: isUndefined()

```ts
function isUndefined(input: unknown): input is undefined;
```

Checks whether a value is `undefined`.

**When to use**

Use when you need a type guard for values that are exactly
`undefined`.

**Details**

Uses `input === undefined`.

**Example** (Guarding undefined values)

```ts
import { isUndefined } from "@local/eff";

const data: unknown = undefined;

isUndefined(data); // => true
```

## Parameters

| Parameter | Type      |
| --------- | --------- |
| `input`   | `unknown` |

## Returns

`input is undefined`

## See

- [isNotUndefined](isNotUndefined.md)
- [isNullish](isNullish.md)

## Since

2.0.0
