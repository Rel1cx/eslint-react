[@local/eff](../README.md) / tupled

# Function: tupled()

```ts
function tupled<A, B>(f: (...a: A) => B): (a: A) => B;
```

Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.

**When to use**

Use to adapt a multi-argument function so it accepts one tuple argument.

**Example** (Converting arguments to a tuple)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

const sumTupled = Function.tupled((x: number, y: number): number => x + y);

assert.deepStrictEqual(sumTupled([1, 2]), 3);
```

## Type Parameters

| Type Parameter                     |
| ---------------------------------- |
| `A` _extends_ readonly `unknown`[] |
| `B`                                |

## Parameters

| Parameter | Type                 |
| --------- | -------------------- |
| `f`       | (...`a`: `A`) => `B` |

## Returns

(`a`: `A`) => `B`

## See

[untupled](untupled.md) for adapting a tuple-argument function back to multiple arguments

## Since

2.0.0
