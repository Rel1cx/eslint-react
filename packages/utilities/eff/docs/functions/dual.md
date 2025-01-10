[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / dual

# Function: dual()

Creates a function that can be used in a data-last (aka `pipe`able) or
data-first style.

The first parameter to `dual` is either the arity of the uncurried function
or a predicate that determines if the function is being used in a data-first
or data-last style.

Using the arity is the most common use case, but there are some cases where
you may want to use a predicate. For example, if you have a function that
takes an optional argument, you can use a predicate to determine if the
function is being used in a data-first or data-last style.

## Param

Either the arity of the uncurried function or a predicate
               which determines if the function is being used in a data-first
               or data-last style.

## Param

The definition of the uncurried function.

## Example

```ts
import { dual, pipe } from "effect/Function"

// Exampe using arity to determine data-first or data-last style
const sum: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, (self: number, that: number): number => self + that)

assert.deepStrictEqual(sum(2, 3), 5)
assert.deepStrictEqual(pipe(2, sum(3)), 5)

// Example using a predicate to determine data-first or data-last style
const sum2: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual((args) => args.length === 1, (self: number, that: number): number => self + that)

assert.deepStrictEqual(sum(2, 3), 5)
assert.deepStrictEqual(pipe(2, sum(3)), 5)
```

## Call Signature

> **dual**\<`DataLast`, `DataFirst`\>(`arity`, `body`): `DataLast` & `DataFirst`

### Type Parameters

• **DataLast** *extends* (...`args`) => `any`

• **DataFirst** *extends* (...`args`) => `any`

### Parameters

#### arity

`Parameters`\<`DataFirst`\>\[`"length"`\]

#### body

`DataFirst`

### Returns

`DataLast` & `DataFirst`

## Call Signature

> **dual**\<`DataLast`, `DataFirst`\>(`isDataFirst`, `body`): `DataLast` & `DataFirst`

### Type Parameters

• **DataLast** *extends* (...`args`) => `any`

• **DataFirst** *extends* (...`args`) => `any`

### Parameters

#### isDataFirst

(`args`) => `boolean`

#### body

`DataFirst`

### Returns

`DataLast` & `DataFirst`
