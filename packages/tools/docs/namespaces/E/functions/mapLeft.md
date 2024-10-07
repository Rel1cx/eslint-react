[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / mapLeft

# Function: mapLeft()

Maps the `Left` side of an `Either` value to a new `Either` value.

## Param

The input `Either` value to map.

## Param

A transformation function to apply to the `Left` value of the input `Either`.

## Since

2.0.0

## mapLeft(f)

> **mapLeft**\<`L`, `L2`\>(`f`): \<`R`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R`, `L2`\>

Maps the `Left` side of an `Either` value to a new `Either` value.

### Type Parameters

• **L**

• **L2**

### Parameters

• **f**

A transformation function to apply to the `Left` value of the input `Either`.

### Returns

`Function`

#### Type Parameters

• **R**

#### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `L2`\>

### Param

The input `Either` value to map.

### Param

A transformation function to apply to the `Left` value of the input `Either`.

### Since

2.0.0

### Since

2.0.0

## mapLeft(self, f)

> **mapLeft**\<`R`, `L`, `L2`\>(`self`, `f`): [`Either`](../type-aliases/Either.md)\<`R`, `L2`\>

Maps the `Left` side of an `Either` value to a new `Either` value.

### Type Parameters

• **R**

• **L**

• **L2**

### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

The input `Either` value to map.

• **f**

A transformation function to apply to the `Left` value of the input `Either`.

### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `L2`\>

### Param

The input `Either` value to map.

### Param

A transformation function to apply to the `Left` value of the input `Either`.

### Since

2.0.0

### Since

2.0.0
