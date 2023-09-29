[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](src_lib_primitives.md) / F

# Namespace: F

[src/lib/primitives](src_lib_primitives.md).F

## Table of contents

### Interfaces

- [FunctionN](../interfaces/src_lib_primitives.F.FunctionN.md)
- [FunctionTypeLambda](../interfaces/src_lib_primitives.F.FunctionTypeLambda.md)
- [LazyArg](../interfaces/src_lib_primitives.F.LazyArg.md)

### Functions

- [SK](src_lib_primitives.F.md#sk)
- [absurd](src_lib_primitives.F.md#absurd)
- [apply](src_lib_primitives.F.md#apply)
- [compose](src_lib_primitives.F.md#compose)
- [constFalse](src_lib_primitives.F.md#constfalse)
- [constNull](src_lib_primitives.F.md#constnull)
- [constTrue](src_lib_primitives.F.md#consttrue)
- [constUndefined](src_lib_primitives.F.md#constundefined)
- [constVoid](src_lib_primitives.F.md#constvoid)
- [constant](src_lib_primitives.F.md#constant)
- [dual](src_lib_primitives.F.md#dual)
- [flip](src_lib_primitives.F.md#flip)
- [flow](src_lib_primitives.F.md#flow)
- [hole](src_lib_primitives.F.md#hole)
- [identity](src_lib_primitives.F.md#identity)
- [isFunction](src_lib_primitives.F.md#isfunction)
- [pipe](src_lib_primitives.F.md#pipe)
- [tupled](src_lib_primitives.F.md#tupled)
- [unsafeCoerce](src_lib_primitives.F.md#unsafecoerce)
- [untupled](src_lib_primitives.F.md#untupled)

## Other

### SK

▸ **SK**<`A`, `B`\>(`_`, `b`): `B`

The SK combinator, also known as the "S-K combinator" or "S-combinator", is a fundamental combinator in the
lambda calculus and the SKI combinator calculus.

This function is useful for discarding the first argument passed to it and returning the second argument.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `_` | `A` | The first argument to be discarded. |
| `b` | `B` | The second argument to be returned. |

#### Returns

`B`

**`Example`**

```ts
import { SK } from "@effect/data/Function";

assert.deepStrictEqual(SK(0, "hello"), "hello")
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:370

___

### absurd

▸ **absurd**<`A`\>(`_`): `A`

The `absurd` function is a stub for cases where a value of type `never` is encountered in your code,
meaning that it should be impossible for this code to be executed.

This function is particularly when it's necessary to specify that certain cases are impossible.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `never` |

#### Returns

`A`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:255

___

### apply

▸ **apply**<`A`\>(`a`): <B\>(`self`: (`a`: `A`) => `B`) => `B`

Apply a function to a given value.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `A` | The value that the function will be applied to. |

#### Returns

`fn`

▸ <`B`\>(`self`): `B`

##### Type parameters

| Name |
| :------ |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | (`a`: `A`) => `B` |

##### Returns

`B`

**`Example`**

```ts
import { pipe, apply } from "@effect/data/Function"
import { length } from '@effect/data/String'

assert.deepStrictEqual(pipe(length, apply("hello")), 5)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:86

___

### compose

▸ **compose**<`B`, `C`\>(`bc`): <A\>(`self`: (`a`: `A`) => `B`) => (`a`: `A`) => `C`

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

#### Type parameters

| Name |
| :------ |
| `B` |
| `C` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `bc` | (`b`: `B`) => `C` | A function that maps from `B` to `C`. |

#### Returns

`fn`

▸ <`A`\>(`self`): (`a`: `A`) => `C`

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | (`a`: `A`) => `B` |

##### Returns

`fn`

▸ (`a`): `C`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

##### Returns

`C`

**`Example`**

```ts
import { compose } from "@effect/data/Function"

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:244

▸ **compose**<`A`, `B`, `C`\>(`self`, `bc`): (`a`: `A`) => `C`

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | (`a`: `A`) => `B` | - |
| `bc` | (`b`: `B`) => `C` | A function that maps from `B` to `C`. |

#### Returns

`fn`

▸ (`a`): `C`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

##### Returns

`C`

**`Example`**

```ts
import { compose } from "@effect/data/Function"

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:245

___

### constFalse

▸ **constFalse**(): `boolean`

A thunk that returns always `false`.

#### Returns

`boolean`

**`Example`**

```ts
import { constFalse } from "@effect/data/Function"

assert.deepStrictEqual(constFalse(), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:98

___

### constNull

▸ **constNull**(): ``null``

A thunk that returns always `null`.

#### Returns

``null``

**`Example`**

```ts
import { constNull } from "@effect/data/Function"

assert.deepStrictEqual(constNull(), null)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:98

___

### constTrue

▸ **constTrue**(): `boolean`

A thunk that returns always `true`.

#### Returns

`boolean`

**`Example`**

```ts
import { constTrue } from "@effect/data/Function"

assert.deepStrictEqual(constTrue(), true)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:98

___

### constUndefined

▸ **constUndefined**(): `undefined`

A thunk that returns always `undefined`.

#### Returns

`undefined`

**`Example`**

```ts
import { constUndefined } from "@effect/data/Function"

assert.deepStrictEqual(constUndefined(), undefined)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:98

___

### constVoid

▸ **constVoid**(): `void`

A thunk that returns always `void`.

#### Returns

`void`

**`Example`**

```ts
import { constVoid } from "@effect/data/Function"

assert.deepStrictEqual(constVoid(), undefined)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:98

___

### constant

▸ **constant**<`A`\>(`value`): [`LazyArg`](../interfaces/src_lib_primitives.F.LazyArg.md)<`A`\>

Creates a constant value that never changes.

This is useful when you want to pass a value to a higher-order function (a function that takes another function as its argument)
and want that inner function to always use the same value, no matter how many times it is called.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `value` | `A` | The constant value to be returned. |

#### Returns

[`LazyArg`](../interfaces/src_lib_primitives.F.LazyArg.md)<`A`\>

**`Example`**

```ts
import { constant } from "@effect/data/Function"

const constNull = constant(null)

assert.deepStrictEqual(constNull(), null)
assert.deepStrictEqual(constNull(), null)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:155

___

### dual

▸ **dual**<`DataLast`, `DataFirst`\>(`arity`, `body`): `DataLast` & `DataFirst`

Creates a function that can be used in a data-last (aka `pipe`able) or
data-first style.

The first parameter to `dual` is either the arity of the uncurried function
or a predicate that determines if the function is being used in a data-first
or data-last style.

Using the arity is the most common use case, but there are some cases where
you may want to use a predicate. For example, if you have a function that
takes an optional argument, you can use a predicate to determine if the
function is being used in a data-first or data-last style.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DataLast` | extends (...`args`: `any`[]) => `any` |
| `DataFirst` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `arity` | `Parameters`<`DataFirst`\>[``"length"``] | Either the arity of the uncurried function or a predicate which determines if the function is being used in a data-first or data-last style. |
| `body` | `DataFirst` | The definition of the uncurried function. |

#### Returns

`DataLast` & `DataFirst`

**`Example`**

```ts
import { dual, pipe } from "@effect/data/Function"

// Exampe using arity to determine data-first or data-last style
export const sum: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, (self: number, that: number): number => self + that)

assert.deepStrictEqual(sum(2, 3), 5)
assert.deepStrictEqual(pipe(2, sum(3)), 5)

// Example using a predicate to determine data-first or data-last style
export const sum2: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual((args) => args.length === 1, (self: number, that: number): number => self + that)

assert.deepStrictEqual(sum(2, 3), 5)
assert.deepStrictEqual(pipe(2, sum(3)), 5)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:69

▸ **dual**<`DataLast`, `DataFirst`\>(`isDataFirst`, `body`): `DataLast` & `DataFirst`

Creates a function that can be used in a data-last (aka `pipe`able) or
data-first style.

The first parameter to `dual` is either the arity of the uncurried function
or a predicate that determines if the function is being used in a data-first
or data-last style.

Using the arity is the most common use case, but there are some cases where
you may want to use a predicate. For example, if you have a function that
takes an optional argument, you can use a predicate to determine if the
function is being used in a data-first or data-last style.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `DataLast` | extends (...`args`: `any`[]) => `any` |
| `DataFirst` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `isDataFirst` | (`args`: `IArguments`) => `boolean` | - |
| `body` | `DataFirst` | The definition of the uncurried function. |

#### Returns

`DataLast` & `DataFirst`

**`Example`**

```ts
import { dual, pipe } from "@effect/data/Function"

// Exampe using arity to determine data-first or data-last style
export const sum: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual(2, (self: number, that: number): number => self + that)

assert.deepStrictEqual(sum(2, 3), 5)
assert.deepStrictEqual(pipe(2, sum(3)), 5)

// Example using a predicate to determine data-first or data-last style
export const sum2: {
  (that: number): (self: number) => number
  (self: number, that: number): number
} = dual((args) => args.length === 1, (self: number, that: number): number => self + that)

assert.deepStrictEqual(sum(2, 3), 5)
assert.deepStrictEqual(pipe(2, sum(3)), 5)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:70

___

### flip

▸ **flip**<`A`, `B`, `C`\>(`f`): (...`b`: `B`) => (...`a`: `A`) => `C`

Reverses the order of arguments for a curried function.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `unknown`[] |
| `B` | extends `unknown`[] |
| `C` | `C` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (...`a`: `A`) => (...`b`: `B`) => `C` | A curried function that takes multiple arguments. |

#### Returns

`fn`

▸ (`...b`): (...`a`: `A`) => `C`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...b` | `B` |

##### Returns

`fn`

▸ (`...a`): `C`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`C`

**`Example`**

```ts
import { flip } from "@effect/data/Function"

const f = (a: number) => (b: string) => a - b.length

assert.deepStrictEqual(flip(f)('aaa')(2), -1)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:225

___

### flow

▸ **flow**<`A`, `B`\>(`ab`): (...`a`: `A`) => `B`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ab` | (...`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`...a`): `B`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`B`

**`Example`**

```ts
import { flow } from "@effect/data/Function"

const len = (s: string): number => s.length
const double = (n: number): number => n * 2

const f = flow(len, double)

assert.strictEqual(f('aaa'), 6)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:339

▸ **flow**<`A`, `B`, `C`\>(`ab`, `bc`): (...`a`: `A`) => `C`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |
| `C` | `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |

#### Returns

`fn`

▸ (`...a`): `C`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`C`

#### Defined in

node_modules/@effect/data/Function.d.ts:340

▸ **flow**<`A`, `B`, `C`, `D`\>(`ab`, `bc`, `cd`): (...`a`: `A`) => `D`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |
| `C` | `C` |
| `D` | `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |

#### Returns

`fn`

▸ (`...a`): `D`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`D`

#### Defined in

node_modules/@effect/data/Function.d.ts:341

▸ **flow**<`A`, `B`, `C`, `D`, `E`\>(`ab`, `bc`, `cd`, `de`): (...`a`: `A`) => `E`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |
| `C` | `C` |
| `D` | `D` |
| `E` | `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |

#### Returns

`fn`

▸ (`...a`): `E`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`E`

#### Defined in

node_modules/@effect/data/Function.d.ts:342

▸ **flow**<`A`, `B`, `C`, `D`, `E`, `F`\>(`ab`, `bc`, `cd`, `de`, `ef`): (...`a`: `A`) => `F`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |
| `C` | `C` |
| `D` | `D` |
| `E` | `E` |
| `F` | `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |

#### Returns

`fn`

▸ (`...a`): `F`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`F`

#### Defined in

node_modules/@effect/data/Function.d.ts:343

▸ **flow**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`): (...`a`: `A`) => `G`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |
| `C` | `C` |
| `D` | `D` |
| `E` | `E` |
| `F` | `F` |
| `G` | `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |

#### Returns

`fn`

▸ (`...a`): `G`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`G`

#### Defined in

node_modules/@effect/data/Function.d.ts:344

▸ **flow**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): (...`a`: `A`) => `H`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |
| `C` | `C` |
| `D` | `D` |
| `E` | `E` |
| `F` | `F` |
| `G` | `G` |
| `H` | `H` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |

#### Returns

`fn`

▸ (`...a`): `H`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`H`

#### Defined in

node_modules/@effect/data/Function.d.ts:345

▸ **flow**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): (...`a`: `A`) => `I`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |
| `C` | `C` |
| `D` | `D` |
| `E` | `E` |
| `F` | `F` |
| `G` | `G` |
| `H` | `H` |
| `I` | `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |

#### Returns

`fn`

▸ (`...a`): `I`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`I`

#### Defined in

node_modules/@effect/data/Function.d.ts:346

▸ **flow**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): (...`a`: `A`) => `J`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |
| `C` | `C` |
| `D` | `D` |
| `E` | `E` |
| `F` | `F` |
| `G` | `G` |
| `H` | `H` |
| `I` | `I` |
| `J` | `J` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |

#### Returns

`fn`

▸ (`...a`): `J`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`J`

#### Defined in

node_modules/@effect/data/Function.d.ts:347

___

### hole

▸ **hole**<`T`\>(): `T`

Type hole simulation.

#### Type parameters

| Name |
| :------ |
| `T` |

#### Returns

`T`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:353

___

### identity

▸ **identity**<`A`\>(`a`): `A`

The identity function, i.e. A function that returns its input argument.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `A` | The input argument. |

#### Returns

`A`

**`Example`**

```ts
import { identity } from "@effect/data/Function"

assert.deepStrictEqual(identity(5), 5)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:123

___

### pipe

▸ **pipe**<`A`\>(`a`): `A`

Pipes the value of an expression into a pipeline of functions.

This is useful in combination with data-last functions as a simulation of methods:

```
as.map(f).filter(g) -> pipe(as, map(f), filter(g))
```

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

`A`

**`Example`**

```ts
import { pipe } from "@effect/data/Function"

const length = (s: string): number => s.length
const double = (n: number): number => n * 2
const decrement = (n: number): number => n - 1

assert.deepStrictEqual(pipe(length("hello"), double, decrement), 9)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:302

▸ **pipe**<`A`, `B`\>(`a`, `ab`): `B`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |

#### Returns

`B`

#### Defined in

node_modules/@effect/data/Function.d.ts:303

▸ **pipe**<`A`, `B`, `C`\>(`a`, `ab`, `bc`): `C`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |

#### Returns

`C`

#### Defined in

node_modules/@effect/data/Function.d.ts:304

▸ **pipe**<`A`, `B`, `C`, `D`\>(`a`, `ab`, `bc`, `cd`): `D`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |

#### Returns

`D`

#### Defined in

node_modules/@effect/data/Function.d.ts:305

▸ **pipe**<`A`, `B`, `C`, `D`, `E`\>(`a`, `ab`, `bc`, `cd`, `de`): `E`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |

#### Returns

`E`

#### Defined in

node_modules/@effect/data/Function.d.ts:306

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`): `F`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |

#### Returns

`F`

#### Defined in

node_modules/@effect/data/Function.d.ts:307

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): `G`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |

#### Returns

`G`

#### Defined in

node_modules/@effect/data/Function.d.ts:308

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): `H`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |

#### Returns

`H`

#### Defined in

node_modules/@effect/data/Function.d.ts:309

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): `I`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |

#### Returns

`I`

#### Defined in

node_modules/@effect/data/Function.d.ts:310

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): `J`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |

#### Returns

`J`

#### Defined in

node_modules/@effect/data/Function.d.ts:311

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`): `K`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |

#### Returns

`K`

#### Defined in

node_modules/@effect/data/Function.d.ts:312

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`): `L`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |

#### Returns

`L`

#### Defined in

node_modules/@effect/data/Function.d.ts:313

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`): `M`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |

#### Returns

`M`

#### Defined in

node_modules/@effect/data/Function.d.ts:314

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`): `N`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |

#### Returns

`N`

#### Defined in

node_modules/@effect/data/Function.d.ts:315

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`): `O`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |

#### Returns

`O`

#### Defined in

node_modules/@effect/data/Function.d.ts:316

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`): `P`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => `P` |

#### Returns

`P`

#### Defined in

node_modules/@effect/data/Function.d.ts:317

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`): `Q`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => `P` |
| `pq` | (`p`: `P`) => `Q` |

#### Returns

`Q`

#### Defined in

node_modules/@effect/data/Function.d.ts:318

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`): `R`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => `P` |
| `pq` | (`p`: `P`) => `Q` |
| `qr` | (`q`: `Q`) => `R` |

#### Returns

`R`

#### Defined in

node_modules/@effect/data/Function.d.ts:319

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`): `S`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |
| `S` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => `P` |
| `pq` | (`p`: `P`) => `Q` |
| `qr` | (`q`: `Q`) => `R` |
| `rs` | (`r`: `R`) => `S` |

#### Returns

`S`

#### Defined in

node_modules/@effect/data/Function.d.ts:320

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`): `T`

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `C` |
| `D` |
| `E` |
| `F` |
| `G` |
| `H` |
| `I` |
| `J` |
| `K` |
| `L` |
| `M` |
| `N` |
| `O` |
| `P` |
| `Q` |
| `R` |
| `S` |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |
| `hi` | (`h`: `H`) => `I` |
| `ij` | (`i`: `I`) => `J` |
| `jk` | (`j`: `J`) => `K` |
| `kl` | (`k`: `K`) => `L` |
| `lm` | (`l`: `L`) => `M` |
| `mn` | (`m`: `M`) => `N` |
| `no` | (`n`: `N`) => `O` |
| `op` | (`o`: `O`) => `P` |
| `pq` | (`p`: `P`) => `Q` |
| `qr` | (`q`: `Q`) => `R` |
| `rs` | (`r`: `R`) => `S` |
| `st` | (`s`: `S`) => `T` |

#### Returns

`T`

#### Defined in

node_modules/@effect/data/Function.d.ts:321

___

### tupled

▸ **tupled**<`A`, `B`\>(`f`): (`a`: `A`) => `B`

Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (...`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`a`): `B`

##### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

##### Returns

`B`

**`Example`**

```ts
import { tupled } from "@effect/data/Function"

const sumTupled = tupled((x: number, y: number): number => x + y)

assert.deepStrictEqual(sumTupled([1, 2]), 3)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:268

___

### unsafeCoerce

▸ **unsafeCoerce**<`A`, `B`\>(`a`): `B`

Casts the result to the specified type.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `A` | The value to be casted to the target type. |

#### Returns

`B`

**`Example`**

```ts
import { unsafeCoerce, identity } from "@effect/data/Function"

assert.deepStrictEqual(unsafeCoerce, identity)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:136

___

### untupled

▸ **untupled**<`A`, `B`\>(`f`): (...`a`: `A`) => `B`

Inverse function of `tupled`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends readonly `unknown`[] |
| `B` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`...a`): `B`

##### Parameters

| Name | Type |
| :------ | :------ |
| `...a` | `A` |

##### Returns

`B`

**`Example`**

```ts
import { untupled } from "@effect/data/Function"

const getFirst = untupled(<A, B>(tuple: [A, B]): A => tuple[0])

assert.deepStrictEqual(getFirst(1, 2), 1)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:281

## guards

### isFunction

▸ **isFunction**(`input`): input is Function

Tests if a value is a `function`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is Function

**`Example`**

```ts
import { isFunction } from '@effect/data/Predicate'

assert.deepStrictEqual(isFunction(isFunction), true)
assert.deepStrictEqual(isFunction("function"), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Function.d.ts:26
