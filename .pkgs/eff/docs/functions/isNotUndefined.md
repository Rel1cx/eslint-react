[@local/eff](../README.md) / isNotUndefined

# Function: isNotUndefined()

```ts
function isNotUndefined<A>(input: A): input is Exclude<A, undefined>;
```

Checks whether a value is not `undefined`.

**When to use**

Use when you need a refinement that filters out `undefined`
while preserving other falsy values.

**Details**

Returns a refinement that excludes `undefined`.

**Example** (Filtering undefined values)

```ts
import { isNotUndefined } from "@local/eff";

const values = [1, undefined, 2];
const defined = values.filter(isNotUndefined); // => [1, 2]
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

`input is Exclude<A, undefined>`

## See

- [isUndefined](isUndefined.md)
- [isNotNullish](isNotNullish.md)

## Since

2.0.0
