[@eslint-react/eff](../README.md) / untupled

# Function: untupled()

```ts
function untupled<A, B>(f: (a: A) => B): (...a: A) => B;
```

Inverse function of `tupled`

## Type Parameters

| Type Parameter |
| ------ |
| `A` *extends* readonly `unknown`[] |
| `B` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `f` | (`a`: `A`) => `B` | The function to be converted. |

## Returns

```ts
(...a: A): B;
```

### Parameters

| Parameter | Type |
| ------ | ------ |
| ...`a` | `A` |

### Returns

`B`

## Example

```ts
import * as assert from "node:assert"
import { untupled } from "effect/Function"

const getFirst = untupled(<A, B>(tuple: [A, B]): A => tuple[0])

assert.deepStrictEqual(getFirst(1, 2), 1)
```

## Since

1.0.0
