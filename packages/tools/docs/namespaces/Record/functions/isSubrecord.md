[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / isSubrecord

# Function: isSubrecord()

Check if one record is a subrecord of another, meaning it contains all the keys and values found in the second record.
This comparison uses default equality checks (`Equal.equivalence()`).

## Param

The first record to check.

## Param

The second record to compare against.

## Since

2.0.0

## isSubrecord(that)

> **isSubrecord**\<`K`, `A`\>(`that`): (`self`) => `boolean`

Check if one record is a subrecord of another, meaning it contains all the keys and values found in the second record.
This comparison uses default equality checks (`Equal.equivalence()`).

### Type Parameters

• **K** *extends* `string`

• **A**

### Parameters

• **that**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

#### Returns

`boolean`

### Param

The first record to check.

### Param

The second record to compare against.

### Since

2.0.0

## isSubrecord(self, that)

> **isSubrecord**\<`K`, `A`\>(`self`, `that`): `boolean`

Check if one record is a subrecord of another, meaning it contains all the keys and values found in the second record.
This comparison uses default equality checks (`Equal.equivalence()`).

### Type Parameters

• **K** *extends* `string`

• **A**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

• **that**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `A`\>

### Returns

`boolean`

### Param

The first record to check.

### Param

The second record to compare against.

### Since

2.0.0
