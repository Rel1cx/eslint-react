[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / fromIterableBy

# Function: fromIterableBy()

> **fromIterableBy**\<`A`, `K`\>(`items`, `f`): `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>

Creates a new record from an iterable, utilizing the provided function to determine the key for each element.

## Type Parameters

• **A**

• **K** *extends* `string` \| `symbol`

## Parameters

• **items**: `Iterable`\<`A`\>

An iterable containing elements.

• **f**

A function that extracts the key for each element.

## Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>

## Example

```ts
import { fromIterableBy } from "effect/Record"

const users = [
  { id: "2", name: "name2" },
  { id: "1", name: "name1" }
]

assert.deepStrictEqual(
  fromIterableBy(users, user => user.id),
  {
    "2": { id: "2", name: "name2" },
    "1": { id: "1", name: "name1" }
  }
)
```

## Since

2.0.0
