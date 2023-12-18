[@eslint-react/tools](../README.md) / Ord

# Namespace: Ord

## Table of contents

### Interfaces

- [Order](../interfaces/Ord.Order.md)
- [OrderTypeLambda](../interfaces/Ord.OrderTypeLambda.md)

### Functions

- [Date](Ord.md#date)
- [all](Ord.md#all)
- [array](Ord.md#array)
- [between](Ord.md#between)
- [bigint](Ord.md#bigint)
- [boolean](Ord.md#boolean)
- [clamp](Ord.md#clamp)
- [combine](Ord.md#combine)
- [combineAll](Ord.md#combineall)
- [combineMany](Ord.md#combinemany)
- [empty](Ord.md#empty)
- [greaterThan](Ord.md#greaterthan)
- [greaterThanOrEqualTo](Ord.md#greaterthanorequalto)
- [lessThan](Ord.md#lessthan)
- [lessThanOrEqualTo](Ord.md#lessthanorequalto)
- [make](Ord.md#make)
- [mapInput](Ord.md#mapinput)
- [max](Ord.md#max)
- [min](Ord.md#min)
- [number](Ord.md#number)
- [product](Ord.md#product)
- [productMany](Ord.md#productmany)
- [reverse](Ord.md#reverse)
- [string](Ord.md#string)
- [struct](Ord.md#struct)
- [tuple](Ord.md#tuple)

## Other

### between

▸ **between**\<`A`\>(`O`): (`options`: \{ `maximum`: `A` ; `minimum`: `A`  }) => (`self`: `A`) => `boolean`(`self`: `A`, `options`: \{ `maximum`: `A` ; `minimum`: `A`  }) => `boolean`

Test whether a value is between a minimum and a maximum (inclusive).

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`options`): (`self`: `A`) => `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.maximum` | `A` |
| `options.minimum` | `A` |

##### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

`boolean`

▸ (`self`, `options`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `options` | `Object` |
| `options.maximum` | `A` |
| `options.minimum` | `A` |

##### Returns

`boolean`

**`Since`**

2.0.0

___

### clamp

▸ **clamp**\<`A`\>(`O`): (`options`: \{ `maximum`: `A` ; `minimum`: `A`  }) => (`self`: `A`) => `A`(`self`: `A`, `options`: \{ `maximum`: `A` ; `minimum`: `A`  }) => `A`

Clamp a value between a minimum and a maximum.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`options`): (`self`: `A`) => `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `options` | `Object` |
| `options.maximum` | `A` |
| `options.minimum` | `A` |

##### Returns

`fn`

▸ (`self`): `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

`A`

▸ (`self`, `options`): `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `options` | `Object` |
| `options.maximum` | `A` |
| `options.minimum` | `A` |

##### Returns

`A`

**`Example`**

```ts
import * as Order from "effect/Order"
import * as Number from "effect/Number"

const clamp = Order.clamp(Number.Order)({ minimum: 1, maximum: 5 })

assert.equal(clamp(3), 3)
assert.equal(clamp(0), 1)
assert.equal(clamp(6), 5)
```

**`Since`**

2.0.0

___

### empty

▸ **empty**\<`A`\>(): [`Order`](../interfaces/Ord.Order.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<`A`\>

**`Since`**

2.0.0

___

### greaterThan

▸ **greaterThan**\<`A`\>(`O`): (`that`: `A`) => (`self`: `A`) => `boolean`(`self`: `A`, `that`: `A`) => `boolean`

Test whether one value is _strictly greater than_ another.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`that`): (`self`: `A`) => `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `A` |

##### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

`boolean`

▸ (`self`, `that`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `that` | `A` |

##### Returns

`boolean`

**`Since`**

2.0.0

___

### greaterThanOrEqualTo

▸ **greaterThanOrEqualTo**\<`A`\>(`O`): (`that`: `A`) => (`self`: `A`) => `boolean`(`self`: `A`, `that`: `A`) => `boolean`

Test whether one value is _non-strictly greater than_ another.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`that`): (`self`: `A`) => `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `A` |

##### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

`boolean`

▸ (`self`, `that`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `that` | `A` |

##### Returns

`boolean`

**`Since`**

2.0.0

___

### lessThan

▸ **lessThan**\<`A`\>(`O`): (`that`: `A`) => (`self`: `A`) => `boolean`(`self`: `A`, `that`: `A`) => `boolean`

Test whether one value is _strictly less than_ another.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`that`): (`self`: `A`) => `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `A` |

##### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

`boolean`

▸ (`self`, `that`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `that` | `A` |

##### Returns

`boolean`

**`Since`**

2.0.0

___

### lessThanOrEqualTo

▸ **lessThanOrEqualTo**\<`A`\>(`O`): (`that`: `A`) => (`self`: `A`) => `boolean`(`self`: `A`, `that`: `A`) => `boolean`

Test whether one value is _non-strictly less than_ another.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`that`): (`self`: `A`) => `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `A` |

##### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

`boolean`

▸ (`self`, `that`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `that` | `A` |

##### Returns

`boolean`

**`Since`**

2.0.0

___

### max

▸ **max**\<`A`\>(`O`): (`that`: `A`) => (`self`: `A`) => `A`(`self`: `A`, `that`: `A`) => `A`

Take the maximum of two values. If they are considered equal, the first argument is chosen.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`that`): (`self`: `A`) => `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `A` |

##### Returns

`fn`

▸ (`self`): `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

`A`

▸ (`self`, `that`): `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `that` | `A` |

##### Returns

`A`

**`Since`**

2.0.0

___

### min

▸ **min**\<`A`\>(`O`): (`that`: `A`) => (`self`: `A`) => `A`(`self`: `A`, `that`: `A`) => `A`

Take the minimum of two values. If they are considered equal, the first argument is chosen.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`that`): (`self`: `A`) => `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `that` | `A` |

##### Returns

`fn`

▸ (`self`): `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |

##### Returns

`A`

▸ (`self`, `that`): `A`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `A` |
| `that` | `A` |

##### Returns

`A`

**`Since`**

2.0.0

___

### reverse

▸ **reverse**\<`A`\>(`O`): [`Order`](../interfaces/Ord.Order.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<`A`\>

**`Since`**

2.0.0

## combinators

### array

▸ **array**\<`A`\>(`O`): [`Order`](../interfaces/Ord.Order.md)\<readonly `A`[]\>

This function creates and returns a new `Order` for an array of values based on a given `Order` for the elements of the array.
The returned `Order` compares two arrays by applying the given `Order` to each element in the arrays.
If all elements are equal, the arrays are then compared based on their length.
It is useful when you need to compare two arrays of the same type and you have a specific way of comparing each element of the array.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `O` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<readonly `A`[]\>

**`Since`**

2.0.0

___

### struct

▸ **struct**\<`R`\>(`fields`): [`Order`](../interfaces/Ord.Order.md)\<\{ [K in string \| number \| symbol]: [R[K]] extends [Order\<A\>] ? A : never }\>

This function creates and returns a new `Order` for a struct of values based on the given `Order`s
for each property in the struct.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | extends `Object` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `fields` | `R` |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<\{ [K in string \| number \| symbol]: [R[K]] extends [Order\<A\>] ? A : never }\>

**`Since`**

2.0.0

___

### tuple

▸ **tuple**\<`T`\>(`...elements`): [`Order`](../interfaces/Ord.Order.md)\<`Readonly`\<\{ [I in string \| number \| symbol]: [T[I]] extends [Order\<A\>] ? A : never }\>\>

Similar to `Promise.all` but operates on `Order`s.

```
[Order<A>, Order<B>, ...] -> Order<[A, B, ...]>
```

This function creates and returns a new `Order` for a tuple of values based on the given `Order`s for each element in the tuple.
The returned `Order` compares two tuples of the same type by applying the corresponding `Order` to each element in the tuple.
It is useful when you need to compare two tuples of the same type and you have a specific way of comparing each element
of the tuple.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends readonly [`Order`](../interfaces/Ord.Order.md)\<`any`\>[] |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...elements` | `T` |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<`Readonly`\<\{ [I in string \| number \| symbol]: [T[I]] extends [Order\<A\>] ? A : never }\>\>

**`Since`**

2.0.0

## combining

### all

▸ **all**\<`A`\>(`collection`): [`Order`](../interfaces/Ord.Order.md)\<readonly `A`[]\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collection` | `Iterable`\<[`Order`](../interfaces/Ord.Order.md)\<`A`\>\> |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<readonly `A`[]\>

**`Since`**

2.0.0

___

### combine

▸ **combine**\<`A`\>(`that`): (`self`: [`Order`](../interfaces/Ord.Order.md)\<`A`\>) => [`Order`](../interfaces/Ord.Order.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

`fn`

▸ (`self`): [`Order`](../interfaces/Ord.Order.md)\<`A`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

##### Returns

[`Order`](../interfaces/Ord.Order.md)\<`A`\>

**`Since`**

2.0.0

▸ **combine**\<`A`\>(`self`, `that`): [`Order`](../interfaces/Ord.Order.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |
| `that` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<`A`\>

**`Since`**

2.0.0

___

### combineAll

▸ **combineAll**\<`A`\>(`collection`): [`Order`](../interfaces/Ord.Order.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collection` | `Iterable`\<[`Order`](../interfaces/Ord.Order.md)\<`A`\>\> |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<`A`\>

**`Since`**

2.0.0

___

### combineMany

▸ **combineMany**\<`A`\>(`collection`): (`self`: [`Order`](../interfaces/Ord.Order.md)\<`A`\>) => [`Order`](../interfaces/Ord.Order.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collection` | `Iterable`\<[`Order`](../interfaces/Ord.Order.md)\<`A`\>\> |

#### Returns

`fn`

▸ (`self`): [`Order`](../interfaces/Ord.Order.md)\<`A`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

##### Returns

[`Order`](../interfaces/Ord.Order.md)\<`A`\>

**`Since`**

2.0.0

▸ **combineMany**\<`A`\>(`self`, `collection`): [`Order`](../interfaces/Ord.Order.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |
| `collection` | `Iterable`\<[`Order`](../interfaces/Ord.Order.md)\<`A`\>\> |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<`A`\>

**`Since`**

2.0.0

___

### product

▸ **product**\<`B`\>(`that`): \<A\>(`self`: [`Order`](../interfaces/Ord.Order.md)\<`A`\>) => [`Order`](../interfaces/Ord.Order.md)\<readonly [`A`, `B`]\>

#### Type parameters

| Name |
| :------ |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `that` | [`Order`](../interfaces/Ord.Order.md)\<`B`\> |

#### Returns

`fn`

▸ \<`A`\>(`self`): [`Order`](../interfaces/Ord.Order.md)\<readonly [`A`, `B`]\>

##### Type parameters

| Name |
| :------ |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

##### Returns

[`Order`](../interfaces/Ord.Order.md)\<readonly [`A`, `B`]\>

**`Since`**

2.0.0

▸ **product**\<`A`, `B`\>(`self`, `that`): [`Order`](../interfaces/Ord.Order.md)\<readonly [`A`, `B`]\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |
| `that` | [`Order`](../interfaces/Ord.Order.md)\<`B`\> |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<readonly [`A`, `B`]\>

**`Since`**

2.0.0

___

### productMany

▸ **productMany**\<`A`\>(`collection`): (`self`: [`Order`](../interfaces/Ord.Order.md)\<`A`\>) => [`Order`](../interfaces/Ord.Order.md)\<readonly [`A`, `A`]\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `collection` | `Iterable`\<[`Order`](../interfaces/Ord.Order.md)\<`A`\>\> |

#### Returns

`fn`

▸ (`self`): [`Order`](../interfaces/Ord.Order.md)\<readonly [`A`, `A`]\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

##### Returns

[`Order`](../interfaces/Ord.Order.md)\<readonly [`A`, `A`]\>

**`Since`**

2.0.0

▸ **productMany**\<`A`\>(`self`, `collection`): [`Order`](../interfaces/Ord.Order.md)\<readonly [`A`, `A`]\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |
| `collection` | `Iterable`\<[`Order`](../interfaces/Ord.Order.md)\<`A`\>\> |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<readonly [`A`, `A`]\>

**`Since`**

2.0.0

## constructors

### make

▸ **make**\<`A`\>(`compare`): [`Order`](../interfaces/Ord.Order.md)\<`A`\>

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `compare` | (`self`: `A`, `that`: `A`) => ``0`` \| ``1`` \| ``-1`` |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<`A`\>

**`Since`**

2.0.0

## instances

### Date

▸ **Date**(`self`, `that`): ``0`` \| ``1`` \| ``-1``

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `Date` |
| `that` | `Date` |

#### Returns

``0`` \| ``1`` \| ``-1``

**`Since`**

2.0.0

___

### bigint

▸ **bigint**(`self`, `that`): ``0`` \| ``1`` \| ``-1``

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `bigint` |
| `that` | `bigint` |

#### Returns

``0`` \| ``1`` \| ``-1``

**`Since`**

2.0.0

___

### boolean

▸ **boolean**(`self`, `that`): ``0`` \| ``1`` \| ``-1``

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `boolean` |
| `that` | `boolean` |

#### Returns

``0`` \| ``1`` \| ``-1``

**`Since`**

2.0.0

___

### number

▸ **number**(`self`, `that`): ``0`` \| ``1`` \| ``-1``

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `number` |
| `that` | `number` |

#### Returns

``0`` \| ``1`` \| ``-1``

**`Since`**

2.0.0

___

### string

▸ **string**(`self`, `that`): ``0`` \| ``1`` \| ``-1``

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | `string` |
| `that` | `string` |

#### Returns

``0`` \| ``1`` \| ``-1``

**`Since`**

2.0.0

## mapping

### mapInput

▸ **mapInput**\<`B`, `A`\>(`f`): (`self`: [`Order`](../interfaces/Ord.Order.md)\<`A`\>) => [`Order`](../interfaces/Ord.Order.md)\<`B`\>

#### Type parameters

| Name |
| :------ |
| `B` |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`b`: `B`) => `A` |

#### Returns

`fn`

▸ (`self`): [`Order`](../interfaces/Ord.Order.md)\<`B`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |

##### Returns

[`Order`](../interfaces/Ord.Order.md)\<`B`\>

**`Since`**

2.0.0

▸ **mapInput**\<`A`, `B`\>(`self`, `f`): [`Order`](../interfaces/Ord.Order.md)\<`B`\>

#### Type parameters

| Name |
| :------ |
| `A` |
| `B` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Order`](../interfaces/Ord.Order.md)\<`A`\> |
| `f` | (`b`: `B`) => `A` |

#### Returns

[`Order`](../interfaces/Ord.Order.md)\<`B`\>

**`Since`**

2.0.0
