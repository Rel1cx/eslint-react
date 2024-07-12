[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / liftNullable

# Function: liftNullable()

> **liftNullable**\<`A`, `B`\>(`f`): (...`a`) => [`Option`](../type-aliases/Option.md)\<`NonNullable`\<`B`\>\>

This API is useful for lifting a function that returns `null` or `undefined` into the `Option` context.

## Type Parameters

• **A** *extends* readonly `unknown`[]

• **B**

## Parameters

• **f**

## Returns

`Function`

### Parameters

• ...**a**: `A`

### Returns

[`Option`](../type-aliases/Option.md)\<`NonNullable`\<`B`\>\>

## Example

```ts
import { Option } from "effect"

const parse = (s: string): number | undefined => {
  const n = parseFloat(s)
  return isNaN(n) ? undefined : n
}

const parseOption = Option.liftNullable(parse)

assert.deepStrictEqual(parseOption('1'), Option.some(1))
assert.deepStrictEqual(parseOption('not a number'), Option.none())
```

## Since

2.0.0
