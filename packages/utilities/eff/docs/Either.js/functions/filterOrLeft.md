[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / filterOrLeft

# Function: filterOrLeft()

Filter the right value with the provided function.
If the predicate fails, set the left value with the result of the provided function.

## Example

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    Either.right(1),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    Either.right(0),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

## Since

2.0.0

## Call Signature

> **filterOrLeft**\<`R`, `B`, `L2`\>(`refinement`, `orLeftWith`): \<`L`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`B`, `L2` \| `L`\>

Filter the right value with the provided function.
If the predicate fails, set the left value with the result of the provided function.

### Type Parameters

• **R**

• **B**

• **L2**

### Parameters

#### refinement

[`Refinement`](../../interfaces/Refinement.md)\<`NoInfer`\<`R`\>, `B`\>

#### orLeftWith

(`right`) => `L2`

### Returns

`Function`

#### Type Parameters

• **L**

#### Parameters

##### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`B`, `L2` \| `L`\>

### Examples

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    Either.right(1),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    Either.right(0),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    Either.right(1),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    Either.right(0),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **filterOrLeft**\<`R`, `L2`\>(`predicate`, `orLeftWith`): \<`L`\>(`self`) => [`Either`](../type-aliases/Either.md)\<`R`, `L2` \| `L`\>

Filter the right value with the provided function.
If the predicate fails, set the left value with the result of the provided function.

### Type Parameters

• **R**

• **L2**

### Parameters

#### predicate

[`Predicate`](../../interfaces/Predicate.md)\<`NoInfer`\<`R`\>\>

#### orLeftWith

(`right`) => `L2`

### Returns

`Function`

#### Type Parameters

• **L**

#### Parameters

##### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `L2` \| `L`\>

### Examples

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    Either.right(1),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    Either.right(0),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    Either.right(1),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    Either.right(0),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **filterOrLeft**\<`R`, `L`, `B`, `L2`\>(`self`, `refinement`, `orLeftWith`): [`Either`](../type-aliases/Either.md)\<`B`, `L` \| `L2`\>

Filter the right value with the provided function.
If the predicate fails, set the left value with the result of the provided function.

### Type Parameters

• **R**

• **L**

• **B**

• **L2**

### Parameters

#### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### refinement

[`Refinement`](../../interfaces/Refinement.md)\<`R`, `B`\>

#### orLeftWith

(`right`) => `L2`

### Returns

[`Either`](../type-aliases/Either.md)\<`B`, `L` \| `L2`\>

### Examples

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    Either.right(1),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    Either.right(0),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    Either.right(1),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    Either.right(0),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

### Since

2.0.0

### Since

2.0.0

## Call Signature

> **filterOrLeft**\<`R`, `L`, `E2`\>(`self`, `predicate`, `orLeftWith`): [`Either`](../type-aliases/Either.md)\<`R`, `L` \| `E2`\>

Filter the right value with the provided function.
If the predicate fails, set the left value with the result of the provided function.

### Type Parameters

• **R**

• **L**

• **E2**

### Parameters

#### self

[`Either`](../type-aliases/Either.md)\<`R`, `L`\>

#### predicate

[`Predicate`](../../interfaces/Predicate.md)\<`R`\>

#### orLeftWith

(`right`) => `E2`

### Returns

[`Either`](../type-aliases/Either.md)\<`R`, `L` \| `E2`\>

### Examples

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    Either.right(1),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    Either.right(0),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

```ts
import { pipe, Either } from "effect"

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    Either.right(1),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.right(1)
)
assert.deepStrictEqual(
  pipe(
    Either.right(0),
    Either.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  Either.left("0 is not positive")
)
```

### Since

2.0.0

### Since

2.0.0
