[@eslint-react/tools](../README.md) / O

# Namespace: O

## Table of contents

### Interfaces

- [None](../interfaces/O.None.md)
- [OptionTypeLambda](../interfaces/O.OptionTypeLambda.md)
- [OptionUnify](../interfaces/O.OptionUnify.md)
- [OptionUnifyBlacklist](../interfaces/O.OptionUnifyBlacklist.md)
- [Some](../interfaces/O.Some.md)

### Type Aliases

- [Option](O.md#option)
- [TypeId](O.md#typeid)

### Variables

- [Do](O.md#do)
- [TypeId](O.md#typeid-1)
- [unit](O.md#unit)

### Functions

- [all](O.md#all)
- [ap](O.md#ap)
- [as](O.md#as)
- [asUnit](O.md#asunit)
- [bind](O.md#bind)
- [bindTo](O.md#bindto)
- [composeK](O.md#composek)
- [contains](O.md#contains)
- [containsWith](O.md#containswith)
- [exists](O.md#exists)
- [filter](O.md#filter)
- [filterMap](O.md#filtermap)
- [firstSomeOf](O.md#firstsomeof)
- [flatMap](O.md#flatmap)
- [flatMapNullable](O.md#flatmapnullable)
- [flatten](O.md#flatten)
- [fromIterable](O.md#fromiterable)
- [fromNullable](O.md#fromnullable)
- [gen](O.md#gen)
- [getEquivalence](O.md#getequivalence)
- [getLeft](O.md#getleft)
- [getOrElse](O.md#getorelse)
- [getOrNull](O.md#getornull)
- [getOrThrow](O.md#getorthrow)
- [getOrThrowWith](O.md#getorthrowwith)
- [getOrUndefined](O.md#getorundefined)
- [getOrder](O.md#getorder)
- [getRight](O.md#getright)
- [isNone](O.md#isnone)
- [isOption](O.md#isoption)
- [isSome](O.md#issome)
- [let](O.md#let)
- [lift2](O.md#lift2)
- [liftNullable](O.md#liftnullable)
- [liftPredicate](O.md#liftpredicate)
- [liftThrowable](O.md#liftthrowable)
- [map](O.md#map)
- [match](O.md#match)
- [none](O.md#none)
- [orElse](O.md#orelse)
- [orElseEither](O.md#orelseeither)
- [partitionMap](O.md#partitionmap)
- [product](O.md#product)
- [productMany](O.md#productmany)
- [reduceCompact](O.md#reducecompact)
- [some](O.md#some)
- [tap](O.md#tap)
- [toArray](O.md#toarray)
- [toRefinement](O.md#torefinement)
- [zipLeft](O.md#zipleft)
- [zipRight](O.md#zipright)
- [zipWith](O.md#zipwith)

## Other

### unit

• `Const` **unit**: [`Option`](O.md#option)<`void`\>

**`Since`**

2.0.0

---

### exists

▸ **exists**<`A`\>(`predicate`): (`self`: [`Option`](O.md#option)<`A`\>) => `boolean`

Check if a value in an `Option` type meets a certain predicate.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type              | Description             |
| :---------- | :---------------- | :---------------------- |
| `predicate` | `Predicate`<`A`\> | The condition to check. |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

`boolean`

**`Example`**

```ts
import { some, none, exists } from "effect/Option";
import { pipe } from "effect/Function";

const isEven = (n: number) => n % 2 === 0;

assert.deepStrictEqual(pipe(some(2), exists(isEven)), true);
assert.deepStrictEqual(pipe(some(1), exists(isEven)), false);
assert.deepStrictEqual(pipe(none(), exists(isEven)), false);
```

**`Since`**

2.0.0

▸ **exists**<`A`\>(`self`, `predicate`): `boolean`

Check if a value in an `Option` type meets a certain predicate.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name        | Type                          | Description             |
| :---------- | :---------------------------- | :---------------------- |
| `self`      | [`Option`](O.md#option)<`A`\> | The `Option` to check.  |
| `predicate` | `Predicate`<`A`\>             | The condition to check. |

#### Returns

`boolean`

**`Example`**

```ts
import { some, none, exists } from "effect/Option";
import { pipe } from "effect/Function";

const isEven = (n: number) => n % 2 === 0;

assert.deepStrictEqual(pipe(some(2), exists(isEven)), true);
assert.deepStrictEqual(pipe(some(1), exists(isEven)), false);
assert.deepStrictEqual(pipe(none(), exists(isEven)), false);
```

**`Since`**

2.0.0

---

### let

▸ **let**<`N`, `A`, `B`\>(`name`, `f`): (`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<{ [K in string \| number \| symbol]: K extends keyof A ? A[K] : B }\>

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `N`  | extends `string` |
| `A`  | extends `object` |
| `B`  | `B`              |

#### Parameters

| Name   | Type                       |
| :----- | :------------------------- |
| `name` | `Exclude`<`N`, keyof `A`\> |
| `f`    | (`a`: `A`) => `B`          |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<{ [K in string \| number \| symbol]: K extends keyof A ? A[K] : B }\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<{ [K in string \| number \| symbol]: K extends keyof A ? A[K] : B }\>

▸ **let**<`A`, `N`, `B`\>(`self`, `name`, `f`): [`Option`](O.md#option)<{ [K in string \| number \| symbol]: K extends keyof A ? A[K] : B }\>

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `A`  | extends `object` |
| `N`  | extends `string` |
| `B`  | `B`              |

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |
| `name` | `Exclude`<`N`, keyof `A`\>    |
| `f`    | (`a`: `A`) => `B`             |

#### Returns

[`Option`](O.md#option)<{ [K in string \| number \| symbol]: K extends keyof A ? A[K] : B }\>

## combining

### all

▸ **all**<`I`\>(`input`): [`I`] extends [readonly [`Option`](O.md#option)<`any`\>[]] ? [`Option`](O.md#option)<{ -readonly [K in string \| number \| symbol]: [I[K]] extends [Option<A\>] ? A : never }\> : [`I`] extends [`Iterable`<[`Option`](O.md#option)<`A`\>\>] ? [`Option`](O.md#option)<`A`[]\> : [`Option`](O.md#option)<{ -readonly [K in string \| number \| symbol]: [I[K]] extends [Option<A\>] ? A : never }\>

Takes a structure of `Option`s and returns an `Option` of values with the same structure.

- If a tuple is supplied, then the returned `Option` will contain a tuple with the same length.
- If a struct is supplied, then the returned `Option` will contain a struct with the same keys.
- If an iterable is supplied, then the returned `Option` will contain an array.

#### Type parameters

| Name | Type                                                                                                         |
| :--- | :----------------------------------------------------------------------------------------------------------- |
| `I`  | extends `Iterable`<[`Option`](O.md#option)<`any`\>\> \| `Record`<`string`, [`Option`](O.md#option)<`any`\>\> |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `input` | `I`  |

#### Returns

[`I`] extends [readonly [`Option`](O.md#option)<`any`\>[]] ? [`Option`](O.md#option)<{ -readonly [K in string \| number \| symbol]: [I[K]] extends [Option<A\>] ? A : never }\> : [`I`] extends [`Iterable`<[`Option`](O.md#option)<`A`\>\>] ? [`Option`](O.md#option)<`A`[]\> : [`Option`](O.md#option)<{ -readonly [K in string \| number \| symbol]: [I[K]] extends [Option<A\>] ? A : never }\>

**`Example`**

```ts
import * as O from "effect/Option";

assert.deepStrictEqual(O.all([O.some(1), O.some(2)]), O.some([1, 2]));
assert.deepStrictEqual(O.all({ a: O.some(1), b: O.some("hello") }), O.some({ a: 1, b: "hello" }));
assert.deepStrictEqual(O.all({ a: O.some(1), b: O.none() }), O.none());
```

**`Since`**

2.0.0

---

### ap

▸ **ap**<`A`\>(`that`): <B\>(`self`: [`Option`](O.md#option)<(`a`: `A`) => `B`\>) => [`Option`](O.md#option)<`B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `that` | [`Option`](O.md#option)<`A`\> |

#### Returns

`fn`

▸ <`B`\>(`self`): [`Option`](O.md#option)<`B`\>

##### Type parameters

| Name |
| :--- |
| `B`  |

##### Parameters

| Name   | Type                                        |
| :----- | :------------------------------------------ |
| `self` | [`Option`](O.md#option)<(`a`: `A`) => `B`\> |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Since`**

2.0.0

▸ **ap**<`A`, `B`\>(`self`, `that`): [`Option`](O.md#option)<`B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                        |
| :----- | :------------------------------------------ |
| `self` | [`Option`](O.md#option)<(`a`: `A`) => `B`\> |
| `that` | [`Option`](O.md#option)<`A`\>               |

#### Returns

[`Option`](O.md#option)<`B`\>

**`Since`**

2.0.0

---

### product

▸ **product**<`A`, `B`\>(`self`, `that`): [`Option`](O.md#option)<[`A`, `B`]\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |
| `that` | [`Option`](O.md#option)<`B`\> |

#### Returns

[`Option`](O.md#option)<[`A`, `B`]\>

**`Since`**

2.0.0

---

### productMany

▸ **productMany**<`A`\>(`self`, `collection`): [`Option`](O.md#option)<[`A`, ...A[]]\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name         | Type                                       |
| :----------- | :----------------------------------------- |
| `self`       | [`Option`](O.md#option)<`A`\>              |
| `collection` | `Iterable`<[`Option`](O.md#option)<`A`\>\> |

#### Returns

[`Option`](O.md#option)<[`A`, ...A[]]\>

**`Since`**

2.0.0

---

### zipWith

▸ **zipWith**<`B`, `A`, `C`\>(`that`, `f`): (`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<`C`\>

Zips two `Option` values together using a provided function, returning a new `Option` of the result.

#### Type parameters

| Name |
| :--- |
| `B`  |
| `A`  |
| `C`  |

#### Parameters

| Name   | Type                          | Description                                                  |
| :----- | :---------------------------- | :----------------------------------------------------------- |
| `that` | [`Option`](O.md#option)<`B`\> | The right-hand side of the zip operation                     |
| `f`    | (`a`: `A`, `b`: `B`) => `C`   | The function used to combine the values of the two `Option`s |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<`C`\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<`C`\>

**`Example`**

```ts
import * as O from "effect/Option";

type Complex = [number, number];

const complex = (real: number, imaginary: number): Complex => [real, imaginary];

assert.deepStrictEqual(O.zipWith(O.none(), O.none(), complex), O.none());
assert.deepStrictEqual(O.zipWith(O.some(1), O.none(), complex), O.none());
assert.deepStrictEqual(O.zipWith(O.none(), O.some(1), complex), O.none());
assert.deepStrictEqual(O.zipWith(O.some(1), O.some(2), complex), O.some([1, 2]));

assert.deepStrictEqual(O.zipWith(O.some(1), complex)(O.some(2)), O.some([2, 1]));
```

**`Since`**

2.0.0

▸ **zipWith**<`A`, `B`, `C`\>(`self`, `that`, `f`): [`Option`](O.md#option)<`C`\>

Zips two `Option` values together using a provided function, returning a new `Option` of the result.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name   | Type                          | Description                                                  |
| :----- | :---------------------------- | :----------------------------------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> | The left-hand side of the zip operation                      |
| `that` | [`Option`](O.md#option)<`B`\> | The right-hand side of the zip operation                     |
| `f`    | (`a`: `A`, `b`: `B`) => `C`   | The function used to combine the values of the two `Option`s |

#### Returns

[`Option`](O.md#option)<`C`\>

**`Example`**

```ts
import * as O from "effect/Option";

type Complex = [number, number];

const complex = (real: number, imaginary: number): Complex => [real, imaginary];

assert.deepStrictEqual(O.zipWith(O.none(), O.none(), complex), O.none());
assert.deepStrictEqual(O.zipWith(O.some(1), O.none(), complex), O.none());
assert.deepStrictEqual(O.zipWith(O.none(), O.some(1), complex), O.none());
assert.deepStrictEqual(O.zipWith(O.some(1), O.some(2), complex), O.some([1, 2]));

assert.deepStrictEqual(O.zipWith(O.some(1), complex)(O.some(2)), O.some([2, 1]));
```

**`Since`**

2.0.0

## constructors

### none

▸ **none**<`A`\>(): [`Option`](O.md#option)<`A`\>

Creates a new `Option` that represents the absence of a value.

#### Type parameters

| Name | Type    |
| :--- | :------ |
| `A`  | `never` |

#### Returns

[`Option`](O.md#option)<`A`\>

**`Since`**

2.0.0

---

### some

▸ **some**<`A`\>(`value`): [`Option`](O.md#option)<`A`\>

Creates a new `Option` that wraps the given value.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type | Description        |
| :------ | :--- | :----------------- |
| `value` | `A`  | The value to wrap. |

#### Returns

[`Option`](O.md#option)<`A`\>

**`Since`**

2.0.0

## conversions

### fromIterable

▸ **fromIterable**<`A`\>(`collection`): [`Option`](O.md#option)<`A`\>

Converts an `Iterable` of values into an `Option`. Returns the first value of the `Iterable` wrapped in a `Some`
if the `Iterable` is not empty, otherwise returns `None`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name         | Type             | Description                                    |
| :----------- | :--------------- | :--------------------------------------------- |
| `collection` | `Iterable`<`A`\> | The `Iterable` to be converted to an `Option`. |

#### Returns

[`Option`](O.md#option)<`A`\>

**`Example`**

```ts
import { fromIterable, some, none } from "effect/Option";

assert.deepStrictEqual(fromIterable([1, 2, 3]), some(1));
assert.deepStrictEqual(fromIterable([]), none());
```

**`Since`**

2.0.0

---

### fromNullable

▸ **fromNullable**<`A`\>(`nullableValue`): [`Option`](O.md#option)<`NonNullable`<`A`\>\>

Constructs a new `Option` from a nullable type. If the value is `null` or `undefined`, returns `None`, otherwise
returns the value wrapped in a `Some`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name            | Type | Description                                        |
| :-------------- | :--- | :------------------------------------------------- |
| `nullableValue` | `A`  | The nullable value to be converted to an `Option`. |

#### Returns

[`Option`](O.md#option)<`NonNullable`<`A`\>\>

**`Example`**

```ts
import * as O from "effect/Option";

assert.deepStrictEqual(O.fromNullable(undefined), O.none());
assert.deepStrictEqual(O.fromNullable(null), O.none());
assert.deepStrictEqual(O.fromNullable(1), O.some(1));
```

**`Since`**

2.0.0

---

### getLeft

▸ **getLeft**<`E`, `A`\>(`self`): [`Option`](O.md#option)<`E`\>

Converts a `Either` to an `Option` discarding the value.

#### Type parameters

| Name |
| :--- |
| `E`  |
| `A`  |

#### Parameters

| Name   | Type                               |
| :----- | :--------------------------------- |
| `self` | [`Either`](E.md#either)<`E`, `A`\> |

#### Returns

[`Option`](O.md#option)<`E`\>

**`Example`**

```ts
import * as O from "effect/Option";
import * as E from "effect/Either";

assert.deepStrictEqual(O.getLeft(E.right("ok")), O.none());
assert.deepStrictEqual(O.getLeft(E.left("a")), O.some("a"));
```

**`Since`**

2.0.0

---

### getOrThrow

▸ **getOrThrow**<`A`\>(`self`): `A`

Extracts the value of an `Option` or throws if the `Option` is `None`.

The thrown error is a default error. To configure the error thrown, see [getOrThrowWith](O.md#getorthrowwith).

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                          | Description                             |
| :----- | :---------------------------- | :-------------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> | The `Option` to extract the value from. |

#### Returns

`A`

**`Throws`**

`Error("getOrThrow called on a None")`

**`Example`**

```ts
import * as O from "effect/Option";

assert.deepStrictEqual(O.getOrThrow(O.some(1)), 1);
assert.throws(() => O.getOrThrow(O.none()));
```

**`Since`**

2.0.0

---

### getOrThrowWith

▸ **getOrThrowWith**(`onNone`): <A\>(`self`: [`Option`](O.md#option)<`A`\>) => `A`

Extracts the value of an `Option` or throws if the `Option` is `None`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](O.md#getorthrow).

#### Parameters

| Name     | Type            | Description                                                                                  |
| :------- | :-------------- | :------------------------------------------------------------------------------------------- |
| `onNone` | () => `unknown` | A function that will be called if the `Option` is `None`. It returns the error to be thrown. |

#### Returns

`fn`

▸ <`A`\>(`self`): `A`

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

`A`

**`Example`**

```ts
import * as O from "effect/Option";

assert.deepStrictEqual(
  O.getOrThrowWith(O.some(1), () => new Error("Unexpected None")),
  1,
);
assert.throws(() => O.getOrThrowWith(O.none(), () => new Error("Unexpected None")));
```

**`Since`**

2.0.0

▸ **getOrThrowWith**<`A`\>(`self`, `onNone`): `A`

Extracts the value of an `Option` or throws if the `Option` is `None`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](O.md#getorthrow).

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name     | Type                          | Description                                                                                  |
| :------- | :---------------------------- | :------------------------------------------------------------------------------------------- |
| `self`   | [`Option`](O.md#option)<`A`\> | The `Option` to extract the value from.                                                      |
| `onNone` | () => `unknown`               | A function that will be called if the `Option` is `None`. It returns the error to be thrown. |

#### Returns

`A`

**`Example`**

```ts
import * as O from "effect/Option";

assert.deepStrictEqual(
  O.getOrThrowWith(O.some(1), () => new Error("Unexpected None")),
  1,
);
assert.throws(() => O.getOrThrowWith(O.none(), () => new Error("Unexpected None")));
```

**`Since`**

2.0.0

---

### getRight

▸ **getRight**<`E`, `A`\>(`self`): [`Option`](O.md#option)<`A`\>

Converts a `Either` to an `Option` discarding the error.

Alias of fromEither.

#### Type parameters

| Name |
| :--- |
| `E`  |
| `A`  |

#### Parameters

| Name   | Type                               |
| :----- | :--------------------------------- |
| `self` | [`Either`](E.md#either)<`E`, `A`\> |

#### Returns

[`Option`](O.md#option)<`A`\>

**`Example`**

```ts
import * as O from "effect/Option";
import * as E from "effect/Either";

assert.deepStrictEqual(O.getRight(E.right("ok")), O.some("ok"));
assert.deepStrictEqual(O.getRight(E.left("err")), O.none());
```

**`Since`**

2.0.0

---

### liftNullable

▸ **liftNullable**<`A`, `B`\>(`f`): (...`a`: `A`) => [`Option`](O.md#option)<`NonNullable`<`B`\>\>

This API is useful for lifting a function that returns `null` or `undefined` into the `Option` context.

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |

#### Parameters

| Name | Type                                          |
| :--- | :-------------------------------------------- |
| `f`  | (...`a`: `A`) => `undefined` \| `null` \| `B` |

#### Returns

`fn`

▸ (`...a`): [`Option`](O.md#option)<`NonNullable`<`B`\>\>

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

[`Option`](O.md#option)<`NonNullable`<`B`\>\>

**`Example`**

```ts
import * as O from "effect/Option";

const parse = (s: string): number | undefined => {
  const n = parseFloat(s);
  return isNaN(n) ? undefined : n;
};

const parseOption = O.liftNullable(parse);

assert.deepStrictEqual(parseOption("1"), O.some(1));
assert.deepStrictEqual(parseOption("not a number"), O.none());
```

**`Since`**

2.0.0

---

### liftThrowable

▸ **liftThrowable**<`A`, `B`\>(`f`): (...`a`: `A`) => [`Option`](O.md#option)<`B`\>

A utility function that lifts a function that throws exceptions into a function that returns an `Option`.

This function is useful for any function that might throw an exception, allowing the developer to handle
the exception in a more functional way.

#### Type parameters

| Name | Type                         |
| :--- | :--------------------------- |
| `A`  | extends readonly `unknown`[] |
| `B`  | `B`                          |

#### Parameters

| Name | Type                 | Description                             |
| :--- | :------------------- | :-------------------------------------- |
| `f`  | (...`a`: `A`) => `B` | the function that can throw exceptions. |

#### Returns

`fn`

▸ (`...a`): [`Option`](O.md#option)<`B`\>

##### Parameters

| Name   | Type |
| :----- | :--- |
| `...a` | `A`  |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Example`**

```ts
import * as O from "effect/Option";

const parse = O.liftThrowable(JSON.parse);

assert.deepStrictEqual(parse("1"), O.some(1));
assert.deepStrictEqual(parse(""), O.none());
```

**`Since`**

2.0.0

---

### toArray

▸ **toArray**<`A`\>(`self`): `A`[]

Transforms an `Option` into an `Array`.
If the input is `None`, an empty array is returned.
If the input is `Some`, the value is wrapped in an array.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                          | Description                          |
| :----- | :---------------------------- | :----------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> | The `Option` to convert to an array. |

#### Returns

`A`[]

**`Example`**

```ts
import * as O from "effect/Option";

assert.deepStrictEqual(O.toArray(O.some(1)), [1]);
assert.deepStrictEqual(O.toArray(O.none()), []);
```

**`Since`**

2.0.0

---

### toRefinement

▸ **toRefinement**<`A`, `B`\>(`f`): (`a`: `A`) => a is B

Returns a type guard from a `Option` returning function.
This function ensures that a type guard definition is type-safe.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                                        |
| :--- | :------------------------------------------ |
| `f`  | (`a`: `A`) => [`Option`](O.md#option)<`B`\> |

#### Returns

`fn`

▸ (`a`): a is B

##### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

##### Returns

a is B

**`Example`**

```ts
import * as O from "effect/Option";

const parsePositive = (n: number): O.Option<number> => n > 0 ? O.some(n) : O.none();

const isPositive = O.toRefinement(parsePositive);

assert.deepStrictEqual(isPositive(1), true);
assert.deepStrictEqual(isPositive(-1), false);
```

**`Since`**

2.0.0

## do notation

### Do

• `Const` **Do**: [`Option`](O.md#option)<{}\>

**`Since`**

2.0.0

---

### bind

▸ **bind**<`N`, `A`, `B`\>(`name`, `f`): (`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<{ [K in string \| number \| symbol]: K extends keyof A ? A[K] : B }\>

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `N`  | extends `string` |
| `A`  | extends `object` |
| `B`  | `B`              |

#### Parameters

| Name   | Type                                        |
| :----- | :------------------------------------------ |
| `name` | `Exclude`<`N`, keyof `A`\>                  |
| `f`    | (`a`: `A`) => [`Option`](O.md#option)<`B`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<{ [K in string \| number \| symbol]: K extends keyof A ? A[K] : B }\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<{ [K in string \| number \| symbol]: K extends keyof A ? A[K] : B }\>

**`Since`**

2.0.0

▸ **bind**<`A`, `N`, `B`\>(`self`, `name`, `f`): [`Option`](O.md#option)<{ [K in string \| number \| symbol]: K extends keyof A ? A[K] : B }\>

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `A`  | extends `object` |
| `N`  | extends `string` |
| `B`  | `B`              |

#### Parameters

| Name   | Type                                        |
| :----- | :------------------------------------------ |
| `self` | [`Option`](O.md#option)<`A`\>               |
| `name` | `Exclude`<`N`, keyof `A`\>                  |
| `f`    | (`a`: `A`) => [`Option`](O.md#option)<`B`\> |

#### Returns

[`Option`](O.md#option)<{ [K in string \| number \| symbol]: K extends keyof A ? A[K] : B }\>

**`Since`**

2.0.0

---

### bindTo

▸ **bindTo**<`N`\>(`name`): <A\>(`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<{ [K in string]: A }\>

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `N`  | extends `string` |

#### Parameters

| Name   | Type |
| :----- | :--- |
| `name` | `N`  |

#### Returns

`fn`

▸ <`A`\>(`self`): [`Option`](O.md#option)<{ [K in string]: A }\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<{ [K in string]: A }\>

**`Since`**

2.0.0

▸ **bindTo**<`A`, `N`\>(`self`, `name`): [`Option`](O.md#option)<{ [K in string]: A }\>

#### Type parameters

| Name | Type             |
| :--- | :--------------- |
| `A`  | `A`              |
| `N`  | extends `string` |

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |
| `name` | `N`                           |

#### Returns

[`Option`](O.md#option)<{ [K in string]: A }\>

**`Since`**

2.0.0

## elements

### contains

▸ **contains**<`A`\>(`a`): (`self`: [`Option`](O.md#option)<`A`\>) => `boolean`

Returns a function that checks if an `Option` contains a given value using the default `Equivalence`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

`boolean`

**`Since`**

2.0.0

▸ **contains**<`A`\>(`self`, `a`): `boolean`

Returns a function that checks if an `Option` contains a given value using the default `Equivalence`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |
| `a`    | `A`                           |

#### Returns

`boolean`

**`Since`**

2.0.0

---

### containsWith

▸ **containsWith**<`A`\>(`isEquivalent`): (`a`: `A`) => (`self`: [`Option`](O.md#option)<`A`\>) => `boolean`(`self`: [`Option`](O.md#option)<`A`\>, `a`: `A`) => `boolean`

Returns a function that checks if a `Option` contains a given value using a provided `isEquivalent` function.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name           | Type                                    |
| :------------- | :-------------------------------------- |
| `isEquivalent` | (`self`: `A`, `that`: `A`) => `boolean` |

#### Returns

`fn`

▸ (`a`): (`self`: [`Option`](O.md#option)<`A`\>) => `boolean`

##### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

##### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

`boolean`

▸ (`self`, `a`): `boolean`

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |
| `a`    | `A`                           |

##### Returns

`boolean`

**`Example`**

```ts
import { some, none, containsWith } from "effect/Option";
import { Equivalence } from "effect/Number";
import { pipe } from "effect/Function";

assert.deepStrictEqual(pipe(some(2), containsWith(Equivalence)(2)), true);
assert.deepStrictEqual(pipe(some(1), containsWith(Equivalence)(2)), false);
assert.deepStrictEqual(pipe(none(), containsWith(Equivalence)(2)), false);
```

**`Since`**

2.0.0

## equivalence

### getEquivalence

▸ **getEquivalence**<`A`\>(`isEquivalent`): `Equivalence`<[`Option`](O.md#option)<`A`\>\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name           | Type                |
| :------------- | :------------------ |
| `isEquivalent` | `Equivalence`<`A`\> |

#### Returns

`Equivalence`<[`Option`](O.md#option)<`A`\>\>

**`Example`**

```ts
import { none, some, getEquivalence } from "effect/Option";
import * as N from "effect/Number";

const isEquivalent = getEquivalence(N.Equivalence);
assert.deepStrictEqual(isEquivalent(none(), none()), true);
assert.deepStrictEqual(isEquivalent(none(), some(1)), false);
assert.deepStrictEqual(isEquivalent(some(1), none()), false);
assert.deepStrictEqual(isEquivalent(some(1), some(2)), false);
assert.deepStrictEqual(isEquivalent(some(1), some(1)), true);
```

**`Since`**

2.0.0

## error handling

### firstSomeOf

▸ **firstSomeOf**<`A`\>(`collection`): [`Option`](O.md#option)<`A`\>

Given an `Iterable` collection of `Option`s, returns the first `Some` found in the collection.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name         | Type                                       | Description                                        |
| :----------- | :----------------------------------------- | :------------------------------------------------- |
| `collection` | `Iterable`<[`Option`](O.md#option)<`A`\>\> | An iterable collection of `Option` to be searched. |

#### Returns

[`Option`](O.md#option)<`A`\>

**`Example`**

```ts
import * as O from "effect/Option";

assert.deepStrictEqual(O.firstSomeOf([O.none(), O.some(1), O.some(2)]), O.some(1));
```

**`Since`**

2.0.0

---

### orElse

▸ **orElse**<`B`\>(`that`): <A\>(`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<`B` \| `A`\>

Returns the provided `Option` `that` if `self` is `None`, otherwise returns `self`.

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type                                                                    | Description                                 |
| :----- | :---------------------------------------------------------------------- | :------------------------------------------ |
| `that` | [`LazyArg`](../interfaces/F.LazyArg.md)<[`Option`](O.md#option)<`B`\>\> | The `Option` to return if `self` is `None`. |

#### Returns

`fn`

▸ <`A`\>(`self`): [`Option`](O.md#option)<`B` \| `A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<`B` \| `A`\>

**`Example`**

```ts
import * as O from "effect/Option";
import { pipe } from "effect/Function";

assert.deepStrictEqual(
  pipe(
    O.none(),
    O.orElse(() => O.none()),
  ),
  O.none(),
);
assert.deepStrictEqual(
  pipe(
    O.some("a"),
    O.orElse(() => O.none()),
  ),
  O.some("a"),
);
assert.deepStrictEqual(
  pipe(
    O.none(),
    O.orElse(() => O.some("b")),
  ),
  O.some("b"),
);
assert.deepStrictEqual(
  pipe(
    O.some("a"),
    O.orElse(() => O.some("b")),
  ),
  O.some("a"),
);
```

**`Since`**

2.0.0

▸ **orElse**<`A`, `B`\>(`self`, `that`): [`Option`](O.md#option)<`A` \| `B`\>

Returns the provided `Option` `that` if `self` is `None`, otherwise returns `self`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                                    | Description                                 |
| :----- | :---------------------------------------------------------------------- | :------------------------------------------ |
| `self` | [`Option`](O.md#option)<`A`\>                                           | The first `Option` to be checked.           |
| `that` | [`LazyArg`](../interfaces/F.LazyArg.md)<[`Option`](O.md#option)<`B`\>\> | The `Option` to return if `self` is `None`. |

#### Returns

[`Option`](O.md#option)<`A` \| `B`\>

**`Example`**

```ts
import * as O from "effect/Option";
import { pipe } from "effect/Function";

assert.deepStrictEqual(
  pipe(
    O.none(),
    O.orElse(() => O.none()),
  ),
  O.none(),
);
assert.deepStrictEqual(
  pipe(
    O.some("a"),
    O.orElse(() => O.none()),
  ),
  O.some("a"),
);
assert.deepStrictEqual(
  pipe(
    O.none(),
    O.orElse(() => O.some("b")),
  ),
  O.some("b"),
);
assert.deepStrictEqual(
  pipe(
    O.some("a"),
    O.orElse(() => O.some("b")),
  ),
  O.some("a"),
);
```

**`Since`**

2.0.0

---

### orElseEither

▸ **orElseEither**<`B`\>(`that`): <A\>(`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<[`Either`](E.md#either)<`A`, `B`\>\>

Similar to `orElse`, but instead of returning a simple union, it returns an `Either` object,
which contains information about which of the two `Option`s has been chosen.

This is useful when it's important to know whether the value was retrieved from the first `Option` or the second option.

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type                                                                    | Description                                                           |
| :----- | :---------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `that` | [`LazyArg`](../interfaces/F.LazyArg.md)<[`Option`](O.md#option)<`B`\>\> | The second `Option` to be considered if the first `Option` is `None`. |

#### Returns

`fn`

▸ <`A`\>(`self`): [`Option`](O.md#option)<[`Either`](E.md#either)<`A`, `B`\>\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<[`Either`](E.md#either)<`A`, `B`\>\>

**`Since`**

2.0.0

▸ **orElseEither**<`A`, `B`\>(`self`, `that`): [`Option`](O.md#option)<[`Either`](E.md#either)<`A`, `B`\>\>

Similar to `orElse`, but instead of returning a simple union, it returns an `Either` object,
which contains information about which of the two `Option`s has been chosen.

This is useful when it's important to know whether the value was retrieved from the first `Option` or the second option.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                                                    | Description                                                           |
| :----- | :---------------------------------------------------------------------- | :-------------------------------------------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\>                                           | The first `Option` to be checked.                                     |
| `that` | [`LazyArg`](../interfaces/F.LazyArg.md)<[`Option`](O.md#option)<`B`\>\> | The second `Option` to be considered if the first `Option` is `None`. |

#### Returns

[`Option`](O.md#option)<[`Either`](E.md#either)<`A`, `B`\>\>

**`Since`**

2.0.0

## filtering

### filter

▸ **filter**<`C`, `B`, `A`\>(`refinement`): (`self`: [`Option`](O.md#option)<`C`\>) => [`Option`](O.md#option)<`B`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `C`  | `C`  |
| `B`  | `B`  |
| `A`  | `C`  |

#### Parameters

| Name         | Type                 |
| :----------- | :------------------- |
| `refinement` | (`a`: `A`) => a is B |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<`B`\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`C`\> |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Example`**

```ts
import * as O from "effect/Option";

// predicate
const isEven = (n: number) => n % 2 === 0;

assert.deepStrictEqual(O.filter(O.none(), isEven), O.none());
assert.deepStrictEqual(O.filter(O.some(3), isEven), O.none());
assert.deepStrictEqual(O.filter(O.some(2), isEven), O.some(2));

// refinement
const isNumber = (v: unknown): v is number => typeof v === "number";

assert.deepStrictEqual(O.filter(O.none(), isNumber), O.none());
assert.deepStrictEqual(O.filter(O.some("hello"), isNumber), O.none());
assert.deepStrictEqual(O.filter(O.some(2), isNumber), O.some(2));
```

**`Since`**

2.0.0

▸ **filter**<`B`, `A`\>(`predicate`): (`self`: [`Option`](O.md#option)<`B`\>) => [`Option`](O.md#option)<`B`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type                    | Description                                          |
| :---------- | :---------------------- | :--------------------------------------------------- |
| `predicate` | (`a`: `A`) => `boolean` | A predicate function to apply to the `Option` value. |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<`B`\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`B`\> |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Example`**

```ts
import * as O from "effect/Option";

// predicate
const isEven = (n: number) => n % 2 === 0;

assert.deepStrictEqual(O.filter(O.none(), isEven), O.none());
assert.deepStrictEqual(O.filter(O.some(3), isEven), O.none());
assert.deepStrictEqual(O.filter(O.some(2), isEven), O.some(2));

// refinement
const isNumber = (v: unknown): v is number => typeof v === "number";

assert.deepStrictEqual(O.filter(O.none(), isNumber), O.none());
assert.deepStrictEqual(O.filter(O.some("hello"), isNumber), O.none());
assert.deepStrictEqual(O.filter(O.some(2), isNumber), O.some(2));
```

**`Since`**

2.0.0

▸ **filter**<`C`, `B`, `A`\>(`self`, `refinement`): [`Option`](O.md#option)<`B`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `C`  | `C`  |
| `B`  | `B`  |
| `A`  | `C`  |

#### Parameters

| Name         | Type                          |
| :----------- | :---------------------------- |
| `self`       | [`Option`](O.md#option)<`C`\> |
| `refinement` | (`a`: `A`) => a is B          |

#### Returns

[`Option`](O.md#option)<`B`\>

**`Example`**

```ts
import * as O from "effect/Option";

// predicate
const isEven = (n: number) => n % 2 === 0;

assert.deepStrictEqual(O.filter(O.none(), isEven), O.none());
assert.deepStrictEqual(O.filter(O.some(3), isEven), O.none());
assert.deepStrictEqual(O.filter(O.some(2), isEven), O.some(2));

// refinement
const isNumber = (v: unknown): v is number => typeof v === "number";

assert.deepStrictEqual(O.filter(O.none(), isNumber), O.none());
assert.deepStrictEqual(O.filter(O.some("hello"), isNumber), O.none());
assert.deepStrictEqual(O.filter(O.some(2), isNumber), O.some(2));
```

**`Since`**

2.0.0

▸ **filter**<`B`, `A`\>(`self`, `predicate`): [`Option`](O.md#option)<`B`\>

Filters an `Option` using a predicate. If the predicate is not satisfied or the `Option` is `None` returns `None`.

If you need to change the type of the `Option` in addition to filtering, see `filterMap`.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type                          | Description                                          |
| :---------- | :---------------------------- | :--------------------------------------------------- |
| `self`      | [`Option`](O.md#option)<`B`\> | -                                                    |
| `predicate` | (`a`: `A`) => `boolean`       | A predicate function to apply to the `Option` value. |

#### Returns

[`Option`](O.md#option)<`B`\>

**`Example`**

```ts
import * as O from "effect/Option";

// predicate
const isEven = (n: number) => n % 2 === 0;

assert.deepStrictEqual(O.filter(O.none(), isEven), O.none());
assert.deepStrictEqual(O.filter(O.some(3), isEven), O.none());
assert.deepStrictEqual(O.filter(O.some(2), isEven), O.some(2));

// refinement
const isNumber = (v: unknown): v is number => typeof v === "number";

assert.deepStrictEqual(O.filter(O.none(), isNumber), O.none());
assert.deepStrictEqual(O.filter(O.some("hello"), isNumber), O.none());
assert.deepStrictEqual(O.filter(O.some(2), isNumber), O.some(2));
```

**`Since`**

2.0.0

---

### filterMap

▸ **filterMap**<`A`, `B`\>(`f`): (`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<`B`\>

Maps over the value of an `Option` and filters out `None`s.

Useful when in addition to filtering you also want to change the type of the `Option`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                                        | Description                                       |
| :--- | :------------------------------------------ | :------------------------------------------------ |
| `f`  | (`a`: `A`) => [`Option`](O.md#option)<`B`\> | A function to apply to the value of the `Option`. |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<`B`\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Example`**

```ts
import * as O from "effect/Option";

const evenNumber = (n: number) => n % 2 === 0 ? O.some(n) : O.none();

assert.deepStrictEqual(O.filterMap(O.none(), evenNumber), O.none());
assert.deepStrictEqual(O.filterMap(O.some(3), evenNumber), O.none());
assert.deepStrictEqual(O.filterMap(O.some(2), evenNumber), O.some(2));
```

**`Since`**

2.0.0

▸ **filterMap**<`A`, `B`\>(`self`, `f`): [`Option`](O.md#option)<`B`\>

Maps over the value of an `Option` and filters out `None`s.

Useful when in addition to filtering you also want to change the type of the `Option`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                        | Description                                       |
| :----- | :------------------------------------------ | :------------------------------------------------ |
| `self` | [`Option`](O.md#option)<`A`\>               | The `Option` to map over.                         |
| `f`    | (`a`: `A`) => [`Option`](O.md#option)<`B`\> | A function to apply to the value of the `Option`. |

#### Returns

[`Option`](O.md#option)<`B`\>

**`Example`**

```ts
import * as O from "effect/Option";

const evenNumber = (n: number) => n % 2 === 0 ? O.some(n) : O.none();

assert.deepStrictEqual(O.filterMap(O.none(), evenNumber), O.none());
assert.deepStrictEqual(O.filterMap(O.some(3), evenNumber), O.none());
assert.deepStrictEqual(O.filterMap(O.some(2), evenNumber), O.some(2));
```

**`Since`**

2.0.0

---

### partitionMap

▸ **partitionMap**<`A`, `B`, `C`\>(`f`): (`self`: [`Option`](O.md#option)<`A`\>) => [[`Option`](O.md#option)<`B`\>, [`Option`](O.md#option)<`C`\>]

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name | Type                                             |
| :--- | :----------------------------------------------- |
| `f`  | (`a`: `A`) => [`Either`](E.md#either)<`B`, `C`\> |

#### Returns

`fn`

▸ (`self`): [[`Option`](O.md#option)<`B`\>, [`Option`](O.md#option)<`C`\>]

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[[`Option`](O.md#option)<`B`\>, [`Option`](O.md#option)<`C`\>]

**`Since`**

2.0.0

▸ **partitionMap**<`A`, `B`, `C`\>(`self`, `f`): [[`Option`](O.md#option)<`B`\>, [`Option`](O.md#option)<`C`\>]

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name   | Type                                             |
| :----- | :----------------------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\>                    |
| `f`    | (`a`: `A`) => [`Either`](E.md#either)<`B`, `C`\> |

#### Returns

[[`Option`](O.md#option)<`B`\>, [`Option`](O.md#option)<`C`\>]

**`Since`**

2.0.0

## folding

### reduceCompact

▸ **reduceCompact**<`B`, `A`\>(`b`, `f`): (`self`: `Iterable`<[`Option`](O.md#option)<`A`\>\>) => `B`

Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.

#### Type parameters

| Name |
| :--- |
| `B`  |
| `A`  |

#### Parameters

| Name | Type                        | Description                                                                                               |
| :--- | :-------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `b`  | `B`                         | The initial value of the accumulator.                                                                     |
| `f`  | (`b`: `B`, `a`: `A`) => `B` | The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`. |

#### Returns

`fn`

▸ (`self`): `B`

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | `Iterable`<[`Option`](O.md#option)<`A`\>\> |

##### Returns

`B`

**`Example`**

```ts
import { some, none, reduceCompact } from "effect/Option";
import { pipe } from "effect/Function";

const iterable = [some(1), none(), some(2), none()];
assert.deepStrictEqual(pipe(iterable, reduceCompact(0, (b, a) => b + a)), 3);
```

**`Since`**

2.0.0

▸ **reduceCompact**<`A`, `B`\>(`self`, `b`, `f`): `B`

Reduces an `Iterable` of `Option<A>` to a single value of type `B`, elements that are `None` are ignored.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                       | Description                                                                                               |
| :----- | :----------------------------------------- | :-------------------------------------------------------------------------------------------------------- |
| `self` | `Iterable`<[`Option`](O.md#option)<`A`\>\> | The Iterable of `Option<A>` to be reduced.                                                                |
| `b`    | `B`                                        | The initial value of the accumulator.                                                                     |
| `f`    | (`b`: `B`, `a`: `A`) => `B`                | The reducing function that takes the current accumulator value and the unwrapped value of an `Option<A>`. |

#### Returns

`B`

**`Example`**

```ts
import { some, none, reduceCompact } from "effect/Option";
import { pipe } from "effect/Function";

const iterable = [some(1), none(), some(2), none()];
assert.deepStrictEqual(pipe(iterable, reduceCompact(0, (b, a) => b + a)), 3);
```

**`Since`**

2.0.0

## generators

### gen

▸ **gen**<`K`, `A`\>(`body`): [`Option`](O.md#option)<`A`\>

#### Type parameters

| Name | Type                                                                                                |
| :--- | :-------------------------------------------------------------------------------------------------- |
| `K`  | extends `Variance`<[`OptionTypeLambda`](../interfaces/O.OptionTypeLambda.md), `any`, `any`, `any`\> |
| `A`  | `A`                                                                                                 |

#### Parameters

| Name   | Type                                                                                                                   |
| :----- | :--------------------------------------------------------------------------------------------------------------------- |
| `body` | (`resume`: `Adapter`<[`OptionTypeLambda`](../interfaces/O.OptionTypeLambda.md)\>) => `Generator`<`K`, `A`, `unknown`\> |

#### Returns

[`Option`](O.md#option)<`A`\>

**`Since`**

2.0.0

## getters

### getOrElse

▸ **getOrElse**<`B`\>(`onNone`): <A\>(`self`: [`Option`](O.md#option)<`A`\>) => `B` \| `A`

Returns the value of the `Option` if it is `Some`, otherwise returns `onNone`

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name     | Type                                          | Description                                                                  |
| :------- | :-------------------------------------------- | :--------------------------------------------------------------------------- |
| `onNone` | [`LazyArg`](../interfaces/F.LazyArg.md)<`B`\> | Function that returns the default value to return if the `Option` is `None`. |

#### Returns

`fn`

▸ <`A`\>(`self`): `B` \| `A`

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

`B` \| `A`

**`Example`**

```ts
import { some, none, getOrElse } from "effect/Option";
import { pipe } from "effect/Function";

assert.deepStrictEqual(pipe(some(1), getOrElse(() => 0)), 1);
assert.deepStrictEqual(pipe(none(), getOrElse(() => 0)), 0);
```

**`Since`**

2.0.0

▸ **getOrElse**<`A`, `B`\>(`self`, `onNone`): `A` \| `B`

Returns the value of the `Option` if it is `Some`, otherwise returns `onNone`

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name     | Type                                          | Description                                                                  |
| :------- | :-------------------------------------------- | :--------------------------------------------------------------------------- |
| `self`   | [`Option`](O.md#option)<`A`\>                 | The `Option` to get the value of.                                            |
| `onNone` | [`LazyArg`](../interfaces/F.LazyArg.md)<`B`\> | Function that returns the default value to return if the `Option` is `None`. |

#### Returns

`A` \| `B`

**`Example`**

```ts
import { some, none, getOrElse } from "effect/Option";
import { pipe } from "effect/Function";

assert.deepStrictEqual(pipe(some(1), getOrElse(() => 0)), 1);
assert.deepStrictEqual(pipe(none(), getOrElse(() => 0)), 0);
```

**`Since`**

2.0.0

---

### getOrNull

▸ **getOrNull**<`A`\>(`self`): `null` \| `A`

Returns the value of the `Option` if it is a `Some`, otherwise returns `null`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                          | Description                             |
| :----- | :---------------------------- | :-------------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> | The `Option` to extract the value from. |

#### Returns

`null` \| `A`

**`Example`**

```ts
import * as O from "effect/Option";

assert.deepStrictEqual(O.getOrNull(O.some(1)), 1);
assert.deepStrictEqual(O.getOrNull(O.none()), null);
```

**`Since`**

2.0.0

---

### getOrUndefined

▸ **getOrUndefined**<`A`\>(`self`): `undefined` \| `A`

Returns the value of the `Option` if it is a `Some`, otherwise returns `undefined`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                          | Description                             |
| :----- | :---------------------------- | :-------------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> | The `Option` to extract the value from. |

#### Returns

`undefined` \| `A`

**`Example`**

```ts
import * as O from "effect/Option";

assert.deepStrictEqual(O.getOrUndefined(O.some(1)), 1);
assert.deepStrictEqual(O.getOrUndefined(O.none()), undefined);
```

**`Since`**

2.0.0

## guards

### isNone

▸ **isNone**<`A`\>(`self`): self is None<A\>

Determine if a `Option` is a `None`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                          | Description            |
| :----- | :---------------------------- | :--------------------- |
| `self` | [`Option`](O.md#option)<`A`\> | The `Option` to check. |

#### Returns

self is None<A\>

**`Example`**

```ts
import { some, none, isNone } from "effect/Option";

assert.deepStrictEqual(isNone(some(1)), false);
assert.deepStrictEqual(isNone(none()), true);
```

**`Since`**

2.0.0

---

### isOption

▸ **isOption**(`input`): input is Option<unknown\>

Tests if a value is a `Option`.

#### Parameters

| Name    | Type      | Description         |
| :------ | :-------- | :------------------ |
| `input` | `unknown` | The value to check. |

#### Returns

input is Option<unknown\>

**`Example`**

```ts
import { some, none, isOption } from "effect/Option";

assert.deepStrictEqual(isOption(some(1)), true);
assert.deepStrictEqual(isOption(none()), true);
assert.deepStrictEqual(isOption({}), false);
```

**`Since`**

2.0.0

---

### isSome

▸ **isSome**<`A`\>(`self`): self is Some<A\>

Determine if a `Option` is a `Some`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                          | Description            |
| :----- | :---------------------------- | :--------------------- |
| `self` | [`Option`](O.md#option)<`A`\> | The `Option` to check. |

#### Returns

self is Some<A\>

**`Example`**

```ts
import { some, none, isSome } from "effect/Option";

assert.deepStrictEqual(isSome(some(1)), true);
assert.deepStrictEqual(isSome(none()), false);
```

**`Since`**

2.0.0

## lifting

### lift2

▸ **lift2**<`A`, `B`, `C`\>(`f`): (`that`: [`Option`](O.md#option)<`B`\>) => (`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<`C`\>(`self`: [`Option`](O.md#option)<`A`\>, `that`: [`Option`](O.md#option)<`B`\>) => [`Option`](O.md#option)<`C`\>

Lifts a binary function into `Option`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name | Type                        | Description           |
| :--- | :-------------------------- | :-------------------- |
| `f`  | (`a`: `A`, `b`: `B`) => `C` | The function to lift. |

#### Returns

`fn`

▸ (`that`): (`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<`C`\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `that` | [`Option`](O.md#option)<`B`\> |

##### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<`C`\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<`C`\>

▸ (`self`, `that`): [`Option`](O.md#option)<`C`\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |
| `that` | [`Option`](O.md#option)<`B`\> |

##### Returns

[`Option`](O.md#option)<`C`\>

**`Since`**

2.0.0

---

### liftPredicate

▸ **liftPredicate**<`C`, `B`, `A`\>(`refinement`): (`c`: `C`) => [`Option`](O.md#option)<`B`\>

Transforms a `Predicate` function into a `Some` of the input value if the predicate returns `true` or `None`
if the predicate returns `false`.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `C`  | `C`  |
| `B`  | `B`  |
| `A`  | `C`  |

#### Parameters

| Name         | Type                    |
| :----------- | :---------------------- |
| `refinement` | `Refinement`<`A`, `B`\> |

#### Returns

`fn`

▸ (`c`): [`Option`](O.md#option)<`B`\>

##### Parameters

| Name | Type |
| :--- | :--- |
| `c`  | `C`  |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Example`**

```ts
import * as O from "effect/Option";

const getOption = O.liftPredicate((n: number) => n >= 0);

assert.deepStrictEqual(getOption(-1), O.none());
assert.deepStrictEqual(getOption(1), O.some(1));
```

**`Since`**

2.0.0

▸ **liftPredicate**<`B`, `A`\>(`predicate`): (`b`: `B`) => [`Option`](O.md#option)<`B`\>

Transforms a `Predicate` function into a `Some` of the input value if the predicate returns `true` or `None`
if the predicate returns `false`.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `B`  |

#### Parameters

| Name        | Type              | Description                                                                     |
| :---------- | :---------------- | :------------------------------------------------------------------------------ |
| `predicate` | `Predicate`<`A`\> | A `Predicate` function that takes in a value of type `A` and returns a boolean. |

#### Returns

`fn`

▸ (`b`): [`Option`](O.md#option)<`B`\>

##### Parameters

| Name | Type |
| :--- | :--- |
| `b`  | `B`  |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Example`**

```ts
import * as O from "effect/Option";

const getOption = O.liftPredicate((n: number) => n >= 0);

assert.deepStrictEqual(getOption(-1), O.none());
assert.deepStrictEqual(getOption(1), O.some(1));
```

**`Since`**

2.0.0

## models

### Option

Ƭ **Option**<`A`\>: [`None`](../interfaces/O.None.md)<`A`\> \| [`Some`](../interfaces/O.Some.md)<`A`\>

**`Since`**

2.0.0

#### Type parameters

| Name |
| :--- |
| `A`  |

## pattern matching

### match

▸ **match**<`B`, `A`, `C`\>(`options`): (`self`: [`Option`](O.md#option)<`A`\>) => `B` \| `C`

Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
function when passed the `Option`'s value.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `B`  | `B`  |
| `A`  | `A`  |
| `C`  | `B`  |

#### Parameters

| Name             | Type                                          |
| :--------------- | :-------------------------------------------- |
| `options`        | `Object`                                      |
| `options.onNone` | [`LazyArg`](../interfaces/F.LazyArg.md)<`B`\> |
| `options.onSome` | (`a`: `A`) => `C`                             |

#### Returns

`fn`

▸ (`self`): `B` \| `C`

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

`B` \| `C`

**`Example`**

```ts
import { some, none, match } from "effect/Option";
import { pipe } from "effect/Function";

assert.deepStrictEqual(
  pipe(some(1), match({ onNone: () => "a none", onSome: (a) => `a some containing ${a}` })),
  "a some containing 1",
);

assert.deepStrictEqual(
  pipe(none(), match({ onNone: () => "a none", onSome: (a) => `a some containing ${a}` })),
  "a none",
);
```

**`Since`**

2.0.0

▸ **match**<`A`, `B`, `C`\>(`self`, `options`): `B` \| `C`

Matches the given `Option` and returns either the provided `onNone` value or the result of the provided `onSome`
function when passed the `Option`'s value.

#### Type parameters

| Name | Type |
| :--- | :--- |
| `A`  | `A`  |
| `B`  | `B`  |
| `C`  | `B`  |

#### Parameters

| Name             | Type                                          | Description           |
| :--------------- | :-------------------------------------------- | :-------------------- |
| `self`           | [`Option`](O.md#option)<`A`\>                 | The `Option` to match |
| `options`        | `Object`                                      | -                     |
| `options.onNone` | [`LazyArg`](../interfaces/F.LazyArg.md)<`B`\> | -                     |
| `options.onSome` | (`a`: `A`) => `C`                             | -                     |

#### Returns

`B` \| `C`

**`Example`**

```ts
import { some, none, match } from "effect/Option";
import { pipe } from "effect/Function";

assert.deepStrictEqual(
  pipe(some(1), match({ onNone: () => "a none", onSome: (a) => `a some containing ${a}` })),
  "a some containing 1",
);

assert.deepStrictEqual(
  pipe(none(), match({ onNone: () => "a none", onSome: (a) => `a some containing ${a}` })),
  "a none",
);
```

**`Since`**

2.0.0

## sorting

### getOrder

▸ **getOrder**<`A`\>(`O`): `Order`<[`Option`](O.md#option)<`A`\>\>

The `Order` instance allows `Option` values to be compared with
`compare`, whenever there is an `Order` instance for
the type the `Option` contains.

`None` is considered to be less than any `Some` value.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type          |
| :--- | :------------ |
| `O`  | `Order`<`A`\> |

#### Returns

`Order`<[`Option`](O.md#option)<`A`\>\>

**`Example`**

```ts
import { none, some, getOrder } from "effect/Option";
import * as N from "effect/Number";
import { pipe } from "effect/Function";

const O = getOrder(N.Order);
assert.deepStrictEqual(O(none(), none()), 0);
assert.deepStrictEqual(O(none(), some(1)), -1);
assert.deepStrictEqual(O(some(1), none()), 1);
assert.deepStrictEqual(O(some(1), some(2)), -1);
assert.deepStrictEqual(O(some(1), some(1)), 0);
```

**`Since`**

2.0.0

## symbols

### TypeId

Ƭ **TypeId**: typeof [`TypeId`](O.md#typeid-1)

**`Since`**

2.0.0

---

### TypeId

• `Const` **TypeId**: unique `symbol`

**`Since`**

2.0.0

## transforming

### as

▸ **as**<`B`\>(`b`): <_\>(`self`: [`Option`](O.md#option)<`_`\>) => [`Option`](O.md#option)<`B`\>

Maps the `Some` value of this `Option` to the specified constant value.

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name | Type |
| :--- | :--- |
| `b`  | `B`  |

#### Returns

`fn`

▸ <`_`\>(`self`): [`Option`](O.md#option)<`B`\>

##### Type parameters

| Name |
| :--- |
| `_`  |

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`_`\> |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Since`**

2.0.0

---

### asUnit

▸ **asUnit**<`_`\>(`self`): [`Option`](O.md#option)<`void`\>

Maps the `Some` value of this `Option` to the `void` constant value.

This is useful when the value of the `Option` is not needed, but the presence or absence of the value is important.

#### Type parameters

| Name |
| :--- |
| `_`  |

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`_`\> |

#### Returns

[`Option`](O.md#option)<`void`\>

**`Since`**

2.0.0

---

### composeK

▸ **composeK**<`B`, `C`\>(`bfc`): <A\>(`afb`: (`a`: `A`) => [`Option`](O.md#option)<`B`\>) => (`a`: `A`) => [`Option`](O.md#option)<`C`\>

#### Type parameters

| Name |
| :--- |
| `B`  |
| `C`  |

#### Parameters

| Name  | Type                                        |
| :---- | :------------------------------------------ |
| `bfc` | (`b`: `B`) => [`Option`](O.md#option)<`C`\> |

#### Returns

`fn`

▸ <`A`\>(`afb`): (`a`: `A`) => [`Option`](O.md#option)<`C`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name  | Type                                        |
| :---- | :------------------------------------------ |
| `afb` | (`a`: `A`) => [`Option`](O.md#option)<`B`\> |

##### Returns

`fn`

▸ (`a`): [`Option`](O.md#option)<`C`\>

##### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

##### Returns

[`Option`](O.md#option)<`C`\>

**`Since`**

2.0.0

▸ **composeK**<`A`, `B`, `C`\>(`afb`, `bfc`): (`a`: `A`) => [`Option`](O.md#option)<`C`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |
| `C`  |

#### Parameters

| Name  | Type                                        |
| :---- | :------------------------------------------ |
| `afb` | (`a`: `A`) => [`Option`](O.md#option)<`B`\> |
| `bfc` | (`b`: `B`) => [`Option`](O.md#option)<`C`\> |

#### Returns

`fn`

▸ (`a`): [`Option`](O.md#option)<`C`\>

##### Parameters

| Name | Type |
| :--- | :--- |
| `a`  | `A`  |

##### Returns

[`Option`](O.md#option)<`C`\>

**`Since`**

2.0.0

---

### flatMap

▸ **flatMap**<`A`, `B`\>(`f`): (`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<`B`\>

Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                                        |
| :--- | :------------------------------------------ |
| `f`  | (`a`: `A`) => [`Option`](O.md#option)<`B`\> |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<`B`\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Since`**

2.0.0

▸ **flatMap**<`A`, `B`\>(`self`, `f`): [`Option`](O.md#option)<`B`\>

Applies a function to the value of an `Option` and flattens the result, if the input is `Some`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                        |
| :----- | :------------------------------------------ |
| `self` | [`Option`](O.md#option)<`A`\>               |
| `f`    | (`a`: `A`) => [`Option`](O.md#option)<`B`\> |

#### Returns

[`Option`](O.md#option)<`B`\>

**`Since`**

2.0.0

---

### flatMapNullable

▸ **flatMapNullable**<`A`, `B`\>(`f`): (`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<`NonNullable`<`B`\>\>

This is `flatMap` + `fromNullable`, useful when working with optional values.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                                       |
| :--- | :----------------------------------------- |
| `f`  | (`a`: `A`) => `undefined` \| `null` \| `B` |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<`NonNullable`<`B`\>\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<`NonNullable`<`B`\>\>

**`Example`**

```ts
import { some, none, flatMapNullable } from "effect/Option";
import { pipe } from "effect/Function";

interface Employee {
  company?: {
    address?: {
      street?: {
        name?: string;
      };
    };
  };
}

const employee1: Employee = { company: { address: { street: { name: "high street" } } } };

assert.deepStrictEqual(
  pipe(
    some(employee1),
    flatMapNullable(employee => employee.company?.address?.street?.name),
  ),
  some("high street"),
);

const employee2: Employee = { company: { address: { street: {} } } };

assert.deepStrictEqual(
  pipe(
    some(employee2),
    flatMapNullable(employee => employee.company?.address?.street?.name),
  ),
  none(),
);
```

**`Since`**

2.0.0

▸ **flatMapNullable**<`A`, `B`\>(`self`, `f`): [`Option`](O.md#option)<`NonNullable`<`B`\>\>

This is `flatMap` + `fromNullable`, useful when working with optional values.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\>              |
| `f`    | (`a`: `A`) => `undefined` \| `null` \| `B` |

#### Returns

[`Option`](O.md#option)<`NonNullable`<`B`\>\>

**`Example`**

```ts
import { some, none, flatMapNullable } from "effect/Option";
import { pipe } from "effect/Function";

interface Employee {
  company?: {
    address?: {
      street?: {
        name?: string;
      };
    };
  };
}

const employee1: Employee = { company: { address: { street: { name: "high street" } } } };

assert.deepStrictEqual(
  pipe(
    some(employee1),
    flatMapNullable(employee => employee.company?.address?.street?.name),
  ),
  some("high street"),
);

const employee2: Employee = { company: { address: { street: {} } } };

assert.deepStrictEqual(
  pipe(
    some(employee2),
    flatMapNullable(employee => employee.company?.address?.street?.name),
  ),
  none(),
);
```

**`Since`**

2.0.0

---

### flatten

▸ **flatten**<`A`\>(`self`): [`Option`](O.md#option)<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                    |
| :----- | :------------------------------------------------------ |
| `self` | [`Option`](O.md#option)<[`Option`](O.md#option)<`A`\>\> |

#### Returns

[`Option`](O.md#option)<`A`\>

**`Since`**

2.0.0

---

### map

▸ **map**<`A`, `B`\>(`f`): (`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<`B`\>

Maps the `Some` side of an `Option` value to a new `Option` value.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type              | Description                                        |
| :--- | :---------------- | :------------------------------------------------- |
| `f`  | (`a`: `A`) => `B` | The function to map over the value of the `Option` |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<`B`\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Since`**

2.0.0

▸ **map**<`A`, `B`\>(`self`, `f`): [`Option`](O.md#option)<`B`\>

Maps the `Some` side of an `Option` value to a new `Option` value.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                          | Description                                        |
| :----- | :---------------------------- | :------------------------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> | An `Option` to map                                 |
| `f`    | (`a`: `A`) => `B`             | The function to map over the value of the `Option` |

#### Returns

[`Option`](O.md#option)<`B`\>

**`Since`**

2.0.0

---

### tap

▸ **tap**<`A`, `_`\>(`f`): (`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<`A`\>

Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
unless `f` returns `None`, in which case it returns `None`.

This function is useful for performing additional computations on the value of the input `Option` without affecting its value.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `_`  |

#### Parameters

| Name | Type                                        | Description                                                    |
| :--- | :------------------------------------------ | :------------------------------------------------------------- |
| `f`  | (`a`: `A`) => [`Option`](O.md#option)<`_`\> | Function to apply to the value of the `Option` if it is `Some` |

#### Returns

`fn`

▸ (`self`): [`Option`](O.md#option)<`A`\>

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<`A`\>

**`Example`**

```ts
import * as O from "effect/Option";

const getInteger = (n: number) => Number.isInteger(n) ? O.some(n) : O.none();

assert.deepStrictEqual(O.tap(O.none(), getInteger), O.none());
assert.deepStrictEqual(O.tap(O.some(1), getInteger), O.some(1));
assert.deepStrictEqual(O.tap(O.some(1.14), getInteger), O.none());
```

**`Since`**

2.0.0

▸ **tap**<`A`, `_`\>(`self`, `f`): [`Option`](O.md#option)<`A`\>

Applies the provided function `f` to the value of the `Option` if it is `Some` and returns the original `Option`
unless `f` returns `None`, in which case it returns `None`.

This function is useful for performing additional computations on the value of the input `Option` without affecting its value.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `_`  |

#### Parameters

| Name   | Type                                        | Description                                                    |
| :----- | :------------------------------------------ | :------------------------------------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\>               | The `Option` to apply the function to                          |
| `f`    | (`a`: `A`) => [`Option`](O.md#option)<`_`\> | Function to apply to the value of the `Option` if it is `Some` |

#### Returns

[`Option`](O.md#option)<`A`\>

**`Example`**

```ts
import * as O from "effect/Option";

const getInteger = (n: number) => Number.isInteger(n) ? O.some(n) : O.none();

assert.deepStrictEqual(O.tap(O.none(), getInteger), O.none());
assert.deepStrictEqual(O.tap(O.some(1), getInteger), O.some(1));
assert.deepStrictEqual(O.tap(O.some(1.14), getInteger), O.none());
```

**`Since`**

2.0.0

---

### zipLeft

▸ **zipLeft**<`_`\>(`that`): <A\>(`self`: [`Option`](O.md#option)<`A`\>) => [`Option`](O.md#option)<`A`\>

Sequences the specified `that` `Option` but ignores its value.

It is useful when we want to chain multiple operations, but only care about the result of `self`.

#### Type parameters

| Name |
| :--- |
| `_`  |

#### Parameters

| Name   | Type                          | Description                                                  |
| :----- | :---------------------------- | :----------------------------------------------------------- |
| `that` | [`Option`](O.md#option)<`_`\> | The `Option` that will be ignored in the chain and discarded |

#### Returns

`fn`

▸ <`A`\>(`self`): [`Option`](O.md#option)<`A`\>

##### Type parameters

| Name |
| :--- |
| `A`  |

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> |

##### Returns

[`Option`](O.md#option)<`A`\>

**`Since`**

2.0.0

▸ **zipLeft**<`A`, `_`\>(`self`, `that`): [`Option`](O.md#option)<`A`\>

Sequences the specified `that` `Option` but ignores its value.

It is useful when we want to chain multiple operations, but only care about the result of `self`.

#### Type parameters

| Name |
| :--- |
| `A`  |
| `_`  |

#### Parameters

| Name   | Type                          | Description                                                  |
| :----- | :---------------------------- | :----------------------------------------------------------- |
| `self` | [`Option`](O.md#option)<`A`\> | The `Option` we care about                                   |
| `that` | [`Option`](O.md#option)<`_`\> | The `Option` that will be ignored in the chain and discarded |

#### Returns

[`Option`](O.md#option)<`A`\>

**`Since`**

2.0.0

---

### zipRight

▸ **zipRight**<`B`\>(`that`): <_\>(`self`: [`Option`](O.md#option)<`_`\>) => [`Option`](O.md#option)<`B`\>

#### Type parameters

| Name |
| :--- |
| `B`  |

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `that` | [`Option`](O.md#option)<`B`\> |

#### Returns

`fn`

▸ <`_`\>(`self`): [`Option`](O.md#option)<`B`\>

##### Type parameters

| Name |
| :--- |
| `_`  |

##### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`_`\> |

##### Returns

[`Option`](O.md#option)<`B`\>

**`Since`**

2.0.0

▸ **zipRight**<`_`, `B`\>(`self`, `that`): [`Option`](O.md#option)<`B`\>

#### Type parameters

| Name |
| :--- |
| `_`  |
| `B`  |

#### Parameters

| Name   | Type                          |
| :----- | :---------------------------- |
| `self` | [`Option`](O.md#option)<`_`\> |
| `that` | [`Option`](O.md#option)<`B`\> |

#### Returns

[`Option`](O.md#option)<`B`\>

**`Since`**

2.0.0
