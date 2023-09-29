[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](src_lib_primitives.md) / E

# Namespace: E

[src/lib/primitives](src_lib_primitives.md).E

## Table of contents

### Interfaces

- [EitherTypeLambda](../interfaces/src_lib_primitives.E.EitherTypeLambda.md)
- [EitherUnify](../interfaces/src_lib_primitives.E.EitherUnify.md)
- [EitherUnifyBlacklist](../interfaces/src_lib_primitives.E.EitherUnifyBlacklist.md)
- [Left](../interfaces/src_lib_primitives.E.Left.md)
- [Right](../interfaces/src_lib_primitives.E.Right.md)

### Type Aliases

- [Either](src_lib_primitives.E.md#either)
- [TypeId](src_lib_primitives.E.md#typeid)

### Variables

- [TypeId](src_lib_primitives.E.md#typeid-1)

### Functions

- [all](src_lib_primitives.E.md#all)
- [flatMap](src_lib_primitives.E.md#flatmap)
- [fromNullable](src_lib_primitives.E.md#fromnullable)
- [fromOption](src_lib_primitives.E.md#fromoption)
- [gen](src_lib_primitives.E.md#gen)
- [getEquivalence](src_lib_primitives.E.md#getequivalence)
- [getLeft](src_lib_primitives.E.md#getleft)
- [getOrElse](src_lib_primitives.E.md#getorelse)
- [getOrNull](src_lib_primitives.E.md#getornull)
- [getOrThrow](src_lib_primitives.E.md#getorthrow)
- [getOrThrowWith](src_lib_primitives.E.md#getorthrowwith)
- [getOrUndefined](src_lib_primitives.E.md#getorundefined)
- [getRight](src_lib_primitives.E.md#getright)
- [isEither](src_lib_primitives.E.md#iseither)
- [isLeft](src_lib_primitives.E.md#isleft)
- [isRight](src_lib_primitives.E.md#isright)
- [left](src_lib_primitives.E.md#left)
- [map](src_lib_primitives.E.md#map)
- [mapBoth](src_lib_primitives.E.md#mapboth)
- [mapLeft](src_lib_primitives.E.md#mapleft)
- [match](src_lib_primitives.E.md#match)
- [merge](src_lib_primitives.E.md#merge)
- [orElse](src_lib_primitives.E.md#orelse)
- [reverse](src_lib_primitives.E.md#reverse)
- [right](src_lib_primitives.E.md#right)
- [try](src_lib_primitives.E.md#try)

## Other

### reverse

▸ **reverse**<`E`, `A`\>(`self`): [`Either`](src_lib_primitives.E.md#either)<`A`, `E`\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

#### Returns

[`Either`](src_lib_primitives.E.md#either)<`A`, `E`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:429

___

### try

▸ **try**<`A`, `E`\>(`options`): [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>

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
| `options.try` | [`LazyArg`](../interfaces/src_lib_primitives.F.LazyArg.md)<`A`\> |

#### Returns

[`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>

#### Defined in

node_modules/@effect/data/Either.d.ts:129

▸ **try**<`A`\>(`evaluate`): [`Either`](src_lib_primitives.E.md#either)<`unknown`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `evaluate` | [`LazyArg`](../interfaces/src_lib_primitives.F.LazyArg.md)<`A`\> |

#### Returns

[`Either`](src_lib_primitives.E.md#either)<`unknown`, `A`\>

#### Defined in

node_modules/@effect/data/Either.d.ts:133

## combining

### all

▸ **all**<`I`\>(`input`): [`I`] extends [readonly [`Either`](src_lib_primitives.E.md#either)<`any`, `any`\>[]] ? [`Either`](src_lib_primitives.E.md#either)<`I`[`number`] extends `never` ? `never` : [`I`[`number`]] extends [[`Either`](src_lib_primitives.E.md#either)<`E`, `any`\>] ? `E` : `never`, { -readonly [K in string \| number \| symbol]: [I[K]] extends [Either<any, A\>] ? A : never }\> : [`I`] extends [`Iterable`<[`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>\>] ? [`Either`](src_lib_primitives.E.md#either)<`E`, `A`[]\> : [`Either`](src_lib_primitives.E.md#either)<`I`[keyof `I`] extends `never` ? `never` : [`I`[keyof `I`]] extends [[`Either`](src_lib_primitives.E.md#either)<`E`, `any`\>] ? `E` : `never`, { -readonly [K in string \| number \| symbol]: [I[K]] extends [Either<any, A\>] ? A : never }\>

Takes a structure of `Option`s and returns an `Option` of values with the same structure.

- If a tuple is supplied, then the returned `Option` will contain a tuple with the same length.
- If a struct is supplied, then the returned `Option` will contain a struct with the same keys.
- If an iterable is supplied, then the returned `Option` will contain an array.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `I` | extends `Iterable`<[`Either`](src_lib_primitives.E.md#either)<`any`, `any`\>\> \| `Record`<`string`, [`Either`](src_lib_primitives.E.md#either)<`any`, `any`\>\> |

#### Parameters

| Name | Type |
| :------ | :------ |
| `input` | `I` |

#### Returns

[`I`] extends [readonly [`Either`](src_lib_primitives.E.md#either)<`any`, `any`\>[]] ? [`Either`](src_lib_primitives.E.md#either)<`I`[`number`] extends `never` ? `never` : [`I`[`number`]] extends [[`Either`](src_lib_primitives.E.md#either)<`E`, `any`\>] ? `E` : `never`, { -readonly [K in string \| number \| symbol]: [I[K]] extends [Either<any, A\>] ? A : never }\> : [`I`] extends [`Iterable`<[`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>\>] ? [`Either`](src_lib_primitives.E.md#either)<`E`, `A`[]\> : [`Either`](src_lib_primitives.E.md#either)<`I`[keyof `I`] extends `never` ? `never` : [`I`[keyof `I`]] extends [[`Either`](src_lib_primitives.E.md#either)<`E`, `any`\>] ? `E` : `never`, { -readonly [K in string \| number \| symbol]: [I[K]] extends [Either<any, A\>] ? A : never }\>

**`Example`**

```ts
import * as Either from "@effect/data/Either"

assert.deepStrictEqual(Either.all([Either.right(1), Either.right(2)]), Either.right([1, 2]))
assert.deepStrictEqual(Either.all({ a: Either.right(1), b: Either.right("hello") }), Either.right({ a: 1, b: "hello" }))
assert.deepStrictEqual(Either.all({ a: Either.right(1), b: Either.left("error") }), Either.left("error"))
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:421

___

### flatMap

▸ **flatMap**<`A`, `E2`, `B`\>(`f`): <E1\>(`self`: [`Either`](src_lib_primitives.E.md#either)<`E1`, `A`\>) => [`Either`](src_lib_primitives.E.md#either)<`E2` \| `E1`, `B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `E2` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`a`: `A`) => [`Either`](src_lib_primitives.E.md#either)<`E2`, `B`\> |

#### Returns

`fn`

▸ <`E1`\>(`self`): [`Either`](src_lib_primitives.E.md#either)<`E2` \| `E1`, `B`\>

##### Type parameters

| Name |
| :------ |
| `E1` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E1`, `A`\> |

##### Returns

[`Either`](src_lib_primitives.E.md#either)<`E2` \| `E1`, `B`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:399

▸ **flatMap**<`E1`, `A`, `E2`, `B`\>(`self`, `f`): [`Either`](src_lib_primitives.E.md#either)<`E1` \| `E2`, `B`\>

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
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E1`, `A`\> |
| `f` | (`a`: `A`) => [`Either`](src_lib_primitives.E.md#either)<`E2`, `B`\> |

#### Returns

[`Either`](src_lib_primitives.E.md#either)<`E1` \| `E2`, `B`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:400

## constructors

### fromNullable

▸ **fromNullable**<`A`, `E`\>(`onNullable`): (`self`: `A`) => [`Either`](src_lib_primitives.E.md#either)<`E`, `NonNullable`<`A`\>\>

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

▸ (`self`): [`Either`](src_lib_primitives.E.md#either)<`E`, `NonNullable`<`A`\>\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

[`Either`](src_lib_primitives.E.md#either)<`E`, `NonNullable`<`A`\>\>

**`Example`**

```ts
import * as Either from '@effect/data/Either'

assert.deepStrictEqual(Either.fromNullable(1, () => 'fallback'), Either.right(1))
assert.deepStrictEqual(Either.fromNullable(null, () => 'fallback'), Either.left('fallback'))
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:110

▸ **fromNullable**<`A`, `E`\>(`self`, `onNullable`): [`Either`](src_lib_primitives.E.md#either)<`E`, `NonNullable`<`A`\>\>

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

[`Either`](src_lib_primitives.E.md#either)<`E`, `NonNullable`<`A`\>\>

**`Example`**

```ts
import * as Either from '@effect/data/Either'

assert.deepStrictEqual(Either.fromNullable(1, () => 'fallback'), Either.right(1))
assert.deepStrictEqual(Either.fromNullable(null, () => 'fallback'), Either.left('fallback'))
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:111

___

### fromOption

▸ **fromOption**<`A`, `E`\>(`self`, `onNone`): [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `E` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Option`](src_lib_primitives.O.md#option)<`A`\> |
| `onNone` | () => `E` |

#### Returns

[`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>

**`Example`**

```ts
import * as Either from '@effect/data/Either'
import * as Option from '@effect/data/Option'

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:125

▸ **fromOption**<`E`\>(`onNone`): <A\>(`self`: [`Option`](src_lib_primitives.O.md#option)<`A`\>) => [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>

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

▸ <`A`\>(`self`): [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Option`](src_lib_primitives.O.md#option)<`A`\> |

##### Returns

[`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>

**`Example`**

```ts
import * as Either from '@effect/data/Either'
import * as Option from '@effect/data/Option'

assert.deepStrictEqual(Either.fromOption(Option.some(1), () => 'error'), Either.right(1))
assert.deepStrictEqual(Either.fromOption(Option.none(), () => 'error'), Either.left('error'))
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:126

___

### left

▸ **left**<`E`\>(`e`): [`Either`](src_lib_primitives.E.md#either)<`E`, `never`\>

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

[`Either`](src_lib_primitives.E.md#either)<`E`, `never`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:95

___

### right

▸ **right**<`A`\>(`a`): [`Either`](src_lib_primitives.E.md#either)<`never`, `A`\>

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

[`Either`](src_lib_primitives.E.md#either)<`never`, `A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:87

## equivalence

### getEquivalence

▸ **getEquivalence**<`E`, `A`\>(`EE`, `EA`): `Equivalence`<[`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>\>

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `EE` | `Equivalence`<`E`\> |
| `EA` | `Equivalence`<`A`\> |

#### Returns

`Equivalence`<[`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:224

## error handling

### orElse

▸ **orElse**<`E1`, `E2`, `B`\>(`that`): <A\>(`self`: [`Either`](src_lib_primitives.E.md#either)<`E1`, `A`\>) => [`Either`](src_lib_primitives.E.md#either)<`E2`, `B` \| `A`\>

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
| `that` | (`e1`: `E1`) => [`Either`](src_lib_primitives.E.md#either)<`E2`, `B`\> | A function that takes the error value from `self` (if it's a `Left`) and returns a new `Either` value. |

#### Returns

`fn`

▸ <`A`\>(`self`): [`Either`](src_lib_primitives.E.md#either)<`E2`, `B` \| `A`\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E1`, `A`\> |

##### Returns

[`Either`](src_lib_primitives.E.md#either)<`E2`, `B` \| `A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:391

▸ **orElse**<`E1`, `A`, `E2`, `B`\>(`self`, `that`): [`Either`](src_lib_primitives.E.md#either)<`E2`, `A` \| `B`\>

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
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E1`, `A`\> | The input `Either` value to check and potentially return. |
| `that` | (`e1`: `E1`) => [`Either`](src_lib_primitives.E.md#either)<`E2`, `B`\> | A function that takes the error value from `self` (if it's a `Left`) and returns a new `Either` value. |

#### Returns

[`Either`](src_lib_primitives.E.md#either)<`E2`, `A` \| `B`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:392

## generators

### gen

▸ **gen**<`K`, `A`\>(`body`): [`Either`](src_lib_primitives.E.md#either)<[`K`] extends [`Variance`<[`EitherTypeLambda`](../interfaces/src_lib_primitives.E.EitherTypeLambda.md), `any`, `any`, `E`\>] ? `E` : `never`, `A`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `K` | extends `Variance`<[`EitherTypeLambda`](../interfaces/src_lib_primitives.E.EitherTypeLambda.md), `any`, `any`, `any`\> |
| `A` | `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `body` | (`resume`: `Adapter`<[`EitherTypeLambda`](../interfaces/src_lib_primitives.E.EitherTypeLambda.md)\>) => `Generator`<`K`, `A`, `unknown`\> |

#### Returns

[`Either`](src_lib_primitives.E.md#either)<[`K`] extends [`Variance`<[`EitherTypeLambda`](../interfaces/src_lib_primitives.E.EitherTypeLambda.md), `any`, `any`, `E`\>] ? `E` : `never`, `A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/UtilsGen.d.ts:105

## getters

### getLeft

▸ **getLeft**<`E`, `A`\>(`self`): [`Option`](src_lib_primitives.O.md#option)<`E`\>

Converts a `Either` to an `Option` discarding the value.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`E`\>

**`Example`**

```ts
import * as O from '@effect/data/Option'
import * as E from '@effect/data/Either'

assert.deepStrictEqual(E.getLeft(E.right('ok')), O.none())
assert.deepStrictEqual(E.getLeft(E.left('err')), O.some('err'))
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:219

___

### getOrElse

▸ **getOrElse**<`E`, `B`\>(`onLeft`): <A\>(`self`: [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>) => `B` \| `A`

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

▸ <`A`\>(`self`): `B` \| `A`

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

##### Returns

`B` \| `A`

**`Example`**

```ts
import * as Either from '@effect/data/Either'

assert.deepStrictEqual(Either.getOrElse(Either.right(1), (error) => error + "!"), 1)
assert.deepStrictEqual(Either.getOrElse(Either.left("not a number"), (error) => error + "!"), "not a number!")
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:314

▸ **getOrElse**<`E`, `A`, `B`\>(`self`, `onLeft`): `A` \| `B`

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
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |
| `onLeft` | (`e`: `E`) => `B` |

#### Returns

`A` \| `B`

**`Example`**

```ts
import * as Either from '@effect/data/Either'

assert.deepStrictEqual(Either.getOrElse(Either.right(1), (error) => error + "!"), 1)
assert.deepStrictEqual(Either.getOrElse(Either.left("not a number"), (error) => error + "!"), "not a number!")
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:315

___

### getOrNull

▸ **getOrNull**<`E`, `A`\>(`self`): ``null`` \| `A`

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

#### Returns

``null`` \| `A`

**`Example`**

```ts
import * as Either from '@effect/data/Either'

assert.deepStrictEqual(Either.getOrNull(Either.right(1)), 1)
assert.deepStrictEqual(Either.getOrNull(Either.left("a")), null)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:327

___

### getOrThrow

▸ **getOrThrow**<`E`, `A`\>(`self`): `A`

Extracts the value of an `Either` or throws if the `Either` is `Left`.

The thrown error is a default error. To configure the error thrown, see  [getOrThrowWith](src_lib_primitives.E.md#getorthrowwith).

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> | The `Either` to extract the value from. |

#### Returns

`A`

**`Throws`**

`Error("getOrThrow called on a Left")`

**`Example`**

```ts
import * as E from "@effect/data/Either"

assert.deepStrictEqual(E.getOrThrow(E.right(1)), 1)
assert.throws(() => E.getOrThrow(E.left("error")))
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:380

___

### getOrThrowWith

▸ **getOrThrowWith**<`E`\>(`onLeft`): <A\>(`self`: [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>) => `A`

Extracts the value of an `Either` or throws if the `Either` is `Left`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](src_lib_primitives.E.md#getorthrow).

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

▸ <`A`\>(`self`): `A`

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

##### Returns

`A`

**`Example`**

```ts
import * as E from "@effect/data/Either"

assert.deepStrictEqual(
  E.getOrThrowWith(E.right(1), () => new Error('Unexpected Left')),
  1
)
assert.throws(() => E.getOrThrowWith(E.left("error"), () => new Error('Unexpected Left')))
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:360

▸ **getOrThrowWith**<`E`, `A`\>(`self`, `onLeft`): `A`

Extracts the value of an `Either` or throws if the `Either` is `Left`.

If a default error is sufficient for your use case and you don't need to configure the thrown error, see [getOrThrow](src_lib_primitives.E.md#getorthrow).

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> | The `Either` to extract the value from. |
| `onLeft` | (`e`: `E`) => `unknown` | A function that will be called if the `Either` is `Left`. It returns the error to be thrown. |

#### Returns

`A`

**`Example`**

```ts
import * as E from "@effect/data/Either"

assert.deepStrictEqual(
  E.getOrThrowWith(E.right(1), () => new Error('Unexpected Left')),
  1
)
assert.throws(() => E.getOrThrowWith(E.left("error"), () => new Error('Unexpected Left')))
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:361

___

### getOrUndefined

▸ **getOrUndefined**<`E`, `A`\>(`self`): `undefined` \| `A`

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

#### Returns

`undefined` \| `A`

**`Example`**

```ts
import * as Either from '@effect/data/Either'

assert.deepStrictEqual(Either.getOrUndefined(Either.right(1)), 1)
assert.deepStrictEqual(Either.getOrUndefined(Either.left("a")), undefined)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:338

___

### getRight

▸ **getRight**<`E`, `A`\>(`self`): [`Option`](src_lib_primitives.O.md#option)<`A`\>

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
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

#### Returns

[`Option`](src_lib_primitives.O.md#option)<`A`\>

**`Example`**

```ts
import * as O from '@effect/data/Option'
import * as E from '@effect/data/Either'

assert.deepStrictEqual(E.getRight(E.right('ok')), O.some('ok'))
assert.deepStrictEqual(E.getRight(E.left('err')), O.none())
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:205

___

### merge

▸ **merge**<`E`, `A`\>(`self`): `E` \| `A`

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

#### Returns

`E` \| `A`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:300

## guards

### isEither

▸ **isEither**(`input`): input is Either<unknown, unknown\>

Tests if a value is a `Either`.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `input` | `unknown` | The value to test. |

#### Returns

input is Either<unknown, unknown\>

**`Example`**

```ts
import { isEither, left, right } from '@effect/data/Either'

assert.deepStrictEqual(isEither(right(1)), true)
assert.deepStrictEqual(isEither(left("a")), true)
assert.deepStrictEqual(isEither({ right: 1 }), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:159

___

### isLeft

▸ **isLeft**<`E`, `A`\>(`self`): self is Left<E, A\>

Determine if a `Either` is a `Left`.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> | The `Either` to check. |

#### Returns

self is Left<E, A\>

**`Example`**

```ts
import { isLeft, left, right } from '@effect/data/Either'

assert.deepStrictEqual(isLeft(right(1)), false)
assert.deepStrictEqual(isLeft(left("a")), true)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:174

___

### isRight

▸ **isRight**<`E`, `A`\>(`self`): self is Right<E, A\>

Determine if a `Either` is a `Right`.

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> | The `Either` to check. |

#### Returns

self is Right<E, A\>

**`Example`**

```ts
import { isRight, left, right } from '@effect/data/Either'

assert.deepStrictEqual(isRight(right(1)), true)
assert.deepStrictEqual(isRight(left("a")), false)
```

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:189

## mapping

### map

▸ **map**<`A`, `B`\>(`f`): <E\>(`self`: [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>) => [`Either`](src_lib_primitives.E.md#either)<`E`, `B`\>

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

▸ <`E`\>(`self`): [`Either`](src_lib_primitives.E.md#either)<`E`, `B`\>

##### Type parameters

| Name |
| :------ |
| `E` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

##### Returns

[`Either`](src_lib_primitives.E.md#either)<`E`, `B`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:262

▸ **map**<`E`, `A`, `B`\>(`self`, `f`): [`Either`](src_lib_primitives.E.md#either)<`E`, `B`\>

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
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> | An `Either` to map |
| `f` | (`a`: `A`) => `B` | The function to map over the value of the `Either` |

#### Returns

[`Either`](src_lib_primitives.E.md#either)<`E`, `B`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:263

___

### mapBoth

▸ **mapBoth**<`E1`, `E2`, `A`, `B`\>(`options`): (`self`: [`Either`](src_lib_primitives.E.md#either)<`E1`, `A`\>) => [`Either`](src_lib_primitives.E.md#either)<`E2`, `B`\>

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

▸ (`self`): [`Either`](src_lib_primitives.E.md#either)<`E2`, `B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E1`, `A`\> |

##### Returns

[`Either`](src_lib_primitives.E.md#either)<`E2`, `B`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:230

▸ **mapBoth**<`E1`, `A`, `E2`, `B`\>(`self`, `options`): [`Either`](src_lib_primitives.E.md#either)<`E2`, `B`\>

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
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E1`, `A`\> |
| `options` | `Object` |
| `options.onLeft` | (`e`: `E1`) => `E2` |
| `options.onRight` | (`a`: `A`) => `B` |

#### Returns

[`Either`](src_lib_primitives.E.md#either)<`E2`, `B`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:234

___

### mapLeft

▸ **mapLeft**<`E`, `G`\>(`f`): <A\>(`self`: [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>) => [`Either`](src_lib_primitives.E.md#either)<`G`, `A`\>

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

▸ <`A`\>(`self`): [`Either`](src_lib_primitives.E.md#either)<`G`, `A`\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

##### Returns

[`Either`](src_lib_primitives.E.md#either)<`G`, `A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:249

▸ **mapLeft**<`E`, `A`, `G`\>(`self`, `f`): [`Either`](src_lib_primitives.E.md#either)<`G`, `A`\>

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
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> | The input `Either` value to map. |
| `f` | (`e`: `E`) => `G` | A transformation function to apply to the `Left` value of the input `Either`. |

#### Returns

[`Either`](src_lib_primitives.E.md#either)<`G`, `A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:250

## models

### Either

Ƭ **Either**<`E`, `A`\>: [`Left`](../interfaces/src_lib_primitives.E.Left.md)<`E`, `A`\> \| [`Right`](../interfaces/src_lib_primitives.E.Right.md)<`E`, `A`\>

**`Since`**

1.0.0

#### Type parameters

| Name |
| :------ |
| `E` |
| `A` |

#### Defined in

node_modules/@effect/data/Either.d.ts:17

## pattern matching

### match

▸ **match**<`E`, `B`, `A`, `C`\>(`options`): (`self`: [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\>) => `B` \| `C`

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the `onLeft function,
if the value is a `Right` the inner value is applied to the `onRight` function.

@example
import * as E from '@effect/data/Either'
import { pipe } from '@effect/data/Function'

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
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |

##### Returns

`B` \| `C`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:287

▸ **match**<`E`, `A`, `B`, `C`\>(`self`, `options`): `B` \| `C`

Takes two functions and an `Either` value, if the value is a `Left` the inner value is applied to the `onLeft function,
if the value is a `Right` the inner value is applied to the `onRight` function.

@example
import * as E from '@effect/data/Either'
import { pipe } from '@effect/data/Function'

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
| `self` | [`Either`](src_lib_primitives.E.md#either)<`E`, `A`\> |
| `options` | `Object` |
| `options.onLeft` | (`e`: `E`) => `B` |
| `options.onRight` | (`a`: `A`) => `C` |

#### Returns

`B` \| `C`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:291

## symbols

### TypeId

Ƭ **TypeId**: typeof [`TypeId`](src_lib_primitives.E.md#typeid-1)

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:22

node_modules/@effect/data/Either.d.ts:27

___

### TypeId

• `Const` **TypeId**: unique `symbol`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/Either.d.ts:22

node_modules/@effect/data/Either.d.ts:27
