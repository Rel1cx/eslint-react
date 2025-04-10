[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / tupled

# Function: tupled()

> **tupled**\<`A`, `B`\>(`f`): (`a`) => `B`

Creates a   version of this function: instead of `n` arguments, it accepts a single tuple argument.

## Type Parameters

### A

`A` *extends* readonly `unknown`[]

### B

`B`

## Parameters

### f

(...`a`) => `B`

The function to be converted.

## Returns

> (`a`): `B`

### Parameters

#### a

`A`

### Returns

`B`

## Example

```ts
import * as assert from "node:assert"
import { tupled } from "effect/Function"

const sumTupled = tupled((x: number, y: number): number => x + y)

assert.deepStrictEqual(sumTupled([1, 2]), 3)
```

## Since

1.0.0
