[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Record](../README.md) / reduce

# Function: reduce()

Reduce a record to a single value by combining its entries with a specified function.

## Param

The record to reduce.

## Param

The initial value of the accumulator.

## Param

The function to combine entries (accumulator, value, key).

## Since

2.0.0

## reduce(zero, f)

> **reduce**\<`Z`, `V`, `K`\>(`zero`, `f`): (`self`) => `Z`

Reduce a record to a single value by combining its entries with a specified function.

### Type Parameters

• **Z**

• **V**

• **K** *extends* `string`

### Parameters

• **zero**: `Z`

• **f**

### Returns

`Function`

#### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `V`\>

#### Returns

`Z`

### Param

The record to reduce.

### Param

The initial value of the accumulator.

### Param

The function to combine entries (accumulator, value, key).

### Since

2.0.0

## reduce(self, zero, f)

> **reduce**\<`K`, `V`, `Z`\>(`self`, `zero`, `f`): `Z`

Reduce a record to a single value by combining its entries with a specified function.

### Type Parameters

• **K** *extends* `string`

• **V**

• **Z**

### Parameters

• **self**: [`ReadonlyRecord`](../type-aliases/ReadonlyRecord.md)\<`K`, `V`\>

• **zero**: `Z`

• **f**

### Returns

`Z`

### Param

The record to reduce.

### Param

The initial value of the accumulator.

### Param

The function to combine entries (accumulator, value, key).

### Since

2.0.0
