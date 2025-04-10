[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / untupled

# Function: untupled()

> **untupled**\<`A`, `B`\>(`f`): (...`a`) => `B`

Inverse function of `tupled`

## Type Parameters

### A

`A` *extends* readonly `unknown`[]

### B

`B`

## Parameters

### f

(`a`) => `B`

The function to be converted.

## Returns

> (...`a`): `B`

### Parameters

#### a

...`A`

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
