[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [O](../README.md) / firstSomeOf

# Function: firstSomeOf()

> **firstSomeOf**\<`A`\>(`collection`): [`Option`](../type-aliases/Option.md)\<`A`\>

Given an `Iterable` collection of `Option`s, returns the first `Some` found in the collection.

## Type Parameters

• **A**

## Parameters

• **collection**: `Iterable`\<[`Option`](../type-aliases/Option.md)\<`A`\>\>

An iterable collection of `Option` to be searched.

## Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.firstSomeOf([Option.none(), Option.some(1), Option.some(2)]), Option.some(1))
```

## Since

2.0.0
