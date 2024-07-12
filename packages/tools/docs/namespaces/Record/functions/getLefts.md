[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / getLefts

# Function: getLefts()

> **getLefts**\<`K`, `R`, `L`\>(`self`): `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `L`\>

Given a record with `Either` values, returns a new record containing only the `Left` values, preserving the original keys.

## Type Parameters

• **K** *extends* `string`

• **R**

• **L**

## Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, [`Either`](../../E/type-aliases/Either.md)\<`R`, `L`\>\>

## Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `L`\>

## Example

```ts
import { Record, Either } from "effect"

assert.deepStrictEqual(
  Record.getLefts({ a: Either.right(1), b: Either.left("err"), c: Either.right(2) }),
  { b: "err" }
)
```

## Since

2.0.0
