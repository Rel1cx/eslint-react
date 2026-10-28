[@local/eff](../README.md) / isNotNull

# Function: isNotNull()

```ts
function isNotNull<A>(input: A): input is Exclude<A, null>;
```

Checks whether a value is not `null`.

**When to use**

Use when you need a refinement that filters out `null` while
preserving other falsy values.

**Details**

Returns a refinement that excludes `null`.

**Example** (Filtering null values)

```ts
import { isNotNull } from "@local/eff";

const values = [1, null, 2];
const nonNull = values.filter(isNotNull); // => [1, 2]
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

`input is Exclude<A, null>`

## See

- [isNull](isNull.md)
- [isNotNullish](isNotNullish.md)

## Since

2.0.0
