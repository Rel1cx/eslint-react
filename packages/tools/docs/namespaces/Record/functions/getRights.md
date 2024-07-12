[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / getRights

# Function: getRights()

> **getRights**\<`K`, `R`, `L`\>(`self`): `Record`\<`string`, `R`\>

Given a record with `Either` values, returns a new record containing only the `Right` values, preserving the original keys.

## Type Parameters

• **K** *extends* `string`

• **R**

• **L**

## Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, [`Either`](../../E/type-aliases/Either.md)\<`R`, `L`\>\>

## Returns

`Record`\<`string`, `R`\>

## Example

```ts
import { Record, Either } from "effect"

assert.deepStrictEqual(
  Record.getRights({ a: Either.right(1), b: Either.left("err"), c: Either.right(2) }),
  { a: 1, c: 2 }
)
```

## Since

2.0.0
