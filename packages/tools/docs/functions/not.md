[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / not

# Function: not()

> **not**\<`A`\>(`self`): [`Predicate`](../interfaces/Predicate.md)\<`A`\>

Negates the result of a given predicate.

## Type Parameters

• **A**

## Parameters

• **self**: [`Predicate`](../interfaces/Predicate.md)\<`A`\>

A predicate.

## Returns

[`Predicate`](../interfaces/Predicate.md)\<`A`\>

## Example

```ts
import { Predicate, Number } from "effect"

const isPositive = Predicate.not(Number.lessThan(0))

assert.deepStrictEqual(isPositive(-1), false)
assert.deepStrictEqual(isPositive(0), true)
assert.deepStrictEqual(isPositive(1), true)
```

## Category

combinators

## Since

2.0.0
