[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / toEntries

# Function: toEntries()

> **toEntries**\<`K`, `A`\>(`self`): [`K`, `A`][]

Takes a record and returns an array of tuples containing its keys and values.

## Type Parameters

• **K** *extends* `string`

• **A**

## Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

The record to transform.

## Returns

[`K`, `A`][]

## Example

```ts
import { toEntries } from "effect/Record"

const x = { a: 1, b: 2, c: 3 }
assert.deepStrictEqual(toEntries(x), [["a", 1], ["b", 2], ["c", 3]])
```

## Since

2.0.0
