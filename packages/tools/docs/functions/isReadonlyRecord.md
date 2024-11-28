[**@eslint-react/tools**](../README.md)

***

[@eslint-react/tools](../README.md) / isReadonlyRecord

# Function: isReadonlyRecord()

> **isReadonlyRecord**(`input`): input is (x: string \| symbol) =\> unknown

A guard that succeeds when the input is a readonly record.

## Parameters

### input

`unknown`

The value to test.

## Returns

input is (x: string \| symbol) =\> unknown

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
