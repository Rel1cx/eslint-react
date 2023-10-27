[@eslint-react/tools](../README.md) / F

# Namespace: F

## Table of contents

### Interfaces

- [FunctionN](../interfaces/F.FunctionN.md)
- [FunctionTypeLambda](../interfaces/F.FunctionTypeLambda.md)
- [LazyArg](../interfaces/F.LazyArg.md)

### Functions

- [SK](F.md#sk)
- [absurd](F.md#absurd)
- [apply](F.md#apply)
- [compose](F.md#compose)
- [constFalse](F.md#constfalse)
- [constNull](F.md#constnull)
- [constTrue](F.md#consttrue)
- [constUndefined](F.md#constundefined)
- [constVoid](F.md#constvoid)
- [constant](F.md#constant)
- [dual](F.md#dual)
- [flip](F.md#flip)
- [flow](F.md#flow)
- [hole](F.md#hole)
- [identity](F.md#identity)
- [isFunction](F.md#isfunction)
- [pipe](F.md#pipe)
- [tupled](F.md#tupled)
- [unsafeCoerce](F.md#unsafecoerce)
- [untupled](F.md#untupled)

## Other

### SK

▸ **SK**<`A`, `B`\>(`_`, `b`): `B`

The SK combinator, also known as the "S-K combinator" or "S-combinator", is a fundamental combinator in the
lambda calculus and the SKI combinator calculus.

This function is useful for discarding the first argument passed to it and returning the second argument.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type | Description                         |
| :--- | :--- | :---------------------------------- |
| `_`  | `A`  | The first argument to be discarded. |
| `b`  | `B`  | The second argument to be returned. |

#### Returns

`B`

**`Example`**

```ts
import { SK } from "effect/Function";

assert.deepStrictEqual(SK(0, "hello"), "hello");
```

**`Since`**

2.0.0

---

### absurd

▸ **absurd**<`A`\>(`_`): `A`

The `absurd` function is a stub for cases where a value of type `never` is encountered in your code,
meaning that it should be impossible for this code to be executed.

This function is particularly when it's necessary to specify that certain cases are impossible.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type    |
| :--- | :------ |
| `_`  | `never` |

#### Returns

`A`

**`Since`**

2.0.0

---

### apply

▸ **apply**<`A`\>(`a`): <B\>(`self`: (`a`: `A`) => `B`) => `B`

Apply a function to a given value.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type | Description                                     |
| :--- | :--- | :---------------------------------------------- |
| `a`  | `A`  | The value that the function will be applied to. |

#### Returns

`fn`

▸ <`B`\>(`self`): `B`

##### Type parameters

| Name |
| :--- |
| `B`  |

##### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `self` | (`a`: `A`) => `B` |

##### Returns

`B`

**`Example`**

```ts
import { pipe, apply } from "effect/Function";
import { length } from "effect/String";

assert.deepStrictEqual(pipe(length, apply("hello")), 5);
```

**`Since`**

2.0.0

---

### compose

▸ **compose**<`B`, `C`\>(`bc`): <A\>(`self`: (`a`: `A`) => `B`) => (`a`: `A`) => `C`

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

#### Type parameters

| Name |
| :--- |
| `B`  |
| `C`  |

#### Parameters

| Name | Type              | Description                           |
| :--- | :---------------- | :------------------------------------ |
| `bc` | (`b`: `B`) => `C` | A function that maps from `B` to `C`. |

#### Returns

`fn`

▸ <`A`\>(`self`): (`a`: `A`) => `C`

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type              |
| :----- | :---------------- |
| `self` | (`a`: `A`) => `B` |

##### Returns

`fn`

▸ (`a`): `C`

##### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

##### Returns

`C`

**`Example`**

```ts
import { compose } from "effect/Function";

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

**`Since`**

2.0.0

▸ **compose**<`A`, `B`, `C`\>(`self`, `bc`): (`a`: `A`) => `C`

Composes two functions, `ab` and `bc` into a single function that takes in an argument `a` of type `A` and returns a result of type `C`.
The result is obtained by first applying the `ab` function to `a` and then applying the `bc` function to the result of `ab`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name   | Type              | Description                           |
| :----- | :---------------- | :------------------------------------ |
| `self` | (`a`: `A`) => `B` | -                                     |
| `bc`   | (`b`: `B`) => `C` | A function that maps from `B` to `C`. |

#### Returns

`fn`

▸ (`a`): `C`

##### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

##### Returns

`C`

**`Example`**

```ts
import { compose } from "effect/Function";

const increment = (n: number) => n + 1;
const square = (n: number) => n * n;

assert.strictEqual(compose(increment, square)(2), 9);
```

**`Since`**

2.0.0

---

### constFalse

▸ **constFalse**(): `boolean`

A thunk that returns always `false`.

#### Returns

`boolean`

**`Example`**

```ts
import { constFalse } from "effect/Function";

assert.deepStrictEqual(constFalse(), false);
```

**`Since`**

2.0.0

---

### constNull

▸ **constNull**(): `null`

A thunk that returns always `null`.

#### Returns

`null`

**`Example`**

```ts
import { constNull } from "effect/Function";

assert.deepStrictEqual(constNull(), null);
```

**`Since`**

2.0.0

---

### constTrue

▸ **constTrue**(): `boolean`

A thunk that returns always `true`.

#### Returns

`boolean`

**`Example`**

```ts
import { constTrue } from "effect/Function";

assert.deepStrictEqual(constTrue(), true);
```

**`Since`**

2.0.0

---

### constUndefined

▸ **constUndefined**(): `undefined`

A thunk that returns always `undefined`.

#### Returns

`undefined`

**`Example`**

```ts
import { constUndefined } from "effect/Function";

assert.deepStrictEqual(constUndefined(), undefined);
```

**`Since`**

2.0.0

---

### constVoid

▸ **constVoid**(): `void`

A thunk that returns always `void`.

#### Returns

`void`

**`Example`**

```ts
import { constVoid } from "effect/Function";

assert.deepStrictEqual(constVoid(), undefined);
```

**`Since`**

2.0.0

---

### constant

▸ **constant**<`A`\>(`value`): [`LazyArg`](../interfaces/F.LazyArg.md)<`A`\>

Creates a constant value that never changes.

This is useful when you want to pass a value to a higher-order function (a function that takes another function as its argument)
and want that inner function to always use the same value, no matter how many times it is called.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type | Description                        |
| :------ | :--- | :--------------------------------- |
| `value` | `A`  | The constant value to be returned. |

#### Returns

[`LazyArg`](../interfaces/F.LazyArg.md)<`A`\>

**`Example`**

```ts
import { constant } from "effect/Function";

const constNull = constant(null);

assert.deepStrictEqual(constNull(), null);
assert.deepStrictEqual(constNull(), null);
```

**`Since`**

2.0.0

---

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

| Name        | Type                                  |
| :---------- | :------------------------------------ |
| `DataLast`  | extends (...`args`: `any`[]) => `any` |
| `DataFirst` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name    | Type                                   | Description                                                                                                                                  |
| :------ | :------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------- |
| `arity` | `Parameters`<`DataFirst`\>[`"length"`] | Either the arity of the uncurried function or a predicate which determines if the function is being used in a data-first or data-last style. |
| `body`  | `DataFirst`                            | The definition of the uncurried function.                                                                                                    |

#### Returns

`DataLast` & `DataFirst`

**`Example`**

```ts
import { dual, pipe } from "effect/Function";

// Exampe using arity to determine data-first or data-last style
export const sum: {
  (that: number): (self: number) => number;
  (self: number, that: number): number;
} = dual(2, (self: number, that: number): number => self + that);

assert.deepStrictEqual(sum(2, 3), 5);
assert.deepStrictEqual(pipe(2, sum(3)), 5);

// Example using a predicate to determine data-first or data-last style
export const sum2: {
  (that: number): (self: number) => number;
  (self: number, that: number): number;
} = dual((args) => args.length === 1, (self: number, that: number): number => self + that);

assert.deepStrictEqual(sum(2, 3), 5);
assert.deepStrictEqual(pipe(2, sum(3)), 5);
```

**`Since`**

2.0.0

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

| Name        | Type                                  |
| :---------- | :------------------------------------ |
| `DataLast`  | extends (...`args`: `any`[]) => `any` |
| `DataFirst` | extends (...`args`: `any`[]) => `any` |

#### Parameters

| Name          | Type                                | Description                               |
| :------------ | :---------------------------------- | :---------------------------------------- |
| `isDataFirst` | (`args`: `IArguments`) => `boolean` | -                                         |
| `body`        | `DataFirst`                         | The definition of the uncurried function. |

#### Returns

`DataLast` & `DataFirst`

**`Example`**

```ts
import { dual, pipe } from "effect/Function";

// Exampe using arity to determine data-first or data-last style
export const sum: {
  (that: number): (self: number) => number;
  (self: number, that: number): number;
} = dual(2, (self: number, that: number): number => self + that);

assert.deepStrictEqual(sum(2, 3), 5);
assert.deepStrictEqual(pipe(2, sum(3)), 5);

// Example using a predicate to determine data-first or data-last style
export const sum2: {
  (that: number): (self: number) => number;
  (self: number, that: number): number;
} = dual((args) => args.length === 1, (self: number, that: number): number => self + that);

assert.deepStrictEqual(sum(2, 3), 5);
assert.deepStrictEqual(pipe(2, sum(3)), 5);
```

**`Since`**

2.0.0

---

### flip

▸ **flip**<`A`, `B`, `C`\>(`f`): (...`b`: `B`) => (...`a`: `A`) => `C`

Reverses the order of arguments for a curried function.

#### Type parameters

| Name | Type                |
| :--- | :------------------ |
| `A`  | extends `unknown`[] |
| `B`  | extends `unknown`[] |
| `C`  | `C`                 |

#### Parameters

| Name | Type                                  | Description                                       |
| :--- | :------------------------------------ | :------------------------------------------------ |
| `f`  | (...`a`: `A`) => (...`b`: `B`) => `C` | A curried function that takes multiple arguments. |

#### Returns

`fn`

▸ (`...b`): (...`a`: `A`) => `C`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...b` | `B`  |

##### Returns

`fn`

▸ (`...a`): `C`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`C`

**`Example`**

```ts
import { flip } from "effect/Function";

const f = (a: number) => (b: string) => a - b.length;

assert.deepStrictEqual(flip(f)("aaa")(2), -1);
```

**`Since`**

2.0.0

---

### flow

▸ **flow**<`A`, `B`\>(`ab`): (...`a`: `A`) => `B`

Performs left-to-right function composition. The first argument may have any arity, the remaining arguments must be unary.

See also [`pipe`](#pipe).

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `ab` | (...`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`...a`): `B`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`B`

**`Example`**

```ts
import { flow } from "effect/Function";

const len = (s: string): number => s.length;
const double = (n: number): number => n * 2;

const f = flow(len, double);

assert.strictEqual(f("aaa"), 6);
```

**`Since`**

2.0.0

▸ **flow**<`A`, `B`, `C`\>(`ab`, `bc`): (...`a`: `A`) => `C`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |
| `C`  | `C`                          |

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C`    |

#### Returns

`fn`

▸ (`...a`): `C`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`C`

▸ **flow**<`A`, `B`, `C`, `D`\>(`ab`, `bc`, `cd`): (...`a`: `A`) => `D`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |
| `C`  | `C`                          |
| `D`  | `D`                          |

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C`    |
| `cd` | (`c`: `C`) => `D`    |

#### Returns

`fn`

▸ (`...a`): `D`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`D`

▸ **flow**<`A`, `B`, `C`, `D`, `E`\>(`ab`, `bc`, `cd`, `de`): (...`a`: `A`) => `E`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |
| `C`  | `C`                          |
| `D`  | `D`                          |
| `E`  | `E`                          |

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C`    |
| `cd` | (`c`: `C`) => `D`    |
| `de` | (`d`: `D`) => `E`    |

#### Returns

`fn`

▸ (`...a`): `E`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`E`

▸ **flow**<`A`, `B`, `C`, `D`, `E`, `F`\>(`ab`, `bc`, `cd`, `de`, `ef`): (...`a`: `A`) => `F`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |
| `C`  | `C`                          |
| `D`  | `D`                          |
| `E`  | `E`                          |
| `F`  | `F`                          |

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C`    |
| `cd` | (`c`: `C`) => `D`    |
| `de` | (`d`: `D`) => `E`    |
| `ef` | (`e`: `E`) => `F`    |

#### Returns

`fn`

▸ (`...a`): `F`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`F`

▸ **flow**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`): (...`a`: `A`) => `G`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |
| `C`  | `C`                          |
| `D`  | `D`                          |
| `E`  | `E`                          |
| `F`  | `F`                          |
| `G`  | `G`                          |

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C`    |
| `cd` | (`c`: `C`) => `D`    |
| `de` | (`d`: `D`) => `E`    |
| `ef` | (`e`: `E`) => `F`    |
| `fg` | (`f`: `F`) => `G`    |

#### Returns

`fn`

▸ (`...a`): `G`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`G`

▸ **flow**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): (...`a`: `A`) => `H`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |
| `C`  | `C`                          |
| `D`  | `D`                          |
| `E`  | `E`                          |
| `F`  | `F`                          |
| `G`  | `G`                          |
| `H`  | `H`                          |

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C`    |
| `cd` | (`c`: `C`) => `D`    |
| `de` | (`d`: `D`) => `E`    |
| `ef` | (`e`: `E`) => `F`    |
| `fg` | (`f`: `F`) => `G`    |
| `gh` | (`g`: `G`) => `H`    |

#### Returns

`fn`

▸ (`...a`): `H`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`H`

▸ **flow**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): (...`a`: `A`) => `I`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |
| `C`  | `C`                          |
| `D`  | `D`                          |
| `E`  | `E`                          |
| `F`  | `F`                          |
| `G`  | `G`                          |
| `H`  | `H`                          |
| `I`  | `I`                          |

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C`    |
| `cd` | (`c`: `C`) => `D`    |
| `de` | (`d`: `D`) => `E`    |
| `ef` | (`e`: `E`) => `F`    |
| `fg` | (`f`: `F`) => `G`    |
| `gh` | (`g`: `G`) => `H`    |
| `hi` | (`h`: `H`) => `I`    |

#### Returns

`fn`

▸ (`...a`): `I`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`I`

▸ **flow**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): (...`a`: `A`) => `J`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |
| `C`  | `C`                          |
| `D`  | `D`                          |
| `E`  | `E`                          |
| `F`  | `F`                          |
| `G`  | `G`                          |
| `H`  | `H`                          |
| `I`  | `I`                          |
| `J`  | `J`                          |

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `ab` | (...`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C`    |
| `cd` | (`c`: `C`) => `D`    |
| `de` | (`d`: `D`) => `E`    |
| `ef` | (`e`: `E`) => `F`    |
| `fg` | (`f`: `F`) => `G`    |
| `gh` | (`g`: `G`) => `H`    |
| `hi` | (`h`: `H`) => `I`    |
| `ij` | (`i`: `I`) => `J`    |

#### Returns

`fn`

▸ (`...a`): `J`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`J`

---

### hole

▸ **hole**<`T`\>(): `T`

Type hole simulation.

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Returns

`T`

**`Since`**

2.0.0

---

### identity

▸ **identity**<`A`\>(`a`): `A`

The identity function, i.e. A function that returns its input argument.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type | Description         |
| :--- | :--- | :------------------ |
| `a`  | `A`  | The input argument. |

#### Returns

`A`

**`Example`**

```ts
import { identity } from "effect/Function";

assert.deepStrictEqual(identity(5), 5);
```

**`Since`**

2.0.0

---

### pipe

▸ **pipe**<`A`\>(`a`): `A`

Pipes the value of an expression into a pipeline of functions.

This is useful in combination with data-last functions as a simulation of methods:

```
as.map(f).filter(g) -> pipe(as, map(f), filter(g))
```

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

#### Returns

`A`

**`Example`**

```ts
import { pipe } from "effect/Function";

const length = (s: string): number => s.length;
const double = (n: number): number => n * 2;
const decrement = (n: number): number => n - 1;

assert.deepStrictEqual(pipe(length("hello"), double, decrement), 9);
```

**`Since`**

2.0.0

▸ **pipe**<`A`, `B`\>(`a`, `ab`): `B`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
| `ab` | (`a`: `A`) => `B` |

#### Returns

`B`

▸ **pipe**<`A`, `B`, `C`\>(`a`, `ab`, `bc`): `C`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |

#### Returns

`C`

▸ **pipe**<`A`, `B`, `C`, `D`\>(`a`, `ab`, `bc`, `cd`): `D`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |

#### Returns

`D`

▸ **pipe**<`A`, `B`, `C`, `D`, `E`\>(`a`, `ab`, `bc`, `cd`, `de`): `E`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |

#### Returns

`E`

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`): `F`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |

#### Returns

`F`

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`): `G`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |

#### Returns

`G`

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`): `H`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
| `ab` | (`a`: `A`) => `B` |
| `bc` | (`b`: `B`) => `C` |
| `cd` | (`c`: `C`) => `D` |
| `de` | (`d`: `D`) => `E` |
| `ef` | (`e`: `E`) => `F` |
| `fg` | (`f`: `F`) => `G` |
| `gh` | (`g`: `G`) => `H` |

#### Returns

`H`

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`): `I`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`): `J`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`): `K`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`): `L`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`): `M`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`): `N`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`): `O`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`): `P`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`): `Q`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |
| `Q`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`): `R`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |
| `Q`  |
| `R`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`): `S`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |
| `Q`  |
| `R`  |
| `S`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

▸ **pipe**<`A`, `B`, `C`, `D`, `E`, `F`, `G`, `H`, `I`, `J`, `K`, `L`, `M`, `N`, `O`, `P`, `Q`, `R`, `S`, `T`\>(`a`, `ab`, `bc`, `cd`, `de`, `ef`, `fg`, `gh`, `hi`, `ij`, `jk`, `kl`, `lm`, `mn`, `no`, `op`, `pq`, `qr`, `rs`, `st`): `T`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |
| `D`  |
| `E`  |
| `F`  |
| `G`  |
| `H`  |
| `I`  |
| `J`  |
| `K`  |
| `L`  |
| `M`  |
| `N`  |
| `O`  |
| `P`  |
| `Q`  |
| `R`  |
| `S`  |
| `T`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `a`  | `A`               |
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

---

### tupled

▸ **tupled**<`A`, `B`\>(`f`): (`a`: `A`) => `B`

Creates a tupled version of this function: instead of `n` arguments, it accepts a single tuple argument.

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |

#### Parameters

| Name | Type                 |
| :--- | :------------------- |
| `f`  | (...`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`a`): `B`

##### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

##### Returns

`B`

**`Example`**

```ts
import { tupled } from "effect/Function";

const sumTupled = tupled((x: number, y: number): number => x + y);

assert.deepStrictEqual(sumTupled([1, 2]), 3);
```

**`Since`**

2.0.0

---

### unsafeCoerce

▸ **unsafeCoerce**<`A`, `B`\>(`a`): `B`

Casts the result to the specified type.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type | Description                                |
| :--- | :--- | :----------------------------------------- |
| `a`  | `A`  | The value to be casted to the target type. |

#### Returns

`B`

**`Example`**

```ts
import { unsafeCoerce, identity } from "effect/Function";

assert.deepStrictEqual(unsafeCoerce, identity);
```

**`Since`**

2.0.0

---

### untupled

▸ **untupled**<`A`, `B`\>(`f`): (...`a`: `A`) => `B`

Inverse function of `tupled`

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `f`  | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`...a`): `B`

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

`B`

**`Example`**

```ts
import { untupled } from "effect/Function";

const getFirst = untupled(<A, B>(tuple: [A, B]): A => tuple[0]);

assert.deepStrictEqual(getFirst(1, 2), 1);
```

**`Since`**

2.0.0

## guards

### isFunction

▸ **isFunction**(`input`): input is Function

Tests if a value is a `function`.

#### Parameters

| Name    | Type      | Description        |
| :------ | :-------- | :----------------- |
| `input` | `unknown` | The value to test. |

#### Returns

input is Function

**`Example`**

```ts
import { isFunction } from "effect/Predicate";

assert.deepStrictEqual(isFunction(isFunction), true);
assert.deepStrictEqual(isFunction("function"), false);
```

**`Since`**

2.0.0
