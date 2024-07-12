[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Pred](../README.md) / isReadonlyRecord

# Function: isReadonlyRecord()

> **isReadonlyRecord**(`input`): `input is Object`

A guard that succeeds when the input is a readonly record.

## Parameters

• **input**: `unknown`

The value to test.

## Returns

`input is Object`

## Example

```ts
import { isReadonlyRecord } from "effect/Predicate"

assert.deepStrictEqual(isReadonlyRecord({}), true)
assert.deepStrictEqual(isReadonlyRecord({ a: 1 }), true)

assert.deepStrictEqual(isReadonlyRecord([]), false)
assert.deepStrictEqual(isReadonlyRecord([1, 2, 3]), false)
assert.deepStrictEqual(isReadonlyRecord(null), false)
assert.deepStrictEqual(isReadonlyRecord(undefined), false)
```

## Since

2.0.0
