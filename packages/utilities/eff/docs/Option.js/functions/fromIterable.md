[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Option.js](../README.md) / fromIterable

# Function: fromIterable()

> **fromIterable**\<`A`\>(`collection`): [`Option`](../type-aliases/Option.md)\<`A`\>

Converts an `Iterable` of values into an `Option`. Returns the first value of the `Iterable` wrapped in a `Some`
if the `Iterable` is not empty, otherwise returns `None`.

## Type Parameters

• **A**

## Parameters

### collection

`Iterable`\<`A`\>

The `Iterable` to be converted to an `Option`.

## Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.fromIterable([1, 2, 3]), Option.some(1))
assert.deepStrictEqual(Option.fromIterable([]), Option.none())
```

## Since

2.0.0
