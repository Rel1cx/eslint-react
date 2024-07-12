[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / intersection

# Function: intersection()

Merge two records, retaining only the entries that exist in both records.

## Param

The first record.

## Param

The second record to merge with the first.

## Param

A function to specify how to merge entries with the same key.

## Since

2.0.0

## intersection(that, combine)

> **intersection**\<`K1`, `A`, `B`, `C`\>(`that`, `combine`): \<`K0`\>(`self`) => `Record`\<[`IntersectKeys`](../namespaces/ReadonlyRecord/type-aliases/IntersectKeys.md)\<`K0`, `K1`\>, `C`\>

Merge two records, retaining only the entries that exist in both records.

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

`Record`\<[`IntersectKeys`](../namespaces/ReadonlyRecord/type-aliases/IntersectKeys.md)\<`K0`, `K1`\>, `C`\>

### Param

The first record.

### Param

The second record to merge with the first.

### Param

A function to specify how to merge entries with the same key.

### Since

2.0.0

## intersection(self, that, combine)

> **intersection**\<`K0`, `A`, `K1`, `B`, `C`\>(`self`, `that`, `combine`): `Record`\<[`IntersectKeys`](../namespaces/ReadonlyRecord/type-aliases/IntersectKeys.md)\<`K0`, `K1`\>, `C`\>

Merge two records, retaining only the entries that exist in both records.

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

`Record`\<[`IntersectKeys`](../namespaces/ReadonlyRecord/type-aliases/IntersectKeys.md)\<`K0`, `K1`\>, `C`\>

### Param

The first record.

### Param

The second record to merge with the first.

### Param

A function to specify how to merge entries with the same key.

### Since

2.0.0
