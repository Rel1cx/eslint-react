[@eslint-react/tools](../README.md) / E

# Namespace: E

## Table of contents

### Interfaces

- [EitherTypeLambda](../interfaces/E.EitherTypeLambda.md)
- [EitherUnify](../interfaces/E.EitherUnify.md)
- [EitherUnifyIgnore](../interfaces/E.EitherUnifyIgnore.md)
- [Left](../interfaces/E.Left.md)
- [Right](../interfaces/E.Right.md)

### Type Aliases

- [Either](E.md#either)
- [TypeId](E.md#typeid)

### Variables

- [TypeId](E.md#typeid-1)

### Functions

- [all](E.md#all)
- [andThen](E.md#andthen)
- [ap](E.md#ap)
- [filterOrLeft](E.md#filterorleft)
- [flatMap](E.md#flatmap)
- [flip](E.md#flip)
- [fromNullable](E.md#fromnullable)
- [fromOption](E.md#fromoption)
- [gen](E.md#gen)
- [getEquivalence](E.md#getequivalence)
- [getLeft](E.md#getleft)
- [getOrElse](E.md#getorelse)
- [getOrNull](E.md#getornull)
- [getOrThrow](E.md#getorthrow)
- [getOrThrowWith](E.md#getorthrowwith)
- [getOrUndefined](E.md#getorundefined)
- [getRight](E.md#getright)
- [isEither](E.md#iseither)
- [isLeft](E.md#isleft)
- [isRight](E.md#isright)
- [left](E.md#left)
- [map](E.md#map)
- [mapBoth](E.md#mapboth)
- [mapLeft](E.md#mapleft)
- [match](E.md#match)
- [merge](E.md#merge)
- [orElse](E.md#orelse)
- [right](E.md#right)
- [try](E.md#try)
- [zipWith](E.md#zipwith)

## Other

### try

▸ **try**\<`A`, `E`\>(`options`): [`Either`](E.md#either)\<`E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.catch` | (`error`: `unknown`) => `E` |
| `options.try` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`A`\> |

#### Returns

[`Either`](E.md#either)\<`E`, `A`\>

▸ **try**\<`A`\>(`evaluate`): [`Either`](E.md#either)\<`unknown`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/F.LazyArg.md)\<`A`\> |

#### Returns

[`Either`](E.md#either)\<`unknown`, `A`\>

## combining

### all

▸ **all**\<`I`\>(`input`): [`I`] extends [readonly [`Either`](E.md#either)\<`any`, `any`\>[]] ? [`Either`](E.md#either)\<`I`[`number`] extends `never` ? `never` : [`I`[`number`]] extends [[`Either`](E.md#either)\<`E`, `any`\>] ? `E` : `never`, \{ -readonly [K in string \| number \| symbol]: [I[K]] extends [Either\<any, A\>] ? A : never }\> : [`I`] extends [`Iterable`\<[`Either`](E.md#either)\<`E`, `A`\>\>] ? [`Either`](E.md#either)\<`E`, `A`[]\> : [`Either`](E.md#either)\<`I`[keyof `I`] extends `never` ? `never` : [`I`[keyof `I`]] extends [[`Either`](E.md#either)\<`E`, `any`\>] ? `E` : `never`, \{ -readonly [K in string \| number \| symbol]: [I[K]] extends [Either\<any, A\>] ? A : never }\>

Takes a structure of `Either`s and returns an `Either` of values with the same structure.

- If a tuple is supplied, then the returned `Either` will contain a tuple with the same length.
- If a struct is supplied, then the returned `Either` will contain a struct with the same keys.
- If an iterable is supplied, then the returned `Either` will contain an array.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Iterable`\<[`Either`](E.md#either)\<`any`, `any`\>\> \| `Record`\<`string`, [`Either`](E.md#either)\<`any`, `any`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `I` |

#### Returns

[`I`] extends [readonly [`Either`](E.md#either)\<`any`, `any`\>[]] ? [`Either`](E.md#either)\<`I`[`number`] extends `never` ? `never` : [`I`[`number`]] extends [[`Either`](E.md#either)\<`E`, `any`\>] ? `E` : `never`, \{ -readonly [K in string \| number \| symbol]: [I[K]] extends [Either\<any, A\>] ? A : never }\> : [`I`] extends [`Iterable`\<[`Either`](E.md#either)\<`E`, `A`\>\>] ? [`Either`](E.md#either)\<`E`, `A`[]\> : [`Either`](E.md#either)\<`I`[keyof `I`] extends `never` ? `never` : [`I`[keyof `I`]] extends [[`Either`](E.md#either)\<`E`, `any`\>] ? `E` : `never`, \{ -readonly [K in string \| number \| symbol]: [I[K]] extends [Either\<any, A\>] ? A : never }\>

**`Example`**

```ts
import * as Either from "effect/Either"

assert.deepStrictEqual(Either.all([Either.right(1), Either.right(2)]), Either.right([1, 2]))
assert.deepStrictEqual(Either.all({ a: Either.right(1), b: Either.right("hello") }), Either.right({ a: 1, b: "hello" }))
assert.deepStrictEqual(Either.all({ a: Either.right(1), b: Either.left("error") }), Either.left("error"))
```

**`Since`**

2.0.0

___

### ap

▸ **ap**\<`E2`, `A`\>(`that`): \<E, B\>(`self`: [`Either`](E.md#either)\<`E`, (`a`: `A`) => `B`\>) => [`Either`](E.md#either)\<`E2` \| `E`, `B`\>

#### Type parameters

| Name |
| :------ |
| `E2` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Either`](E.md#either)\<`E2`, `A`\> |

#### Returns

`fn`

▸ \<`E`, `B`\>(`self`): [`Either`](E.md#either)\<`E2` \| `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `E` |
| `B` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, (`a`: `A`) => `B`\> |

##### Returns

[`Either`](E.md#either)\<`E2` \| `E`, `B`\>

**`Since`**

2.0.0

▸ **ap**\<`E`, `A`, `B`, `E2`\>(`self`, `that`): [`Either`](E.md#either)\<`E` \| `E2`, `B`\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `B` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, (`a`: `A`) => `B`\> |
| `that` | [`Either`](E.md#either)\<`E2`, `A`\> |

#### Returns

[`Either`](E.md#either)\<`E` \| `E2`, `B`\>

**`Since`**

2.0.0

## constructors

### fromNullable

▸ **fromNullable**\<`A`, `E`\>(`onNullable`): (`self`: `A`) => [`Either`](E.md#either)\<`E`, `NonNullable`\<`A`\>\>

Takes a lazy default and a nullable value, if the value is not nully (`null` or `undefined`), turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onNullable` | (`a`: `A`) => `E` |

#### Returns

`fn`

▸ (`self`): [`Either`](E.md#either)\<`E`, `NonNullable`\<`A`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

[`Either`](E.md#either)\<`E`, `NonNullable`\<`A`\>\>

**`Example`**

```ts
import * as Either from 'effect/Either'

assert.deepStrictEqual(Either.fromNullable(1, () => 'fallback'), Either.right(1))
assert.deepStrictEqual(Either.fromNullable(null, () => 'fallback'), Either.left('fallback'))
```

**`Since`**

2.0.0

▸ **fromNullable**\<`A`, `E`\>(`self`, `onNullable`): [`Either`](E.md#either)\<`E`, `NonNullable`\<`A`\>\>

Takes a lazy default and a nullable value, if the value is not nully (`null` or `undefined`), turn it into a `Right`, if the value is nully use
the provided default as a `Left`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `onNullable` | (`a`: `A`) => `E` |

#### Returns

[`Either`](E.md#either)\<`E`, `NonNullable`\<`A`\>\>

**`Example`**

```ts
import * as Either from 'effect/Either'

assert.deepStrictEqual(Either.fromNullable(1, () => 'fallback'), Either.right(1))
assert.deepStrictEqual(Either.fromNullable(null, () => 'fallback'), Either.left('fallback'))
```

**`Since`**

2.0.0

___

### fromOption

▸ **fromOption**\<`A`, `E`\>(`self`, `onNone`): [`Either`](E.md#either)\<`E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Option`](O.md#option)\<`A`\> |
| `onNone` | () => `E` |

#### Returns

[`Either`](E.md#either)\<`E`, `A`\>

**`Example`**

```ts
import * as Either from 'effect/Either'
import * as Option from 'effect/Option'

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

**`Since`**

2.0.0

▸ **fromOption**\<`E`\>(`onNone`): \<A\>(`self`: [`Option`](O.md#option)\<`A`\>) => [`Either`](E.md#either)\<`E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onNone` | () => `E` |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Either`](E.md#either)\<`E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Option`](O.md#option)\<`A`\> |

##### Returns

[`Either`](E.md#either)\<`E`, `A`\>

**`Example`**

```ts
import * as Either from 'effect/Either'
import * as Option from 'effect/Option'

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

**`Since`**

2.0.0

___

### left

▸ **left**\<`E`\>(`e`): [`Either`](E.md#either)\<`E`, `never`\>

Constructs a new `Either` holding a `Left` value. This usually represents a failure, due to the right-bias of this
structure.

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `e` | `E` |

#### Returns

[`Either`](E.md#either)\<`E`, `never`\>

**`Since`**

2.0.0

___

### right

▸ **right**\<`A`\>(`a`): [`Either`](E.md#either)\<`never`, `A`\>

Constructs a new `Either` holding a `Right` value. This usually represents a successful value due to the right bias
of this structure.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `A` |

#### Returns

[`Either`](E.md#either)\<`never`, `A`\>

**`Since`**

2.0.0

## equivalence

### getEquivalence

▸ **getEquivalence**\<`E`, `A`\>(`EE`, `EA`): `Equivalence`\<[`Either`](E.md#either)\<`E`, `A`\>\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `EE` | `Equivalence`\<`E`\> |
| `EA` | `Equivalence`\<`A`\> |

#### Returns

`Equivalence`\<[`Either`](E.md#either)\<`E`, `A`\>\>

**`Since`**

2.0.0

## error handling

### orElse

▸ **orElse**\<`E1`, `E2`, `B`\>(`that`): \<A\>(`self`: [`Either`](E.md#either)\<`E1`, `A`\>) => [`Either`](E.md#either)\<`E2`, `B` \| `A`\>

Returns `self` if it is a `Right` or `that` otherwise.

#### Type parameters

| Name |
| :------ |
| `E1` |
| `E2` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `that` | (`e1`: `E1`) => [`Either`](E.md#either)\<`E2`, `B`\> | A function that takes the error value from `self` (if it's a `Left`) and returns a new `Either` value. |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Either`](E.md#either)\<`E2`, `B` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E1`, `A`\> |

##### Returns

[`Either`](E.md#either)\<`E2`, `B` \| `A`\>

**`Since`**

2.0.0

▸ **orElse**\<`E1`, `A`, `E2`, `B`\>(`self`, `that`): [`Either`](E.md#either)\<`E2`, `A` \| `B`\>

Returns `self` if it is a `Right` or `that` otherwise.

#### Type parameters

| Name |
| :------ |
| `E1` |
| `A` |
| `E2` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E1`, `A`\> | The input `Either` value to check and potentially return. |
| `that` | (`e1`: `E1`) => [`Either`](E.md#either)\<`E2`, `B`\> | A function that takes the error value from `self` (if it's a `Left`) and returns a new `Either` value. |

#### Returns

[`Either`](E.md#either)\<`E2`, `A` \| `B`\>

**`Since`**

2.0.0

## filtering &amp; conditionals

### filterOrLeft

▸ **filterOrLeft**\<`A`, `B`, `X`, `E2`\>(`filter`, `orLeftWith`): \<E\>(`self`: [`Either`](E.md#either)\<`E`, `A`\>) => [`Either`](E.md#either)\<`E2` \| `E`, `B`\>

Filter the right value with the provided function.
If the predicate fails, set the left value with the result of the provided function.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |
| `X` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |
| `orLeftWith` | (`a`: `X`) => `E2` |

#### Returns

`fn`

▸ \<`E`\>(`self`): [`Either`](E.md#either)\<`E2` \| `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

##### Returns

[`Either`](E.md#either)\<`E2` \| `E`, `B`\>

**`Example`**

```ts
import * as E from 'effect/Either'
import { pipe } from 'effect/Function'

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    E.right(0),
    E.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  E.left("0 is not positive")
)
```

**`Since`**

2.0.0

▸ **filterOrLeft**\<`A`, `X`, `Y`, `E2`\>(`filter`, `orLeftWith`): \<E\>(`self`: [`Either`](E.md#either)\<`E`, `A`\>) => [`Either`](E.md#either)\<`E2` \| `E`, `A`\>

Filter the right value with the provided function.
If the predicate fails, set the left value with the result of the provided function.

#### Type parameters

| Name |
| :------ |
| `A` |
| `X` |
| `Y` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `filter` | [`Predicate`](../interfaces/.Predicate.md)\<`X`\> |
| `orLeftWith` | (`a`: `Y`) => `E2` |

#### Returns

`fn`

▸ \<`E`\>(`self`): [`Either`](E.md#either)\<`E2` \| `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

##### Returns

[`Either`](E.md#either)\<`E2` \| `E`, `A`\>

**`Example`**

```ts
import * as E from 'effect/Either'
import { pipe } from 'effect/Function'

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    E.right(0),
    E.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  E.left("0 is not positive")
)
```

**`Since`**

2.0.0

▸ **filterOrLeft**\<`E`, `A`, `B`, `X`, `E2`\>(`self`, `filter`, `orLeftWith`): [`Either`](E.md#either)\<`E` \| `E2`, `B`\>

Filter the right value with the provided function.
If the predicate fails, set the left value with the result of the provided function.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `B` |
| `X` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |
| `filter` | [`Refinement`](../interfaces/.Refinement.md)\<`A`, `B`\> |
| `orLeftWith` | (`a`: `X`) => `E2` |

#### Returns

[`Either`](E.md#either)\<`E` \| `E2`, `B`\>

**`Example`**

```ts
import * as E from 'effect/Either'
import { pipe } from 'effect/Function'

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    E.right(0),
    E.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  E.left("0 is not positive")
)
```

**`Since`**

2.0.0

▸ **filterOrLeft**\<`E`, `A`, `X`, `Y`, `E2`\>(`self`, `filter`, `orLeftWith`): [`Either`](E.md#either)\<`E` \| `E2`, `A`\>

Filter the right value with the provided function.
If the predicate fails, set the left value with the result of the provided function.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `X` |
| `Y` |
| `E2` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |
| `filter` | [`Predicate`](../interfaces/.Predicate.md)\<`X`\> |
| `orLeftWith` | (`a`: `Y`) => `E2` |

#### Returns

[`Either`](E.md#either)\<`E` \| `E2`, `A`\>

**`Example`**

```ts
import * as E from 'effect/Either'
import { pipe } from 'effect/Function'

const isPositive = (n: number): boolean => n > 0

assert.deepStrictEqual(
  pipe(
    E.right(1),
    E.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  E.right(1)
)
assert.deepStrictEqual(
  pipe(
    E.right(0),
    E.filterOrLeft(isPositive, n => `${n} is not positive`)
  ),
  E.left("0 is not positive")
)
```

**`Since`**

2.0.0

## generators

### gen

▸ **gen**\<`K`, `A`\>(`body`): [`Either`](E.md#either)\<[`K`] extends [`Variance`\<[`EitherTypeLambda`](../interfaces/E.EitherTypeLambda.md), `any`, `any`, `E`\>] ? `E` : `never`, `A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `Variance`\<[`EitherTypeLambda`](../interfaces/E.EitherTypeLambda.md), `any`, `any`, `any`\> |
| `A` | `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | (`resume`: `Adapter`\<[`EitherTypeLambda`](../interfaces/E.EitherTypeLambda.md)\>) => `Generator`\<`K`, `A`, `unknown`\> |

#### Returns

[`Either`](E.md#either)\<[`K`] extends [`Variance`\<[`EitherTypeLambda`](../interfaces/E.EitherTypeLambda.md), `any`, `any`, `E`\>] ? `E` : `never`, `A`\>

**`Since`**

2.0.0

## getters

### getLeft

▸ **getLeft**\<`E`, `A`\>(`self`): [`Option`](O.md#option)\<`E`\>

Converts a `Either` to an `Option` discarding the value.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

#### Returns

[`Option`](O.md#option)\<`E`\>

**`Example`**

```ts
import * as O from 'effect/Option'
import * as E from 'effect/Either'

assert.deepStrictEqual(E.getLeft(E.right('ok')), O.none())
assert.deepStrictEqual(E.getLeft(E.left('err')), O.some('err'))
```

**`Since`**

2.0.0

___

### getOrElse

▸ **getOrElse**\<`E`, `B`\>(`onLeft`): \<A\>(`self`: [`Either`](E.md#either)\<`E`, `A`\>) => `B` \| `A`

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

#### Type parameters

| Name |
| :------ |
| `E` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `onLeft` | (`e`: `E`) => `B` |

#### Returns

`fn`

▸ \<`A`\>(`self`): `B` \| `A`

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

##### Returns

`B` \| `A`

**`Example`**

```ts
import * as Either from 'effect/Either'

assert.deepStrictEqual(Either.getOrElse(Either.right(1), (error) => error + "!"), 1)
assert.deepStrictEqual(Either.getOrElse(Either.left("not a number"), (error) => error + "!"), "not a number!")
```

**`Since`**

2.0.0

▸ **getOrElse**\<`E`, `A`, `B`\>(`self`, `onLeft`): `A` \| `B`

Returns the wrapped value if it's a `Right` or a default value if is a `Left`.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |
| `onLeft` | (`e`: `E`) => `B` |

#### Returns

`A` \| `B`

**`Example`**

```ts
import * as Either from 'effect/Either'

assert.deepStrictEqual(Either.getOrElse(Either.right(1), (error) => error + "!"), 1)
assert.deepStrictEqual(Either.getOrElse(Either.left("not a number"), (error) => error + "!"), "not a number!")
```

**`Since`**

2.0.0

___

### getOrNull

▸ **getOrNull**\<`E`, `A`\>(`self`): ``null`` \| `A`

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

#### Returns

``null`` \| `A`

**`Example`**

```ts
import * as Either from 'effect/Either'

assert.deepStrictEqual(Either.getOrNull(Either.right(1)), 1)
assert.deepStrictEqual(Either.getOrNull(Either.left("a")), null)
```

**`Since`**

2.0.0

___

### getOrThrow

▸ **getOrThrow**\<`E`, `A`\>(`self`): `A`

Extracts the value of an `Either` or throws if the `Either` is `Left`.

The thrown error is a default error. To configure the error thrown, see  [getOrThrowWith](E.md#getorthrowwith).

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> | The `Either` to extract the value from. |

#### Returns

`A`

**`Throws`**

`Error("getOrThrow called on a Left")`

**`Example`**

```ts
import * as E from "effect/Either"

assert.deepStrictEqual(E.getOrThrow(E.right(1)), 1)
assert.throws(() => E.getOrThrow(E.left("error")))
```

**`Since`**

2.0.0

___

### getOrThrowWith

▸ **getOrThrowWith**\<`E`\>(`onLeft`): \<A\>(`self`: [`Either`](E.md#either)\<`E`, `A`\>) => `A`

Extracts the value of an `Either` or throws if the `Either` is `Left`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](E.md#getorthrow).

#### Type parameters

| Name |
| :------ |
| `E` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `onLeft` | (`e`: `E`) => `unknown` | A function that will be called if the `Either` is `Left`. It returns the error to be thrown. |

#### Returns

`fn`

▸ \<`A`\>(`self`): `A`

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

##### Returns

`A`

**`Example`**

```ts
import * as E from "effect/Either"

assert.deepStrictEqual(
  E.getOrThrowWith(E.right(1), () => new Error('Unexpected Left')),
  1
)
assert.throws(() => E.getOrThrowWith(E.left("error"), () => new Error('Unexpected Left')))
```

**`Since`**

2.0.0

▸ **getOrThrowWith**\<`E`, `A`\>(`self`, `onLeft`): `A`

Extracts the value of an `Either` or throws if the `Either` is `Left`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](E.md#getorthrow).

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> | The `Either` to extract the value from. |
| `onLeft` | (`e`: `E`) => `unknown` | A function that will be called if the `Either` is `Left`. It returns the error to be thrown. |

#### Returns

`A`

**`Example`**

```ts
import * as E from "effect/Either"

assert.deepStrictEqual(
  E.getOrThrowWith(E.right(1), () => new Error('Unexpected Left')),
  1
)
assert.throws(() => E.getOrThrowWith(E.left("error"), () => new Error('Unexpected Left')))
```

**`Since`**

2.0.0

___

### getOrUndefined

▸ **getOrUndefined**\<`E`, `A`\>(`self`): `undefined` \| `A`

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

#### Returns

`undefined` \| `A`

**`Example`**

```ts
import * as Either from 'effect/Either'

assert.deepStrictEqual(Either.getOrUndefined(Either.right(1)), 1)
assert.deepStrictEqual(Either.getOrUndefined(Either.left("a")), undefined)
```

**`Since`**

2.0.0

___

### getRight

▸ **getRight**\<`E`, `A`\>(`self`): [`Option`](O.md#option)\<`A`\>

Converts a `Either` to an `Option` discarding the `Left`.

Alias of toOption.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

#### Returns

[`Option`](O.md#option)\<`A`\>

**`Example`**

```ts
import * as O from 'effect/Option'
import * as E from 'effect/Either'

assert.deepStrictEqual(E.getRight(E.right('ok')), O.some('ok'))
assert.deepStrictEqual(E.getRight(E.left('err')), O.none())
```

**`Since`**

2.0.0

___

### merge

▸ **merge**\<`E`, `A`\>(`self`): `E` \| `A`

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

#### Returns

`E` \| `A`

**`Since`**

2.0.0

## guards

### isEither

▸ **isEither**(`input`): input is Either\<unknown, unknown\>

Tests if a value is a `Either`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is Either\<unknown, unknown\>

**`Example`**

```ts
import { isEither, left, right } from 'effect/Either'

assert.deepStrictEqual(isEither(right(1)), true)
assert.deepStrictEqual(isEither(left("a")), true)
assert.deepStrictEqual(isEither({ right: 1 }), false)
```

**`Since`**

2.0.0

___

### isLeft

▸ **isLeft**\<`E`, `A`\>(`self`): self is Left\<E, A\>

Determine if a `Either` is a `Left`.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> | The `Either` to check. |

#### Returns

self is Left\<E, A\>

**`Example`**

```ts
import { isLeft, left, right } from 'effect/Either'

assert.deepStrictEqual(isLeft(right(1)), false)
assert.deepStrictEqual(isLeft(left("a")), true)
```

**`Since`**

2.0.0

___

### isRight

▸ **isRight**\<`E`, `A`\>(`self`): self is Right\<E, A\>

Determine if a `Either` is a `Right`.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> | The `Either` to check. |

#### Returns

self is Right\<E, A\>

**`Example`**

```ts
import { isRight, left, right } from 'effect/Either'

assert.deepStrictEqual(isRight(right(1)), true)
assert.deepStrictEqual(isRight(left("a")), false)
```

**`Since`**

2.0.0

## mapping

### flip

▸ **flip**\<`E`, `A`\>(`self`): [`Either`](E.md#either)\<`A`, `E`\>

Returns an `Either` that swaps the error/success cases. This allows you to
use all methods on the error channel, possibly before flipping back.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

#### Returns

[`Either`](E.md#either)\<`A`, `E`\>

**`Since`**

2.0.0

___

### map

▸ **map**\<`A`, `B`\>(`f`): \<E\>(`self`: [`Either`](E.md#either)\<`E`, `A`\>) => [`Either`](E.md#either)\<`E`, `B`\>

Maps the `Right` side of an `Either` value to a new `Either` value.

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`a`: `A`) => `B` | The function to map over the value of the `Either` |

#### Returns

`fn`

▸ \<`E`\>(`self`): [`Either`](E.md#either)\<`E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

##### Returns

[`Either`](E.md#either)\<`E`, `B`\>

**`Since`**

2.0.0

▸ **map**\<`E`, `A`, `B`\>(`self`, `f`): [`Either`](E.md#either)\<`E`, `B`\>

Maps the `Right` side of an `Either` value to a new `Either` value.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `B` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> | An `Either` to map |
| `f` | (`a`: `A`) => `B` | The function to map over the value of the `Either` |

#### Returns

[`Either`](E.md#either)\<`E`, `B`\>

**`Since`**

2.0.0

___

### mapBoth

▸ **mapBoth**\<`E1`, `E2`, `A`, `B`\>(`options`): (`self`: [`Either`](E.md#either)\<`E1`, `A`\>) => [`Either`](E.md#either)\<`E2`, `B`\>

#### Type parameters

| Name |
| :------ |
| `E1` |
| `E2` |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onLeft` | (`e`: `E1`) => `E2` |
| `options.onRight` | (`a`: `A`) => `B` |

#### Returns

`fn`

▸ (`self`): [`Either`](E.md#either)\<`E2`, `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E1`, `A`\> |

##### Returns

[`Either`](E.md#either)\<`E2`, `B`\>

**`Since`**

2.0.0

▸ **mapBoth**\<`E1`, `A`, `E2`, `B`\>(`self`, `options`): [`Either`](E.md#either)\<`E2`, `B`\>

#### Type parameters

| Name |
| :------ |
| `E1` |
| `A` |
| `E2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E1`, `A`\> |
| `options` | `Object` |
| `options.onLeft` | (`e`: `E1`) => `E2` |
| `options.onRight` | (`a`: `A`) => `B` |

#### Returns

[`Either`](E.md#either)\<`E2`, `B`\>

**`Since`**

2.0.0

___

### mapLeft

▸ **mapLeft**\<`E`, `G`\>(`f`): \<A\>(`self`: [`Either`](E.md#either)\<`E`, `A`\>) => [`Either`](E.md#either)\<`G`, `A`\>

Maps the `Left` side of an `Either` value to a new `Either` value.

#### Type parameters

| Name |
| :------ |
| `E` |
| `G` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `f` | (`e`: `E`) => `G` | A transformation function to apply to the `Left` value of the input `Either`. |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Either`](E.md#either)\<`G`, `A`\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

##### Returns

[`Either`](E.md#either)\<`G`, `A`\>

**`Since`**

2.0.0

▸ **mapLeft**\<`E`, `A`, `G`\>(`self`, `f`): [`Either`](E.md#either)\<`G`, `A`\>

Maps the `Left` side of an `Either` value to a new `Either` value.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `G` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> | The input `Either` value to map. |
| `f` | (`e`: `E`) => `G` | A transformation function to apply to the `Left` value of the input `Either`. |

#### Returns

[`Either`](E.md#either)\<`G`, `A`\>

**`Since`**

2.0.0

## models

### Either

Ƭ **Either**\<`E`, `A`\>: [`Left`](../interfaces/E.Left.md)\<`E`, `A`\> \| [`Right`](../interfaces/E.Right.md)\<`E`, `A`\>

**`Since`**

2.0.0

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

## pattern matching

### match

▸ **match**\<`E`, `B`, `A`, `C`\>(`options`): (`self`: [`Either`](E.md#either)\<`E`, `A`\>) => `B` \| `C`

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the `onLeft function,
if the value is a `Right` the inner value is applied to the `onRight` function.

@example
import * as E from 'effect/Either'
import { pipe } from 'effect/Function'

const onLeft  = (strings: ReadonlyArray<string>): string => `strings: ${strings.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.deepStrictEqual(pipe(E.right(1), E.match({ onLeft, onRight })), 'Ok: 1')
assert.deepStrictEqual(
  pipe(E.left(['string 1', 'string 2']), E.match({ onLeft, onRight })),
  'strings: string 1, string 2'
)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `E` |
| `B` | `B` |
| `A` | `A` |
| `C` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.onLeft` | (`e`: `E`) => `B` |
| `options.onRight` | (`a`: `A`) => `C` |

#### Returns

`fn`

▸ (`self`): `B` \| `C`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

##### Returns

`B` \| `C`

**`Since`**

2.0.0

▸ **match**\<`E`, `A`, `B`, `C`\>(`self`, `options`): `B` \| `C`

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the `onLeft function,
if the value is a `Right` the inner value is applied to the `onRight` function.

@example
import * as E from 'effect/Either'
import { pipe } from 'effect/Function'

const onLeft  = (strings: ReadonlyArray<string>): string => `strings: ${strings.join(', ')}`

const onRight = (value: number): string => `Ok: ${value}`

assert.deepStrictEqual(pipe(E.right(1), E.match({ onLeft, onRight })), 'Ok: 1')
assert.deepStrictEqual(
  pipe(E.left(['string 1', 'string 2']), E.match({ onLeft, onRight })),
  'strings: string 1, string 2'
)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `E` | `E` |
| `A` | `A` |
| `B` | `B` |
| `C` | `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |
| `options` | `Object` |
| `options.onLeft` | (`e`: `E`) => `B` |
| `options.onRight` | (`a`: `A`) => `C` |

#### Returns

`B` \| `C`

**`Since`**

2.0.0

## sequencing

### andThen

▸ **andThen**\<`A`, `E2`, `B`\>(`f`): \<E1\>(`self`: [`Either`](E.md#either)\<`E1`, `A`\>) => [`Either`](E.md#either)\<`E2` \| `E1`, `B`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

#### Type parameters

| Name |
| :------ |
| `A` |
| `E2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => [`Either`](E.md#either)\<`E2`, `B`\> |

#### Returns

`fn`

▸ \<`E1`\>(`self`): [`Either`](E.md#either)\<`E2` \| `E1`, `B`\>

##### Type parameters

| Name |
| :------ |
| `E1` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E1`, `A`\> |

##### Returns

[`Either`](E.md#either)\<`E2` \| `E1`, `B`\>

**`Since`**

2.0.0

▸ **andThen**\<`E2`, `B`\>(`f`): \<E1, A\>(`self`: [`Either`](E.md#either)\<`E1`, `A`\>) => [`Either`](E.md#either)\<`E2` \| `E1`, `B`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

#### Type parameters

| Name |
| :------ |
| `E2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | [`Either`](E.md#either)\<`E2`, `B`\> |

#### Returns

`fn`

▸ \<`E1`, `A`\>(`self`): [`Either`](E.md#either)\<`E2` \| `E1`, `B`\>

##### Type parameters

| Name |
| :------ |
| `E1` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E1`, `A`\> |

##### Returns

[`Either`](E.md#either)\<`E2` \| `E1`, `B`\>

**`Since`**

2.0.0

▸ **andThen**\<`E1`, `A`, `E2`, `B`\>(`self`, `f`): [`Either`](E.md#either)\<`E1` \| `E2`, `B`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

#### Type parameters

| Name |
| :------ |
| `E1` |
| `A` |
| `E2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E1`, `A`\> |
| `f` | (`a`: `A`) => [`Either`](E.md#either)\<`E2`, `B`\> |

#### Returns

[`Either`](E.md#either)\<`E1` \| `E2`, `B`\>

**`Since`**

2.0.0

▸ **andThen**\<`E1`, `A`, `E2`, `B`\>(`self`, `f`): [`Either`](E.md#either)\<`E1` \| `E2`, `B`\>

Executes a sequence of two `Either`s. The second `Either` can be dependent on the result of the first `Either`.

#### Type parameters

| Name |
| :------ |
| `E1` |
| `A` |
| `E2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E1`, `A`\> |
| `f` | [`Either`](E.md#either)\<`E2`, `B`\> |

#### Returns

[`Either`](E.md#either)\<`E1` \| `E2`, `B`\>

**`Since`**

2.0.0

___

### flatMap

▸ **flatMap**\<`A`, `E2`, `B`\>(`f`): \<E1\>(`self`: [`Either`](E.md#either)\<`E1`, `A`\>) => [`Either`](E.md#either)\<`E2` \| `E1`, `B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `E2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => [`Either`](E.md#either)\<`E2`, `B`\> |

#### Returns

`fn`

▸ \<`E1`\>(`self`): [`Either`](E.md#either)\<`E2` \| `E1`, `B`\>

##### Type parameters

| Name |
| :------ |
| `E1` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E1`, `A`\> |

##### Returns

[`Either`](E.md#either)\<`E2` \| `E1`, `B`\>

**`Since`**

2.0.0

▸ **flatMap**\<`E1`, `A`, `E2`, `B`\>(`self`, `f`): [`Either`](E.md#either)\<`E1` \| `E2`, `B`\>

#### Type parameters

| Name |
| :------ |
| `E1` |
| `A` |
| `E2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E1`, `A`\> |
| `f` | (`a`: `A`) => [`Either`](E.md#either)\<`E2`, `B`\> |

#### Returns

[`Either`](E.md#either)\<`E1` \| `E2`, `B`\>

**`Since`**

2.0.0

## symbols

### TypeId

Ƭ **TypeId**: typeof [`TypeId`](E.md#typeid-1)

**`Since`**

2.0.0

___

### TypeId

• `Const` **TypeId**: unique `symbol`

**`Since`**

2.0.0

## zipping

### zipWith

▸ **zipWith**\<`E2`, `A2`, `A`, `B`\>(`that`, `f`): \<E\>(`self`: [`Either`](E.md#either)\<`E`, `A`\>) => [`Either`](E.md#either)\<`E2` \| `E`, `B`\>

#### Type parameters

| Name |
| :------ |
| `E2` |
| `A2` |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Either`](E.md#either)\<`E2`, `A2`\> |
| `f` | (`a`: `A`, `b`: `A2`) => `B` |

#### Returns

`fn`

▸ \<`E`\>(`self`): [`Either`](E.md#either)\<`E2` \| `E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |

##### Returns

[`Either`](E.md#either)\<`E2` \| `E`, `B`\>

**`Since`**

2.0.0

▸ **zipWith**\<`E`, `A`, `E2`, `A2`, `B`\>(`self`, `that`, `f`): [`Either`](E.md#either)\<`E` \| `E2`, `B`\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |
| `E2` |
| `A2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](E.md#either)\<`E`, `A`\> |
| `that` | [`Either`](E.md#either)\<`E2`, `A2`\> |
| `f` | (`a`: `A`, `b`: `A2`) => `B` |

#### Returns

[`Either`](E.md#either)\<`E` \| `E2`, `B`\>

**`Since`**

2.0.0
