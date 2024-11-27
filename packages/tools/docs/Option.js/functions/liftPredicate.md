[**@eslint-react/tools**](../../README.md) • **Docs**

***

[@eslint-react/tools](../../README.md) / [./Option.js](../README.md) / liftPredicate

# Function: liftPredicate()

Transforms a `Predicate` function into a `Some` of the input value if the predicate returns `true` or `None`
if the predicate returns `false`.

## Param

A `Predicate` function that takes in a value of type `A` and returns a boolean.

## Example

```ts
import { Option } from "effect"

const getOption = Option.liftPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), Option.none())
assert.deepStrictEqual(getOption(1), Option.some(1))
```

## Category

lifting

## Since

2.0.0

## liftPredicate(refinement)

> **liftPredicate**\<`A`, `B`\>(`refinement`): (`a`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Transforms a `Predicate` function into a `Some` of the input value if the predicate returns `true` or `None`
if the predicate returns `false`.

### Type Parameters

• **A**

• **B**

### Parameters

• **refinement**: [`Refinement`](../../interfaces/Refinement.md)\<`A`, `B`\>

### Returns

`Function`

#### Parameters

• **a**: `A`

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

A `Predicate` function that takes in a value of type `A` and returns a boolean.

### Example

```ts
import { Option } from "effect"

const getOption = Option.liftPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), Option.none())
assert.deepStrictEqual(getOption(1), Option.some(1))
```

### Category

lifting

### Since

2.0.0

## liftPredicate(predicate)

> **liftPredicate**\<`B`, `A`\>(`predicate`): (`b`) => [`Option`](../type-aliases/Option.md)\<`B`\>

Transforms a `Predicate` function into a `Some` of the input value if the predicate returns `true` or `None`
if the predicate returns `false`.

### Type Parameters

• **B**

• **A** = `B`

### Parameters

• **predicate**: [`Predicate`](../../interfaces/Predicate.md)\<`A`\>

A `Predicate` function that takes in a value of type `A` and returns a boolean.

### Returns

`Function`

#### Parameters

• **b**: `B`

#### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

A `Predicate` function that takes in a value of type `A` and returns a boolean.

### Examples

```ts
import { Option } from "effect"

const getOption = Option.liftPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), Option.none())
assert.deepStrictEqual(getOption(1), Option.some(1))
```

```ts
import { Option } from "effect"

const getOption = Option.liftPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), Option.none())
assert.deepStrictEqual(getOption(1), Option.some(1))
```

### Category

lifting

### Since

2.0.0

### Category

lifting

### Since

2.0.0

## liftPredicate(self, refinement)

> **liftPredicate**\<`A`, `B`\>(`self`, `refinement`): [`Option`](../type-aliases/Option.md)\<`B`\>

Transforms a `Predicate` function into a `Some` of the input value if the predicate returns `true` or `None`
if the predicate returns `false`.

### Type Parameters

• **A**

• **B**

### Parameters

• **self**: `A`

• **refinement**: [`Refinement`](../../interfaces/Refinement.md)\<`A`, `B`\>

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

A `Predicate` function that takes in a value of type `A` and returns a boolean.

### Examples

```ts
import { Option } from "effect"

const getOption = Option.liftPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), Option.none())
assert.deepStrictEqual(getOption(1), Option.some(1))
```

```ts
import { Option } from "effect"

const getOption = Option.liftPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), Option.none())
assert.deepStrictEqual(getOption(1), Option.some(1))
```

### Category

lifting

### Since

2.0.0

### Category

lifting

### Since

2.0.0

## liftPredicate(self, predicate)

> **liftPredicate**\<`B`, `A`\>(`self`, `predicate`): [`Option`](../type-aliases/Option.md)\<`B`\>

Transforms a `Predicate` function into a `Some` of the input value if the predicate returns `true` or `None`
if the predicate returns `false`.

### Type Parameters

• **B**

• **A** = `B`

### Parameters

• **self**: `B`

• **predicate**: [`Predicate`](../../interfaces/Predicate.md)\<`A`\>

A `Predicate` function that takes in a value of type `A` and returns a boolean.

### Returns

[`Option`](../type-aliases/Option.md)\<`B`\>

### Param

A `Predicate` function that takes in a value of type `A` and returns a boolean.

### Examples

```ts
import { Option } from "effect"

const getOption = Option.liftPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), Option.none())
assert.deepStrictEqual(getOption(1), Option.some(1))
```

```ts
import { Option } from "effect"

const getOption = Option.liftPredicate((n: number) => n >= 0)

assert.deepStrictEqual(getOption(-1), Option.none())
assert.deepStrictEqual(getOption(1), Option.some(1))
```

### Category

lifting

### Since

2.0.0

### Category

lifting

### Since

2.0.0
