[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / every

# Function: every()

Check if all entries in a record meet a specific condition.

## Param

The record to check.

## Param

The condition to test entries (value, key).

## Since

2.0.0

## every(refinement)

> **every**\<`A`, `K`, `B`\>(`refinement`): (`self`) => `self is ReadonlyRecord<K, B>`

Check if all entries in a record meet a specific condition.

### Type Parameters

• **A**

• **K** *extends* `string`

• **B**

### Parameters

• **refinement**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`self is ReadonlyRecord<K, B>`

### Param

The record to check.

### Param

The condition to test entries (value, key).

### Since

2.0.0

## every(predicate)

> **every**\<`A`, `K`\>(`predicate`): (`self`) => `boolean`

Check if all entries in a record meet a specific condition.

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

## every(self, refinement)

> **every**\<`A`, `K`, `B`\>(`self`, `refinement`): `self is ReadonlyRecord<K, B>`

Check if all entries in a record meet a specific condition.

### Type Parameters

• **A**

• **K** *extends* `string`

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **refinement**

### Returns

`self is ReadonlyRecord<K, B>`

### Param

The record to check.

### Param

The condition to test entries (value, key).

### Since

2.0.0

## every(self, predicate)

> **every**\<`K`, `A`\>(`self`, `predicate`): `boolean`

Check if all entries in a record meet a specific condition.

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
