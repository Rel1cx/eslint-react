[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / exists

# Function: exists()

Check if a value in an `Option` type meets a certain predicate.

## Param

The `Option` to check.

## Param

The condition to check.

## Example

```ts
import { pipe, Option } from "effect"

const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(pipe(Option.some(2), Option.exists(isEven)), true)
assert.deepStrictEqual(pipe(Option.some(1), Option.exists(isEven)), false)
assert.deepStrictEqual(pipe(Option.none(), Option.exists(isEven)), false)
```

## Since

2.0.0

## Call Signature

> **exists**\<`A`, `B`\>(`refinement`): (`self`) => `self is Option<B>`

Check if a value in an `Option` type meets a certain predicate.

### Type Parameters

• **A**

• **B**

### Parameters

#### refinement

[`Refinement`](../../interfaces/Refinement.md)\<`NoInfer`\<`A`\>, `B`\>

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

`self is Option<B>`

### Param

The `Option` to check.

### Param

The condition to check.

### Examples

```ts
import { pipe, Option } from "effect"

const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(pipe(Option.some(2), Option.exists(isEven)), true)
assert.deepStrictEqual(pipe(Option.some(1), Option.exists(isEven)), false)
assert.deepStrictEqual(pipe(Option.none(), Option.exists(isEven)), false)
```

```ts
import { pipe, Option } from "effect"

const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(pipe(Option.some(2), Option.exists(isEven)), true)
assert.deepStrictEqual(pipe(Option.some(1), Option.exists(isEven)), false)
assert.deepStrictEqual(pipe(Option.none(), Option.exists(isEven)), false)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **exists**\<`A`\>(`predicate`): (`self`) => `boolean`

Check if a value in an `Option` type meets a certain predicate.

### Type Parameters

• **A**

### Parameters

#### predicate

[`Predicate`](../../interfaces/Predicate.md)\<`NoInfer`\<`A`\>\>

The condition to check.

### Returns

`Function`

#### Parameters

##### self

[`Option`](../type-aliases/Option.md)\<`A`\>

#### Returns

`boolean`

### Param

The `Option` to check.

### Param

The condition to check.

### Examples

```ts
import { pipe, Option } from "effect"

const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(pipe(Option.some(2), Option.exists(isEven)), true)
assert.deepStrictEqual(pipe(Option.some(1), Option.exists(isEven)), false)
assert.deepStrictEqual(pipe(Option.none(), Option.exists(isEven)), false)
```

```ts
import { pipe, Option } from "effect"

const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(pipe(Option.some(2), Option.exists(isEven)), true)
assert.deepStrictEqual(pipe(Option.some(1), Option.exists(isEven)), false)
assert.deepStrictEqual(pipe(Option.none(), Option.exists(isEven)), false)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **exists**\<`A`, `B`\>(`self`, `refinement`): `self is Option<B>`

Check if a value in an `Option` type meets a certain predicate.

### Type Parameters

• **A**

• **B**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to check.

#### refinement

[`Refinement`](../../interfaces/Refinement.md)\<`A`, `B`\>

### Returns

`self is Option<B>`

### Param

The `Option` to check.

### Param

The condition to check.

### Examples

```ts
import { pipe, Option } from "effect"

const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(pipe(Option.some(2), Option.exists(isEven)), true)
assert.deepStrictEqual(pipe(Option.some(1), Option.exists(isEven)), false)
assert.deepStrictEqual(pipe(Option.none(), Option.exists(isEven)), false)
```

```ts
import { pipe, Option } from "effect"

const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(pipe(Option.some(2), Option.exists(isEven)), true)
assert.deepStrictEqual(pipe(Option.some(1), Option.exists(isEven)), false)
assert.deepStrictEqual(pipe(Option.none(), Option.exists(isEven)), false)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **exists**\<`A`\>(`self`, `predicate`): `boolean`

Check if a value in an `Option` type meets a certain predicate.

### Type Parameters

• **A**

### Parameters

#### self

[`Option`](../type-aliases/Option.md)\<`A`\>

The `Option` to check.

#### predicate

[`Predicate`](../../interfaces/Predicate.md)\<`A`\>

The condition to check.

### Returns

`boolean`

### Param

The `Option` to check.

### Param

The condition to check.

### Examples

```ts
import { pipe, Option } from "effect"

const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(pipe(Option.some(2), Option.exists(isEven)), true)
assert.deepStrictEqual(pipe(Option.some(1), Option.exists(isEven)), false)
assert.deepStrictEqual(pipe(Option.none(), Option.exists(isEven)), false)
```

```ts
import { pipe, Option } from "effect"

const isEven = (n: number) => n % 2 === 0

assert.deepStrictEqual(pipe(Option.some(2), Option.exists(isEven)), true)
assert.deepStrictEqual(pipe(Option.some(1), Option.exists(isEven)), false)
assert.deepStrictEqual(pipe(Option.none(), Option.exists(isEven)), false)
```

### Since

2.0.0

### Since

2.0.0
