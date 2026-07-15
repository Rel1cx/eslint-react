[@local/eff](../README.md) / identity

# Function: identity()

```ts
function identity<A>(a: A): A;
```

Returns its input argument unchanged.

**When to use**

Use to return a value unchanged where a function is required.

**Example** (Returning the same value)

```ts
import { identity } from "effect";
import * as assert from "node:assert";

assert.deepStrictEqual(identity(5), 5);
```

## Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

## Parameters

| Parameter | Type |
| --------- | ---- |
| `a`       | `A`  |

## Returns

`A`

## Since

2.0.0
