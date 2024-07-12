[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / difference

# Function: difference()

Merge two records, preserving only the entries that are unique to each record.

## Param

The first record.

## Param

The second record to compare with the first.

## Since

2.0.0

## difference(that)

> **difference**\<`K1`, `B`\>(`that`): \<`K0`, `A`\>(`self`) => `Record`\<`K1` \| `K0`, `B` \| `A`\>

Merge two records, preserving only the entries that are unique to each record.

### Type Parameters

• **K1** *extends* `string`

• **B**

### Parameters

• **that**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K1`, `B`\>

### Returns

`Function`

#### Type Parameters

• **K0** *extends* `string`

• **A**

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K0`, `A`\>

#### Returns

`Record`\<`K1` \| `K0`, `B` \| `A`\>

### Param

The first record.

### Param

The second record to compare with the first.

### Since

2.0.0

## difference(self, that)

> **difference**\<`K0`, `A`, `K1`, `B`\>(`self`, `that`): `Record`\<`K0` \| `K1`, `A` \| `B`\>

Merge two records, preserving only the entries that are unique to each record.

### Type Parameters

• **K0** *extends* `string`

• **A**

• **K1** *extends* `string`

• **B**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K0`, `A`\>

• **that**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K1`, `B`\>

### Returns

`Record`\<`K0` \| `K1`, `A` \| `B`\>

### Param

The first record.

### Param

The second record to compare with the first.

### Since

2.0.0
