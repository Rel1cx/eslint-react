[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / all

# Function: all()

> **all**\<`I`\>(`input`): [`I`] *extends* [readonly [`Either`](../type-aliases/Either.md)\<`any`, `any`\>[]] ? [`Either`](../type-aliases/Either.md)\<\{ -readonly \[K in string \| number \| symbol\]: \[I\<I\>\[K\]\] extends \[Either\<R, any\>\] ? R : never \}, `I`\<`I`\>\[`number`\] *extends* `never` ? `never` : [`I`\<`I`\>\[`number`\]] *extends* [[`Either`](../type-aliases/Either.md)\<`any`, `L`\>] ? `L` : `never`\> : [`I`] *extends* [`Iterable`\<[`Either`](../type-aliases/Either.md)\<`R`, `L`\>, `any`, `any`\>] ? [`Either`](../type-aliases/Either.md)\<`R`[], `L`\> : [`Either`](../type-aliases/Either.md)\<\{ -readonly \[K in string \| number \| symbol\]: \[I\[K\]\] extends \[Either\<R, any\>\] ? R : never \}, `I`\[keyof `I`\] *extends* `never` ? `never` : [`I`\[keyof `I`\]] *extends* [[`Either`](../type-aliases/Either.md)\<`any`, `L`\>] ? `L` : `never`\>

Takes a structure of `Either`s and returns an `Either` of values with the same structure.

- If a tuple is supplied, then the returned `Either` will contain a tuple with the same length.
- If a struct is supplied, then the returned `Either` will contain a struct with the same keys.
- If an iterable is supplied, then the returned `Either` will contain an array.

## Type Parameters

• **I** *extends* `Iterable`\<[`Either`](../type-aliases/Either.md)\<`any`, `any`\>, `any`, `any`\> \| `Record`\<`string`, [`Either`](../type-aliases/Either.md)\<`any`, `any`\>\>

## Parameters

• **input**: `I`

## Returns

[`I`] *extends* [readonly [`Either`](../type-aliases/Either.md)\<`any`, `any`\>[]] ? [`Either`](../type-aliases/Either.md)\<\{ -readonly \[K in string \| number \| symbol\]: \[I\<I\>\[K\]\] extends \[Either\<R, any\>\] ? R : never \}, `I`\<`I`\>\[`number`\] *extends* `never` ? `never` : [`I`\<`I`\>\[`number`\]] *extends* [[`Either`](../type-aliases/Either.md)\<`any`, `L`\>] ? `L` : `never`\> : [`I`] *extends* [`Iterable`\<[`Either`](../type-aliases/Either.md)\<`R`, `L`\>, `any`, `any`\>] ? [`Either`](../type-aliases/Either.md)\<`R`[], `L`\> : [`Either`](../type-aliases/Either.md)\<\{ -readonly \[K in string \| number \| symbol\]: \[I\[K\]\] extends \[Either\<R, any\>\] ? R : never \}, `I`\[keyof `I`\] *extends* `never` ? `never` : [`I`\[keyof `I`\]] *extends* [[`Either`](../type-aliases/Either.md)\<`any`, `L`\>] ? `L` : `never`\>

## Example

```ts
import { Either } from "effect"

assert.deepStrictEqual(Either.all([Either.right(1), Either.right(2)]), Either.right([1, 2]))
assert.deepStrictEqual(Either.all({ right: Either.right(1), b: Either.right("hello") }), Either.right({ right: 1, b: "hello" }))
assert.deepStrictEqual(Either.all({ right: Either.right(1), b: Either.left("error") }), Either.left("error"))
```

## Category

combining

## Since

2.0.0
