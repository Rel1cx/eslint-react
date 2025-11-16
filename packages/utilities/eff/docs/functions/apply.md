[@eslint-react/eff](../README.md) / apply

# Function: apply()

```ts
function apply<A>(a: A): <B>(self: (a: A) => B) => B;
```

Apply a function to a given value.

## Type Parameters

| Type Parameter |
| ------ |
| `A` |

## Parameters

| Parameter | Type | Description |
| ------ | ------ | ------ |
| `a` | `A` | The value to apply. |

## Returns

```ts
<B>(self: (a: A) => B): B;
```

### Type Parameters

| Type Parameter |
| ------ |
| `B` |

### Parameters

| Parameter | Type |
| ------ | ------ |
| `self` | (`a`: `A`) => `B` |

### Returns

`B`

## Example

```ts
import * as assert from "node:assert"
import { pipe, apply } from "effect/Function"
import { length } from "effect/String"

assert.deepStrictEqual(pipe(length, apply("hello")), 5)
```

## Since

1.0.0
