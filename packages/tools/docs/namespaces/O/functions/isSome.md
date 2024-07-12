[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / isSome

# Function: isSome()

> **isSome**\<`A`\>(`self`): `self is Some<A>`

Determine if a `Option` is a `Some`.

## Type Parameters

• **A**

## Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to check.

## Returns

`self is Some<A>`

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.isSome(Option.some(1)), true)
assert.deepStrictEqual(Option.isSome(Option.none()), false)
```

## Since

2.0.0
