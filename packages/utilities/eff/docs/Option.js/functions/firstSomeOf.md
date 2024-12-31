[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Option.js](../README.md) / firstSomeOf

# Function: firstSomeOf()

> **firstSomeOf**\<`T`, `C`\>(`collection`): \[`C`\] *extends* \[`Iterable`\<[`Option`](../type-aliases/Option.md)\<`A`\>\>\] ? [`Option`](../type-aliases/Option.md)\<`A`\> : `never`

Given an `Iterable` collection of `Option`s, returns the first `Some` found in the collection.

## Type Parameters

• **T**

• **C** *extends* `Iterable`\<[`Option`](../type-aliases/Option.md)\<`T`\>\> = `Iterable`\<[`Option`](../type-aliases/Option.md)\<`T`\>\>

## Parameters

### collection

`C`

An iterable collection of `Option` to be searched.

## Returns

\[`C`\] *extends* \[`Iterable`\<[`Option`](../type-aliases/Option.md)\<`A`\>\>\] ? [`Option`](../type-aliases/Option.md)\<`A`\> : `never`

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.firstSomeOf([Option.none(), Option.some(1), Option.some(2)]), Option.some(1))
```

## Since

2.0.0
