[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / isEmptyReadonlyRecord

# Function: isEmptyReadonlyRecord()

> **isEmptyReadonlyRecord**\<`K`, `A`\>(`self`): `self is ReadonlyRecord<K, never>`

Determine if a record is empty.

## Type Parameters

• **K** *extends* `string`

• **A**

## Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

record to test for emptiness.

## Returns

`self is ReadonlyRecord<K, never>`

## Example

```ts
import { isEmptyReadonlyRecord } from "effect/Record"

assert.deepStrictEqual(isEmptyReadonlyRecord({}), true);
assert.deepStrictEqual(isEmptyReadonlyRecord({ a: 3 }), false);
```

## Since

2.0.0
