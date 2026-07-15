[@local/eff](../README.md) / SK

# Function: SK()

```ts
function SK<A, B>(_: A, b: B): B;
```

Returns the second argument and discards the first. The SK combinator is
a fundamental combinator in the lambda calculus and the SKI combinator
calculus.

**When to use**

Use to discard the first argument and return the second argument.

**Example** (Discarding the first argument)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

assert.deepStrictEqual(Function.SK(0, "hello"), "hello");
```

## Type Parameters

| Type Parameter |
| -------------- |
| `A`            |
| `B`            |

## Parameters

| Parameter | Type |
| --------- | ---- |
| `_`       | `A`  |
| `b`       | `B`  |

## Returns

`B`

## Since

2.0.0
