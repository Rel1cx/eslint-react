[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](src_lib_primitives.md) / MutList

# Namespace: MutList

[src/lib/primitives](src_lib_primitives.md).MutList

## Table of contents

### Interfaces

- [MutableList](../interfaces/src_lib_primitives.MutList.MutableList.md)

### Type Aliases

- [TypeId](src_lib_primitives.MutList.md#typeid)

### Functions

- [append](src_lib_primitives.MutList.md#append)
- [empty](src_lib_primitives.MutList.md#empty)
- [forEach](src_lib_primitives.MutList.md#foreach)
- [fromIterable](src_lib_primitives.MutList.md#fromiterable)
- [head](src_lib_primitives.MutList.md#head)
- [isEmpty](src_lib_primitives.MutList.md#isempty)
- [length](src_lib_primitives.MutList.md#length)
- [make](src_lib_primitives.MutList.md#make)
- [pop](src_lib_primitives.MutList.md#pop)
- [prepend](src_lib_primitives.MutList.md#prepend)
- [reset](src_lib_primitives.MutList.md#reset)
- [shift](src_lib_primitives.MutList.md#shift)
- [tail](src_lib_primitives.MutList.md#tail)

## Other

### pop

▸ **pop**<`A`\>(`self`): `undefined` \| `A`

Removes the last value from the list and returns it, if it exists.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |

#### Returns

`undefined` \| `A`

**`Since`**

0.0.1

#### Defined in

node_modules/@effect/data/MutableList.d.ts:102

___

### reset

▸ **reset**<`A`\>(`self`): [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

Removes all elements from the doubly-linked list.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |

#### Returns

[`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:80

___

### shift

▸ **shift**<`A`\>(`self`): `undefined` \| `A`

Removes the first value from the list and returns it, if it exists.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |

#### Returns

`undefined` \| `A`

**`Since`**

0.0.1

#### Defined in

node_modules/@effect/data/MutableList.d.ts:96

## concatenating

### append

▸ **append**<`A`\>(`value`): (`self`: [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>) => [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

Appends the specified element to the end of the `MutableList`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `A` |

#### Returns

`fn`

▸ (`self`): [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |

##### Returns

[`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:88

▸ **append**<`A`\>(`self`, `value`): [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

Appends the specified element to the end of the `MutableList`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |
| `value` | `A` |

#### Returns

[`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:89

___

### prepend

▸ **prepend**<`A`\>(`value`): (`self`: [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>) => [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

Prepends the specified value to the beginning of the list.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `A` |

#### Returns

`fn`

▸ (`self`): [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |

##### Returns

[`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:110

▸ **prepend**<`A`\>(`self`, `value`): [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

Prepends the specified value to the beginning of the list.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |
| `value` | `A` |

#### Returns

[`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:111

## constructors

### empty

▸ **empty**<`A`\>(): [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

Creates an empty `MutableList`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Returns

[`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:22

___

### fromIterable

▸ **fromIterable**<`A`\>(`iterable`): [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

Creates a new `MutableList` from an `Iterable`.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `iterable` | `Iterable`<`A`\> |

#### Returns

[`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:29

___

### make

▸ **make**<`A`\>(`...elements`): [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

Creates a new `MutableList` from the specified elements.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `...elements` | readonly `A`[] |

#### Returns

[`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:36

## getters

### head

▸ **head**<`A`\>(`self`): `undefined` \| `A`

Returns the first element of the list, if it exists.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |

#### Returns

`undefined` \| `A`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:64

___

### isEmpty

▸ **isEmpty**<`A`\>(`self`): `boolean`

Returns `true` if the list contains zero elements, `false`, otherwise.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |

#### Returns

`boolean`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:43

___

### length

▸ **length**<`A`\>(`self`): `number`

Returns the length of the list.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |

#### Returns

`number`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:50

___

### tail

▸ **tail**<`A`\>(`self`): `undefined` \| `A`

Returns the last element of the list, if it exists.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |

#### Returns

`undefined` \| `A`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:57

## symbol

### TypeId

Ƭ **TypeId**: typeof `TypeId`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:8

## traversing

### forEach

▸ **forEach**<`A`\>(`f`): (`self`: [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\>) => `void`

Executes the specified function `f` for each element in the list.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`element`: `A`) => `void` |

#### Returns

`fn`

▸ (`self`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |

##### Returns

`void`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:72

▸ **forEach**<`A`\>(`self`, `f`): `void`

Executes the specified function `f` for each element in the list.

#### Type parameters

| Name |
| :------ |
| `A` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableList`](../interfaces/src_lib_primitives.MutList.MutableList.md)<`A`\> |
| `f` | (`element`: `A`) => `void` |

#### Returns

`void`

**`Since`**

1.0.0

#### Defined in

node_modules/@effect/data/MutableList.d.ts:73
