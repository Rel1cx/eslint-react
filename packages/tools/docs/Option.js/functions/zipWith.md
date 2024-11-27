[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / zipWith

# Function: zipWith()

Zips two `Option` values together using a provided function, returning a new `Option` of the result.

## Param

The left-hand side of the zip operation

## Param

The right-hand side of the zip operation

## Param

The function used to combine the values of the two `Option`s

## Example

```ts
import { Option } from "effect"

type Complex = [real: number, imaginary: number]

const complex = (real: number, imaginary: number): Complex => [real, imaginary]

assert.deepStrictEqual(Option.zipWith(Option.none(), Option.none(), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.some(1), Option.none(), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.none(), Option.some(1), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.some(1), Option.some(2), complex), Option.some([1, 2]))

assert.deepStrictEqual(Option.zipWith(Option.some(1), complex)(Option.some(2)), Option.some([2, 1]))
```

## Category

zipping

## Since

2.0.0

## zipWith(that, f)

> **zipWith**\<`B`, `A`, `C`\>(`that`, `f`): (`self`) => [`Option`](../type-aliases/Option.md)\<`C`\>

Zips two `Option` values together using a provided function, returning a new `Option` of the result.

### Type Parameters

• **B**

• **A**

• **C**

### Parameters

• **that**: [`Option`](../type-aliases/Option.md)\<`B`\>

The right-hand side of the zip operation

• **f**

The function used to combine the values of the two `Option`s

### Returns

`Function`

#### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

[`Option`](../type-aliases/Option.md)\<`C`\>

### Param

The left-hand side of the zip operation

### Param

The right-hand side of the zip operation

### Param

The function used to combine the values of the two `Option`s

### Examples

```ts
import { Option } from "effect"

type Complex = [real: number, imaginary: number]

const complex = (real: number, imaginary: number): Complex => [real, imaginary]

assert.deepStrictEqual(Option.zipWith(Option.none(), Option.none(), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.some(1), Option.none(), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.none(), Option.some(1), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.some(1), Option.some(2), complex), Option.some([1, 2]))

assert.deepStrictEqual(Option.zipWith(Option.some(1), complex)(Option.some(2)), Option.some([2, 1]))
```

```ts
import { Option } from "effect"

type Complex = [real: number, imaginary: number]

const complex = (real: number, imaginary: number): Complex => [real, imaginary]

assert.deepStrictEqual(Option.zipWith(Option.none(), Option.none(), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.some(1), Option.none(), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.none(), Option.some(1), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.some(1), Option.some(2), complex), Option.some([1, 2]))

assert.deepStrictEqual(Option.zipWith(Option.some(1), complex)(Option.some(2)), Option.some([2, 1]))
```

### Category

zipping

### Since

2.0.0

### Category

zipping

### Since

2.0.0

## zipWith(self, that, f)

> **zipWith**\<`A`, `B`, `C`\>(`self`, `that`, `f`): [`Option`](../type-aliases/Option.md)\<`C`\>

Zips two `Option` values together using a provided function, returning a new `Option` of the result.

### Type Parameters

• **A**

• **B**

• **C**

### Parameters

• **self**: [`Option`](../type-aliases/Option.md)\<`A`\>

The left-hand side of the zip operation

• **that**: [`Option`](../type-aliases/Option.md)\<`B`\>

The right-hand side of the zip operation

• **f**

The function used to combine the values of the two `Option`s

### Returns

[`Option`](../type-aliases/Option.md)\<`C`\>

### Param

The left-hand side of the zip operation

### Param

The right-hand side of the zip operation

### Param

The function used to combine the values of the two `Option`s

### Examples

```ts
import { Option } from "effect"

type Complex = [real: number, imaginary: number]

const complex = (real: number, imaginary: number): Complex => [real, imaginary]

assert.deepStrictEqual(Option.zipWith(Option.none(), Option.none(), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.some(1), Option.none(), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.none(), Option.some(1), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.some(1), Option.some(2), complex), Option.some([1, 2]))

assert.deepStrictEqual(Option.zipWith(Option.some(1), complex)(Option.some(2)), Option.some([2, 1]))
```

```ts
import { Option } from "effect"

type Complex = [real: number, imaginary: number]

const complex = (real: number, imaginary: number): Complex => [real, imaginary]

assert.deepStrictEqual(Option.zipWith(Option.none(), Option.none(), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.some(1), Option.none(), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.none(), Option.some(1), complex), Option.none())
assert.deepStrictEqual(Option.zipWith(Option.some(1), Option.some(2), complex), Option.some([1, 2]))

assert.deepStrictEqual(Option.zipWith(Option.some(1), complex)(Option.some(2)), Option.some([2, 1]))
```

### Category

zipping

### Since

2.0.0

### Category

zipping

### Since

2.0.0
