[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / some

# Function: some()

Check if any entry in a record meets a specific condition.

## Param

The record to check.

## Param

The condition to test entries (value, key).

## Since

2.0.0

## some(predicate)

> **some**\<`A`, `K`\>(`predicate`): (`self`) => `boolean`

Check if any entry in a record meets a specific condition.

### Type Parameters

• **A**

• **K** *extends* `string`

### Parameters

• **predicate**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`boolean`

### Param

The record to check.

### Param

The condition to test entries (value, key).

### Since

2.0.0

## some(self, predicate)

> **some**\<`K`, `A`\>(`self`, `predicate`): `boolean`

Check if any entry in a record meets a specific condition.

### Type Parameters

• **K** *extends* `string`

• **A**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **predicate**

### Returns

`boolean`

### Param

The record to check.

### Param

The condition to test entries (value, key).

### Since

2.0.0
