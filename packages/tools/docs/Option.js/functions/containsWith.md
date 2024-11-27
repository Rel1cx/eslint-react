[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / containsWith

# Function: containsWith()

> **containsWith**\<`A`\>(`isEquivalent`): (`a`) => (`self`) => `boolean`(`self`, `a`) => `boolean`

Returns a function that checks if a `Option` contains a given value using a provided `isEquivalent` function.

## Type Parameters

• **A**

## Parameters

• **isEquivalent**

## Returns

`Function`

### Parameters

• **a**: `A`

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

`boolean`

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

• **a**: `A`

### Returns

`boolean`

## Example

```ts
import { pipe, Option, Number } from "effect"

assert.deepStrictEqual(pipe(Option.some(2), Option.containsWith(Number.Equivalence)(2)), true)
assert.deepStrictEqual(pipe(Option.some(1), Option.containsWith(Number.Equivalence)(2)), false)
assert.deepStrictEqual(pipe(Option.none(), Option.containsWith(Number.Equivalence)(2)), false)
```

## Category

elements

## Since

2.0.0
