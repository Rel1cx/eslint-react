[@local/eff](../README.md) / FunctionN

# Type Alias: FunctionN\<A, B\>

```ts
type FunctionN<A, B> = (...args: A) => B;
```

Represents a function with multiple arguments.

**When to use**

Use to describe a function whose argument list is represented as a tuple
type.

**Example** (Typing a variadic function)

```ts
import type { Function } from "effect";
import * as assert from "node:assert";

const sum: Function.FunctionN<[number, number], number> = (a, b) => a + b;
assert.deepStrictEqual(sum(2, 3), 5);
```

## Type Parameters

| Type Parameter                             |
| ------------------------------------------ |
| `A` _extends_ `ReadonlyArray`\<`unknown`\> |
| `B`                                        |

## Parameters

| Parameter | Type |
| --------- | ---- |
| ...`args` | `A`  |

## Returns

`B`

## Since

2.0.0
