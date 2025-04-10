[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / flip

# Function: flip()

> **flip**\<`A`, `B`, `C`\>(`f`): (...`b`) => (...`a`) => `C`

Reverses the order of arguments for a curried function.

## Type Parameters

### A

`A` *extends* `unknown`[]

### B

`B` *extends* `unknown`[]

### C

`C`

## Parameters

### f

(...`a`) => (...`b`) => `C`

The function to flip.

## Returns

> (...`b`): (...`a`) => `C`

### Parameters

#### b

...`B`

### Returns

> (...`a`): `C`

#### Parameters

##### a

...`A`

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
