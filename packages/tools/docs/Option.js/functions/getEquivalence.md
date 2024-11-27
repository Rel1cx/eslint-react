[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / getEquivalence

# Function: getEquivalence()

> **getEquivalence**\<`A`\>(`isEquivalent`): `Equivalence`\<[`Option`](../type-aliases/Option.md)\<`A`\>\>

## Type Parameters

• **A**

## Parameters

• **isEquivalent**: `Equivalence`\<`A`\>

## Returns

`Equivalence`\<[`Option`](../type-aliases/Option.md)\<`A`\>\>

## Example

```ts
import { Option, Number } from "effect"

const isEquivalent = Option.getEquivalence(Number.Equivalence)
assert.deepStrictEqual(isEquivalent(Option.none(), Option.none()), true)
assert.deepStrictEqual(isEquivalent(Option.none(), Option.some(1)), false)
assert.deepStrictEqual(isEquivalent(Option.some(1), Option.none()), false)
assert.deepStrictEqual(isEquivalent(Option.some(1), Option.some(2)), false)
assert.deepStrictEqual(isEquivalent(Option.some(1), Option.some(1)), true)
```

## Category

equivalence

## Since

2.0.0
