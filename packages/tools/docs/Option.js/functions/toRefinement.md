[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / toRefinement

# Function: toRefinement()

> **toRefinement**\<`A`, `B`\>(`f`): (`a`) => `a is B`

Returns a type guard from a `Option` returning function.
This function ensures that a type guard definition is type-safe.

## Type Parameters

• **A**

• **B**

## Parameters

• **f**

## Returns

`Function`

### Parameters

• **a**: `A`

### Returns

`a is B`

## Example

```ts
import { Option } from "effect"

const parsePositive = (n: number): Option.Option<number> =>
  n > 0 ? Option.some(n) : Option.none()

const isPositive = Option.toRefinement(parsePositive)

assert.deepStrictEqual(isPositive(1), true)
assert.deepStrictEqual(isPositive(-1), false)
```

## Category

conversions

## Since

2.0.0
