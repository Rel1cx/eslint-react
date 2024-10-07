[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / andThen

# Function: andThen()

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

## Since

2.0.0

## andThen(f)

> **andThen**\<`R`, `R2`, `L2`\>(`f`): \<`L`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L2` \| `L`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

### Type Parameters

• **R**

• **R2**

• **L2**

### Parameters

• **f**

### Returns

`Function`

#### Type Parameters

• **L**

#### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L2` \| `L`\>

### Since

2.0.0

### Since

2.0.0

## andThen(f)

> **andThen**\<`R2`, `L2`\>(`f`): \<`L`, `R1`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L2` \| `L`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

### Type Parameters

• **R2**

• **L2**

### Parameters

• **f**: [`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

### Returns

`Function`

#### Type Parameters

• **L**

• **R1**

#### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R1`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L2` \| `L`\>

### Since

2.0.0

### Since

2.0.0

## andThen(f)

> **andThen**\<`R`, `R2`\>(`f`): \<`L`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

### Type Parameters

• **R**

• **R2**

### Parameters

• **f**

### Returns

`Function`

#### Type Parameters

• **L**

#### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

### Since

2.0.0

### Since

2.0.0

## andThen(right)

> **andThen**\<`R2`\>(`right`): \<`R1`, `L`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

### Type Parameters

• **R2**

### Parameters

• **right**: `NotFunction`\<`R2`\>

### Returns

`Function`

#### Type Parameters

• **R1**

• **L**

#### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R1`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

### Since

2.0.0

### Since

2.0.0

## andThen(self, f)

> **andThen**\<`R`, `L`, `R2`, `L2`\>(`self`, `f`): [`Either`](../type-aliases/Either.md)\<`R2`, `L` \| `L2`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

### Type Parameters

• **R**

• **L**

• **R2**

• **L2**

### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

• **f**

### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L` \| `L2`\>

### Since

2.0.0

### Since

2.0.0

## andThen(self, f)

> **andThen**\<`R`, `L`, `R2`, `L2`\>(`self`, `f`): [`Either`](../type-aliases/Either.md)\<`R2`, `L` \| `L2`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

### Type Parameters

• **R**

• **L**

• **R2**

• **L2**

### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

• **f**: [`Either`](../type-aliases/Either.md)\<`R2`, `L2`\>

### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L` \| `L2`\>

### Since

2.0.0

### Since

2.0.0

## andThen(self, f)

> **andThen**\<`R`, `L`, `R2`\>(`self`, `f`): [`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

### Type Parameters

• **R**

• **L**

• **R2**

### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

• **f**

### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

### Since

2.0.0

### Since

2.0.0

## andThen(self, f)

> **andThen**\<`R`, `L`, `R2`\>(`self`, `f`): [`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

### Type Parameters

• **R**

• **L**

• **R2**

### Parameters

• **self**: [`Either`](../type-aliases/Either.md)\<`R`, `L`\>

• **f**: `NotFunction`\<`R2`\>

### Returns

[`Either`](../type-aliases/Either.md)\<`R2`, `L`\>

### Since

2.0.0

### Since

2.0.0
