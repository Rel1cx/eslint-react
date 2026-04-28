[@local/eff](../README.md) / flip

# Function: flip()

```ts
function flip<A, B, C>(f: (...a: A) => (...b: B) => C): (...b: B) => (...a: A) => C;
```

Reverses the order of arguments for a curried function.

## Type Parameters

| Type Parameter            |
| ------------------------- |
| `A` _extends_ `unknown`[] |
| `B` _extends_ `unknown`[] |
| `C`                       |

## Parameters

| Parameter | Type                                  | Description           |
| --------- | ------------------------------------- | --------------------- |
| `f`       | (...`a`: `A`) => (...`b`: `B`) => `C` | The function to flip. |

## Returns

A new function with the argument order reversed.

(...`b`: `B`) => (...`a`: `A`) => `C`

## Example

```ts
import { flip } from "effect/Function";
import * as assert from "node:assert";

const f = (a: number) => (b: string) => a - b.length;

assert.deepStrictEqual(flip(f)("aaa")(2), -1);
```

## Since

1.0.0
