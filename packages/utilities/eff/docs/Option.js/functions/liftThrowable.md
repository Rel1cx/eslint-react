[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Option.js](../README.md) / liftThrowable

# Function: liftThrowable()

> **liftThrowable**\<`A`, `B`\>(`f`): (...`a`) => [`Option`](../type-aliases/Option.md)\<`B`\>

A utility function that lifts a function that throws exceptions into a function that returns an `Option`.

This function is useful for any function that might throw an exception, allowing the developer to handle
the exception in a more functional way.

## Type Parameters

• **A** *extends* readonly `unknown`[]

• **B**

## Parameters

### f

(...`a`) => `B`

the function that can throw exceptions.

## Returns

`Function`

### Parameters

#### a

...`A`

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

## Example

```ts
import { Option } from "effect"

const parse = Option.liftThrowable(JSON.parse)

assert.deepStrictEqual(parse("1"), Option.some(1))
assert.deepStrictEqual(parse(""), Option.none())
```

## Since

2.0.0
