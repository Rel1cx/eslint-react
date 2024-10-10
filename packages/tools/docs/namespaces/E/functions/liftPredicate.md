[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [E](../README.md) / liftPredicate

# Function: liftPredicate()

Transforms a `Predicate` function into a `Right` of the input value if the predicate returns `true`
or `Left` of the result of the provided function if the predicate returns false

## Param

A `Predicate` function that takes in a value of type `A` and returns a boolean.

## Example

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    1,
    Either.liftPredicate(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    0,
    Either.liftPredicate(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

## Since

3.4.0

## liftPredicate(refinement, orLeftWith)

> **liftPredicate**\<`A`, `B`, `E`\>(`refinement`, `orLeftWith`): (`a`) => [`Either`](../type-aliases/Either.md)\<`B`, `E`\>

Transforms a `Predicate` function into a `Right` of the input value if the predicate returns `true`
or `Left` of the result of the provided function if the predicate returns false

### Type Parameters

• **A**

• **B**

• **E**

### Parameters

• **refinement**: [`Refinement`](../../../interfaces/Refinement.md)\<`NoInfer`\<`A`\>, `B`\>

• **orLeftWith**

### Returns

`Function`

#### Parameters

• **a**: `A`

#### Returns

[`Either`](../type-aliases/Either.md)\<`B`, `E`\>

### Param

A `Predicate` function that takes in a value of type `A` and returns a boolean.

### Example

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    1,
    Either.liftPredicate(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    0,
    Either.liftPredicate(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

### Since

3.4.0

## liftPredicate(predicate, orLeftWith)

> **liftPredicate**\<`A`, `E`\>(`predicate`, `orLeftWith`): (`a`) => [`Either`](../type-aliases/Either.md)\<`A`, `E`\>

Transforms a `Predicate` function into a `Right` of the input value if the predicate returns `true`
or `Left` of the result of the provided function if the predicate returns false

### Type Parameters

• **A**

• **E**

### Parameters

• **predicate**: [`Predicate`](../../../interfaces/Predicate.md)\<`NoInfer`\<`A`\>\>

• **orLeftWith**

### Returns

`Function`

#### Parameters

• **a**: `A`

#### Returns

[`Either`](../type-aliases/Either.md)\<`A`, `E`\>

### Param

A `Predicate` function that takes in a value of type `A` and returns a boolean.

### Example

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    1,
    Either.liftPredicate(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    0,
    Either.liftPredicate(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

### Since

3.4.0

## liftPredicate(self, refinement, orLeftWith)

> **liftPredicate**\<`A`, `E`, `B`\>(`self`, `refinement`, `orLeftWith`): [`Either`](../type-aliases/Either.md)\<`B`, `E`\>

Transforms a `Predicate` function into a `Right` of the input value if the predicate returns `true`
or `Left` of the result of the provided function if the predicate returns false

### Type Parameters

• **A**

• **E**

• **B**

### Parameters

• **self**: `A`

• **refinement**: [`Refinement`](../../../interfaces/Refinement.md)\<`A`, `B`\>

• **orLeftWith**

### Returns

[`Either`](../type-aliases/Either.md)\<`B`, `E`\>

### Param

A `Predicate` function that takes in a value of type `A` and returns a boolean.

### Example

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    1,
    Either.liftPredicate(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    0,
    Either.liftPredicate(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

### Since

3.4.0

## liftPredicate(self, predicate, orLeftWith)

> **liftPredicate**\<`A`, `E`\>(`self`, `predicate`, `orLeftWith`): [`Either`](../type-aliases/Either.md)\<`A`, `E`\>

Transforms a `Predicate` function into a `Right` of the input value if the predicate returns `true`
or `Left` of the result of the provided function if the predicate returns false

### Type Parameters

• **A**

• **E**

### Parameters

• **self**: `A`

• **predicate**: [`Predicate`](../../../interfaces/Predicate.md)\<`NoInfer`\<`A`\>\>

• **orLeftWith**

### Returns

[`Either`](../type-aliases/Either.md)\<`A`, `E`\>

### Param

A `Predicate` function that takes in a value of type `A` and returns a boolean.

### Example

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    1,
    Either.liftPredicate(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    0,
    Either.liftPredicate(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

### Since

3.4.0
