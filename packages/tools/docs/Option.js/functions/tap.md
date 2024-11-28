[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / tap

# Function: tap()

Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
unless `f` returns `None`, in which case it returns `None`.

This function is useful for performing additional computations on the value of the input `Option` without affecting its value.

## Param

Function to apply to the value of the `Option` if it is `Some`

## Param

The `Option` to apply the function to

## Example

```ts
import { Option } from "effect"

const getInteger = (n: number) => Number.isInteger(n) ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.tap(Option.none(), getInteger), Option.none())
assert.deepStrictEqual(Option.tap(Option.some(1), getInteger), Option.some(1))
assert.deepStrictEqual(Option.tap(Option.some(1.14), getInteger), Option.none())
```

## Since

2.0.0

## Call Signature

> **tap**\<`A`, `X`\>(`f`): (`self`) => [`Option`](../type-aliases/Option.md)\<`A`\>

Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
unless `f` returns `None`, in which case it returns `None`.

This function is useful for performing additional computations on the value of the input `Option` without affecting its value.

### Type Parameters

• **A**

• **X**

### Parameters

#### f

(`a`) => [`Option`](../type-aliases/Option.md)\<`X`\>

Function to apply to the value of the `Option` if it is `Some`

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

Function to apply to the value of the `Option` if it is `Some`

### Param

The `Option` to apply the function to

### Examples

```ts
import { Option } from "effect"

const getInteger = (n: number) => Number.isInteger(n) ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.tap(Option.none(), getInteger), Option.none())
assert.deepStrictEqual(Option.tap(Option.some(1), getInteger), Option.some(1))
assert.deepStrictEqual(Option.tap(Option.some(1.14), getInteger), Option.none())
```

```ts
import { Option } from "effect"

const getInteger = (n: number) => Number.isInteger(n) ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.tap(Option.none(), getInteger), Option.none())
assert.deepStrictEqual(Option.tap(Option.some(1), getInteger), Option.some(1))
assert.deepStrictEqual(Option.tap(Option.some(1.14), getInteger), Option.none())
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **tap**\<`A`, `X`\>(`self`, `f`): [`Option`](../type-aliases/Option.md)\<`A`\>

Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
unless `f` returns `None`, in which case it returns `None`.

This function is useful for performing additional computations on the value of the input `Option` without affecting its value.

### Type Parameters

• **A**

• **X**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to apply the function to

#### f

(`a`) => [`Option`](../type-aliases/Option.md)\<`X`\>

Function to apply to the value of the `Option` if it is `Some`

### Returns

[`Option`](../type-aliases/Option.md)\<`A`\>

### Param

Function to apply to the value of the `Option` if it is `Some`

### Param

The `Option` to apply the function to

### Examples

```ts
import { Option } from "effect"

const getInteger = (n: number) => Number.isInteger(n) ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.tap(Option.none(), getInteger), Option.none())
assert.deepStrictEqual(Option.tap(Option.some(1), getInteger), Option.some(1))
assert.deepStrictEqual(Option.tap(Option.some(1.14), getInteger), Option.none())
```

```ts
import { Option } from "effect"

const getInteger = (n: number) => Number.isInteger(n) ? Option.some(n) : Option.none()

assert.deepStrictEqual(Option.tap(Option.none(), getInteger), Option.none())
assert.deepStrictEqual(Option.tap(Option.some(1), getInteger), Option.some(1))
assert.deepStrictEqual(Option.tap(Option.some(1.14), getInteger), Option.none())
```

### Since

2.0.0

### Since

2.0.0
