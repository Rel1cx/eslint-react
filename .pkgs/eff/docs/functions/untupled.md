[@local/eff](../README.md) / untupled

# Function: untupled()

```ts
function untupled<A, B>(f: (a: A) => B): (...a: A) => B;
```

Converts a tupled function back to an uncurried function.

**When to use**

Use to adapt a tuple-argument function so it accepts multiple arguments.

**Example** (Converting a tuple to arguments)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

const getFirst = Function.untupled(<A, B>(tuple: [A, B]): A => tuple[0]);

assert.deepStrictEqual(getFirst(1, 2), 1);
```

## Type Parameters

| Type Parameter                     |
| ---------------------------------- |
| `A` _extends_ readonly `unknown`[] |
| `B`                                |

## Parameters

| Parameter | Type              |
| --------- | ----------------- |
| `f`       | (`a`: `A`) => `B` |

## Returns

(...`a`: `A`) => `B`

## See

[tupled](tupled.md) for adapting a multi-argument function to one tuple argument

## Since

2.0.0
