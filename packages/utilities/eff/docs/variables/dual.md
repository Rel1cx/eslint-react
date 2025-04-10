[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / dual

# Variable: dual()

> `const` **dual**: \{\<`DataLast`, `DataFirst`\>(`arity`, `body`): `DataLast` & `DataFirst`; \<`DataLast`, `DataFirst`\>(`isDataFirst`, `body`): `DataLast` & `DataFirst`; \}

Creates a function that can be used in a data-last (aka `pipe`able) or
data-first style.

The first parameter to `dual` is either the arity of the uncurried function
or a predicate that determines if the function is being used in a data-first
or data-last style.

Using the arity is the most common use case, but there are some cases where
you may want to use a predicate. For example, if you have a function that
takes an optional argument, you can use a predicate to determine if the
function is being used in a data-first or data-last style.

You can pass either the arity of the uncurried function or a predicate
which determines if the function is being used in a data-first or
data-last style.

**Example** (Using arity to determine data-first or data-last style)

```ts
import { dual, pipe } from "effect/Function"

const sum = dual<
  (that: number) => (self: number) => number,
  (self: number, that: number) => number
>(2, (self, that) => self + that)

console.log(sum(2, 3)) // 5
console.log(pipe(2, sum(3))) // 5
```

**Example** (Using call signatures to define the overloads)

```ts
import { dual, pipe } from "effect/Function"

const sum: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, (self: number, that: number): number => self + that)

console.log(sum(2, 3)) // 5
console.log(pipe(2, sum(3))) // 5
```

**Example** (Using a predicate to determine data-first or data-last style)

```ts
import { dual, pipe } from "effect/Function"

const sum = dual<
  (that: number) => (self: number) => number,
  (self: number, that: number) => number
>(
  (args) => args.length === 2,
  (self, that) => self + that
)

console.log(sum(2, 3)) // 5
console.log(pipe(2, sum(3))) // 5
```

## Call Signature

> \<`DataLast`, `DataFirst`\>(`arity`, `body`): `DataLast` & `DataFirst`

### Type Parameters

#### DataLast

`DataLast` *extends* (...`args`) => `any`

#### DataFirst

`DataFirst` *extends* (...`args`) => `any`

### Parameters

#### arity

[`Parameters`](https://www.typescriptlang.org/docs/handbook/utility-types.html#parameterstype)\<`DataFirst`\>\[`"length"`\]

#### body

`DataFirst`

### Returns

`DataLast` & `DataFirst`

## Call Signature

> \<`DataLast`, `DataFirst`\>(`isDataFirst`, `body`): `DataLast` & `DataFirst`

### Type Parameters

#### DataLast

`DataLast` *extends* (...`args`) => `any`

#### DataFirst

`DataFirst` *extends* (...`args`) => `any`

### Parameters

#### isDataFirst

(`args`) => `boolean`

#### body

`DataFirst`

### Returns

`DataLast` & `DataFirst`

## Param

The arity of the uncurried function or a predicate that determines if the function is being used in a data-first or data-last style.

## Param

The function to be curried.

## Since

1.0.0
