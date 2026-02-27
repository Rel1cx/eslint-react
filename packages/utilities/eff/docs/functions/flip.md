[@eslint-react/eff](../README.md) / flip

# Function: flip()

```ts
function flip<A, B, C>(f: (...a: A) => (...b: B) => C): (...b: B) => (...a: A) => C;
```

Reverses the order of arguments for a curried function.

## Type Parameters

| Type Parameter |
| ------ |
| `A` *extends* `unknown`[] |
| `B` *extends* `unknown`[] |
| `C` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `f` | (...`a`: `A`) => (...`b`: `B`) => `C` | The function to flip. |

## Returns

A new function with the argument order reversed.

```ts
(...b: B): (...a: A) => C;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`b` | `B` |

### Returns

```ts
(...a: A): C;
```

#### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

#### Returns

`C`

## Example

```ts
import * as assert from "node:assert"
import { flip } from "effect/Function"

const f = (a: number) => (b: string) => a - b.length

assert.deepStrictEqual(flip(f)('aaa')(2), -1)
```

## Since

1.0.0
