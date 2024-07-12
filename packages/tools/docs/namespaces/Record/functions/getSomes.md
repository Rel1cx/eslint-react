[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / getSomes

# Function: getSomes()

> **getSomes**\<`K`, `A`\>(`self`): `Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>

Given a record with `Option` values, returns a new record containing only the `Some` values, preserving the original keys.

## Type Parameters

• **K** *extends* `string`

• **A**

## Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, [`Option`](../../O/type-aliases/Option.md)\<`A`\>\>

A record with `Option` values.

## Returns

`Record`\<[`NonLiteralKey`](../namespaces/ReadonlyRecord/type-aliases/NonLiteralKey.md)\<`K`\>, `A`\>

## Example

```ts
import { Record, Option } from "effect"

assert.deepStrictEqual(
  Record.getSomes({ a: Option.some(1), b: Option.none(), c: Option.some(2) }),
  { a: 1, c: 2 }
)
```

## Since

2.0.0
