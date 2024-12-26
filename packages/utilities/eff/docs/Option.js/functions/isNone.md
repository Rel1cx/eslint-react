[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Option.js](../README.md) / isNone

# Function: isNone()

> **isNone**\<`A`\>(`self`): `self is None<A>`

Determine if a `Option` is a `None`.

## Type Parameters

• **A**

## Parameters

### self

[`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to check.

## Returns

`self is None<A>`

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.isNone(Option.some(1)), false)
assert.deepStrictEqual(Option.isNone(Option.none()), true)
```

## Since

2.0.0
