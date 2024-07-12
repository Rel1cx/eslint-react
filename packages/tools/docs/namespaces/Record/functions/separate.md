[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / separate

# Function: separate()

> **separate**\<`K`, `A`, `B`\>(`self`): [`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>]

Partitions a record of `Either` values into two separate records,
one with the `Left` values and one with the `Right` values.

## Type Parameters

• **K** *extends* `string`

• **A**

• **B**

## Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, [`Either`](../../E/type-aliases/Either.md)\<`B`, `A`\>\>

the record to partition.

## Returns

[`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>, `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `B`\>]

## Example

```ts
import { Record, Either } from "effect"

assert.deepStrictEqual(
  Record.separate({ a: Either.left("e"), b: Either.right(1) }),
  [{ a: "e" }, { b: 1 }]
)
```

## Since

2.0.0
