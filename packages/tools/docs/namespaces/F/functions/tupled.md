[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [F](../README.md) / tupled

# Function: tupled()

> **tupled**\<`A`, `B`\>(`f`): (`a`) => `B`

Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.

## Type Parameters

• **A** *extends* readonly `unknown`[]

• **B**

## Parameters

• **f**

## Returns

`Function`

### Parameters

• **a**: `A`

### Returns

`B`

## Example

```ts
import { tupled } from "effect/Function"

const sumTupled = tupled((x: number, y: number): number => x + y)

assert.deepStrictEqual(sumTupled([1, 2]), 3)
```

## Since

2.0.0
