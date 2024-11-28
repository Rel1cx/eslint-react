[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / andThen

# Function: andThen()

Executes a sequence of two `Option`s. The second `Option` can be dependent on the result of the first `Option`.

## Since

2.0.0

## Call Signature

> **andThen**\<`A`, `B`\>(`f`): (`self`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Executes a sequence of two `Option`s. The second `Option` can be dependent on the result of the first `Option`.

### Type Parameters

• **A**

• **B**

### Parameters

#### f

(`a`) => [`Option`](../type-aliases/Option.md)\<`B`\>

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **andThen**\<`B`\>(`f`): \<`A`\>(`self`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Executes a sequence of two `Option`s. The second `Option` can be dependent on the result of the first `Option`.

### Type Parameters

• **B**

### Parameters

#### f

[`Option`](../type-aliases/Option.md)\<`B`\>

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **andThen**\<`A`, `B`\>(`f`): (`self`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Executes a sequence of two `Option`s. The second `Option` can be dependent on the result of the first `Option`.

### Type Parameters

• **A**

• **B**

### Parameters

#### f

(`a`) => `B`

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **andThen**\<`B`\>(`f`): \<`A`\>(`self`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Executes a sequence of two `Option`s. The second `Option` can be dependent on the result of the first `Option`.

### Type Parameters

• **B**

### Parameters

#### f

`NotFunction`\<`B`\>

### Returns

`Function`

#### Type Parameters

• **A**

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **andThen**\<`A`, `B`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`B`\>

Executes a sequence of two `Option`s. The second `Option` can be dependent on the result of the first `Option`.

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### f

(`a`) => [`Option`](../type-aliases/Option.md)\<`B`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **andThen**\<`A`, `B`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`B`\>

Executes a sequence of two `Option`s. The second `Option` can be dependent on the result of the first `Option`.

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### f

[`Option`](../type-aliases/Option.md)\<`B`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **andThen**\<`A`, `B`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`B`\>

Executes a sequence of two `Option`s. The second `Option` can be dependent on the result of the first `Option`.

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### f

(`a`) => `B`

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **andThen**\<`A`, `B`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`B`\>

Executes a sequence of two `Option`s. The second `Option` can be dependent on the result of the first `Option`.

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### f

`NotFunction`\<`B`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Since

2.0.0

### Since

2.0.0
