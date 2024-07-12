[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / fromEntries

# Function: fromEntries()

> **fromEntries**\<`Entry`\>(`entries`): `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`Entry`\[`0`\]\>, `Entry`\[`1`\]\>

Builds a record from an iterable of key-value pairs.

If there are conflicting keys when using `fromEntries`, the last occurrence of the key/value pair will overwrite the
previous ones. So the resulting record will only have the value of the last occurrence of each key.

## Type Parameters

• **Entry** *extends* readonly [`string` \| `symbol`, `any`]

## Parameters

• **entries**: `Iterable`\<`Entry`\>

## Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`Entry`\[`0`\]\>, `Entry`\[`1`\]\>

## Example

```ts
import { fromEntries } from "effect/Record"

const input: Array<[string, number]> = [["a", 1], ["b", 2]]

assert.deepStrictEqual(fromEntries(input), { a: 1, b: 2 })
```

## Since

2.0.0
