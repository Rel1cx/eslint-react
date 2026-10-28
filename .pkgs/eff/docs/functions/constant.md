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
import { constant } from "@local/eff";

const constNull = constant(null);

constNull(); // => null
constNull(); // => null
```

## Type Parameters

| Type Parameter                    |
| --------------------------------- |
| <a id="type-parameter-a"></a> `A` |

## Parameters

| Parameter | Type |
| --------- | ---- |
| `value`   | `A`  |

## Returns

[`LazyArg`](../type-aliases/LazyArg.md)\<`A`\>

## Since

2.0.0
