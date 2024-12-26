[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / isRecord

# Function: isRecord()

> **isRecord**(`input`): input is (x: string \| symbol) =\> unknown

A guard that succeeds when the input is a record.

## Parameters

### input

`unknown`

The value to test.

## Returns

input is (x: string \| symbol) =\> unknown

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
