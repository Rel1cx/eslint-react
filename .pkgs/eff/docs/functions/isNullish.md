[@local/eff](../README.md) / isNullish

# Function: isNullish()

```ts
function isNullish<A>(input: A): input is A & (null | undefined);
```

Checks whether a value is `null` or `undefined`.

**When to use**

Use when you need a type guard for nullish values.

**Details**

Uses `input === null || input === undefined`.

**Example** (Guarding nullish values)

```ts
import { isNullish } from "@local/eff";

const values = [0, null, "", undefined];
const nullish = values.filter(isNullish); // => [null, undefined]
```

## Type Parameters

| Type Parameter                    |
| --------------------------------- |
| <a id="type-parameter-a"></a> `A` |

## Parameters

| Parameter | Type |
| --------- | ---- |
| `input`   | `A`  |

## Returns

input is A & (null \| undefined)

## See

- [isNotNullish](isNotNullish.md)
- [isUndefined](isUndefined.md)
- [isNull](isNull.md)

## Since

4.0.0
