[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / union

# Function: union()

Merge two records, preserving entries that exist in either of the records.

## Param

The first record.

## Param

The second record to combine with the first.

## Param

A function to specify how to merge entries with the same key.

## Since

2.0.0

## union(that, combine)

> **union**\<`K1`, `A`, `B`, `C`\>(`that`, `combine`): \<`K0`\>(`self`) => `Record`\<`K1` \| `K0`, `A` \| `B` \| `C`\>

Merge two records, preserving entries that exist in either of the records.

### Type Parameters

• **K1** *extends* `string`

• **A**

• **B**

• **C**

### Parameters

• **that**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K1`, `B`\>

• **combine**

### Returns

`Function`

#### Type Parameters

• **K0** *extends* `string`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K0`, `A`\>

#### Returns

`Record`\<`K1` \| `K0`, `A` \| `B` \| `C`\>

### Param

The first record.

### Param

The second record to combine with the first.

### Param

A function to specify how to merge entries with the same key.

### Since

2.0.0

## union(self, that, combine)

> **union**\<`K0`, `A`, `K1`, `B`, `C`\>(`self`, `that`, `combine`): `Record`\<`K0` \| `K1`, `A` \| `B` \| `C`\>

Merge two records, preserving entries that exist in either of the records.

### Type Parameters

• **K0** *extends* `string`

• **A**

• **K1** *extends* `string`

• **B**

• **C**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K0`, `A`\>

• **that**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K1`, `B`\>

• **combine**

### Returns

`Record`\<`K0` \| `K1`, `A` \| `B` \| `C`\>

### Param

The first record.

### Param

The second record to combine with the first.

### Param

A function to specify how to merge entries with the same key.

### Since

2.0.0
