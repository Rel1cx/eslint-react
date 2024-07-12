[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Pred](../README.md) / isRecord

# Function: isRecord()

> **isRecord**(`input`): `input is Object`

A guard that succeeds when the input is a record.

## Parameters

• **input**: `unknown`

The value to test.

## Returns

`input is Object`

## Example

```ts
import { isRecord } from "effect/Predicate"

assert.deepStrictEqual(isRecord({}), true)
assert.deepStrictEqual(isRecord({ a: 1 }), true)

assert.deepStrictEqual(isRecord([]), false)
assert.deepStrictEqual(isRecord([1, 2, 3]), false)
assert.deepStrictEqual(isRecord(null), false)
assert.deepStrictEqual(isRecord(undefined), false)
assert.deepStrictEqual(isRecord(() => null), false)
```

## Since

2.0.0
