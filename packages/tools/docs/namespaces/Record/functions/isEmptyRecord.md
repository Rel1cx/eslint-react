[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / isEmptyRecord

# Function: isEmptyRecord()

> **isEmptyRecord**\<`K`, `A`\>(`self`): `self is Record<K, never>`

Determine if a record is empty.

## Type Parameters

• **K** *extends* `string`

• **A**

## Parameters

• **self**: `Record`\<`K`, `A`\>

record to test for emptiness.

## Returns

`self is Record<K, never>`

## Example

```ts
import { isEmptyRecord } from "effect/Record"

assert.deepStrictEqual(isEmptyRecord({}), true);
assert.deepStrictEqual(isEmptyRecord({ a: 3 }), false);
```

## Since

2.0.0
