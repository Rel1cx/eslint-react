[**@eslint-react/eff**](../../README.md)

***

[@eslint-react/eff](../../README.md) / [./Option.js](../README.md) / all

# Function: all()

> **all**\<`I`\>(`input`): \[`I`\] *extends* \[readonly [`Option`](../type-aliases/Option.md)\<`any`\>[]\] ? [`Option`](../type-aliases/Option.md)\<\{ -readonly \[K in string \| number \| symbol\]: \[I\<I\>\[K\]\] extends \[Option\<A\>\] ? A : never \}\> : \[`I`\] *extends* \[`Iterable`\<[`Option`](../type-aliases/Option.md)\<`A`\>\>\] ? [`Option`](../type-aliases/Option.md)\<`A`[]\> : [`Option`](../type-aliases/Option.md)\<\{ -readonly \[K in string \| number \| symbol\]: \[I\[K\]\] extends \[Option\<A\>\] ? A : never \}\>

Takes a structure of `Option`s and returns an `Option` of values with the same structure.

- If a tuple is supplied, then the returned `Option` will contain a tuple with the same length.
- If a struct is supplied, then the returned `Option` will contain a struct with the same keys.
- If an iterable is supplied, then the returned `Option` will contain an array.

## Type Parameters

• **I** *extends* `Iterable`\<[`Option`](../type-aliases/Option.md)\<`any`\>\> \| `Record`\<`string`, [`Option`](../type-aliases/Option.md)\<`any`\>\>

## Parameters

### input

`I`

## Returns

\[`I`\] *extends* \[readonly [`Option`](../type-aliases/Option.md)\<`any`\>[]\] ? [`Option`](../type-aliases/Option.md)\<\{ -readonly \[K in string \| number \| symbol\]: \[I\<I\>\[K\]\] extends \[Option\<A\>\] ? A : never \}\> : \[`I`\] *extends* \[`Iterable`\<[`Option`](../type-aliases/Option.md)\<`A`\>\>\] ? [`Option`](../type-aliases/Option.md)\<`A`[]\> : [`Option`](../type-aliases/Option.md)\<\{ -readonly \[K in string \| number \| symbol\]: \[I\[K\]\] extends \[Option\<A\>\] ? A : never \}\>

## Example

```ts
import { Option } from "effect"

assert.deepStrictEqual(Option.all([Option.some(1), Option.some(2)]), Option.some([1, 2]))
assert.deepStrictEqual(Option.all({ a: Option.some(1), b: Option.some("hello") }), Option.some({ a: 1, b: "hello" }))
assert.deepStrictEqual(Option.all({ a: Option.some(1), b: Option.none() }), Option.none())
```

## Since

2.0.0
