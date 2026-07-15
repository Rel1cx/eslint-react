[@local/eff](../README.md) / apply

# Function: apply()

```ts
function apply<A>(a: A): <B>(self: (a: A) => B) => B;
```

Applies a function to a given value.

**When to use**

Use to pass a fixed value into a unary function, especially when the function
is the value flowing through `pipe`.

**Details**

`apply(a)(f)` is equivalent to `f(a)`.

**Example** (Applying an argument to a function)

```ts
import { Function, String, pipe } from "effect";
import * as assert from "node:assert";

assert.deepStrictEqual(pipe(String.length, Function.apply("hello")), 5);
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

\<`B`\>(`self`: (`a`: `A`) => `B`) => `B`

## See

[pipe](pipe.md) for building left-to-right pipelines

## Since

2.0.0
