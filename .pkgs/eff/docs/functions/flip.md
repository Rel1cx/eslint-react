[@local/eff](../README.md) / flip

# Function: flip()

```ts
function flip<A extends unknown[], B extends unknown[], C>(f: (...a: A) => (...b: B) => C): (...b: B) => (...a: A) => C;
```

Reverses the order of arguments for a curried function.

**When to use**

Use to adapt a curried function when its argument groups need to be supplied
in the opposite order.

**Example** (Flipping curried arguments)

```ts
import { flip } from "@local/eff";

const f = (a: number) => (b: string) => a - b.length;

flip(f)("aaa")(2); // => -1
```

## Type Parameters

| Type Parameter                                          |
| ------------------------------------------------------- |
| <a id="type-parameter-a"></a> `A` _extends_ `unknown`[] |
| <a id="type-parameter-b"></a> `B` _extends_ `unknown`[] |
| <a id="type-parameter-c"></a> `C`                       |

## Parameters

| Parameter | Type                                  |
| --------- | ------------------------------------- |
| `f`       | (...`a`: `A`) => (...`b`: `B`) => `C` |

## Returns

(...`b`: `B`) => (...`a`: `A`) => `C`

## Since

2.0.0
