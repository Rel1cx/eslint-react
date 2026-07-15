[@local/eff](../README.md) / flip

# Function: flip()

```ts
function flip<A, B, C>(f: (...a: A) => (...b: B) => C): (...b: B) => (...a: A) => C;
```

Reverses the order of arguments for a curried function.

**When to use**

Use to adapt a curried function when its argument groups need to be supplied
in the opposite order.

**Example** (Flipping curried arguments)

```ts
import { Function } from "effect";
import * as assert from "node:assert";

const f = (a: number) => (b: string) => a - b.length;

assert.deepStrictEqual(Function.flip(f)("aaa")(2), -1);
```

## Type Parameters

| Type Parameter            |
| ------------------------- |
| `A` _extends_ `unknown`[] |
| `B` _extends_ `unknown`[] |
| `C`                       |

## Parameters

| Parameter | Type                                  |
| --------- | ------------------------------------- |
| `f`       | (...`a`: `A`) => (...`b`: `B`) => `C` |

## Returns

(...`b`: `B`) => (...`a`: `A`) => `C`

## Since

2.0.0
