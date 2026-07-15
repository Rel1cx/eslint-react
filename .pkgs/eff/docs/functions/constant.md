[@local/eff](../README.md) / constant

# Function: constant()

```ts
function constant<A>(value: A): LazyArg<A>;
```

Creates a zero-argument function that always returns the provided value.

**When to use**

Use when you need a thunk or callback that returns the same value on every
invocation.

**Example** (Creating a constant thunk)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

const constNull = Function.constant(null);

assert.deepStrictEqual(constNull(), null);
assert.deepStrictEqual(constNull(), null);
```

## Type Parameters

| Type Parameter |
| -------------- |
| `A`            |

## Parameters

| Parameter | Type |
| --------- | ---- |
| `value`   | `A`  |

## Returns

[`LazyArg`](../type-aliases/LazyArg.md)\<`A`\>

## Since

2.0.0
