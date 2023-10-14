[@eslint-react/tools](../README.md) / MutList

# Namespace: MutList

## Table of contents

### Interfaces

- [MutableList](../interfaces/MutList.MutableList.md)

### Type Aliases

- [TypeId](MutList.md#typeid)

### Functions

- [append](MutList.md#append)
- [empty](MutList.md#empty)
- [forEach](MutList.md#foreach)
- [fromIterable](MutList.md#fromiterable)
- [head](MutList.md#head)
- [isEmpty](MutList.md#isempty)
- [length](MutList.md#length)
- [make](MutList.md#make)
- [pop](MutList.md#pop)
- [prepend](MutList.md#prepend)
- [reset](MutList.md#reset)
- [shift](MutList.md#shift)
- [tail](MutList.md#tail)

## Other

### pop

▸ **pop**<`A`\>(`self`): `undefined` \| `A`

Removes the last value from the list and returns it, if it exists.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |

#### Returns

`undefined` \| `A`

**`Since`**

0.0.1

---

### reset

▸ **reset**<`A`\>(`self`): [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

Removes all elements from the doubly-linked list.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |

#### Returns

[`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

**`Since`**

2.0.0

---

### shift

▸ **shift**<`A`\>(`self`): `undefined` \| `A`

Removes the first value from the list and returns it, if it exists.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |

#### Returns

`undefined` \| `A`

**`Since`**

0.0.1

## concatenating

### append

▸ **append**<`A`\>(`value`): (`self`: [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>) => [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

Appends the specified element to the end of the `MutableList`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `A`  |

#### Returns

`fn`

▸ (`self`): [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

##### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |

##### Returns

[`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

**`Since`**

2.0.0

▸ **append**<`A`\>(`self`, `value`): [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

Appends the specified element to the end of the `MutableList`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type                                                        |
| :------ | :---------------------------------------------------------- |
| `self`  | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |
| `value` | `A`                                                         |

#### Returns

[`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

**`Since`**

2.0.0

---

### prepend

▸ **prepend**<`A`\>(`value`): (`self`: [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>) => [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

Prepends the specified value to the beginning of the list.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `A`  |

#### Returns

`fn`

▸ (`self`): [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

##### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |

##### Returns

[`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

**`Since`**

2.0.0

▸ **prepend**<`A`\>(`self`, `value`): [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

Prepends the specified value to the beginning of the list.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type                                                        |
| :------ | :---------------------------------------------------------- |
| `self`  | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |
| `value` | `A`                                                         |

#### Returns

[`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

**`Since`**

2.0.0

## constructors

### empty

▸ **empty**<`A`\>(): [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

Creates an empty `MutableList`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Returns

[`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

**`Since`**

2.0.0

---

### fromIterable

▸ **fromIterable**<`A`\>(`iterable`): [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

Creates a new `MutableList` from an `Iterable`.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name       | Type             |
| :--------- | :--------------- |
| `iterable` | `Iterable`<`A`\> |

#### Returns

[`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

**`Since`**

2.0.0

---

### make

▸ **make**<`A`\>(`...elements`): [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

Creates a new `MutableList` from the specified elements.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name          | Type           |
| :------------ | :------------- |
| `...elements` | readonly `A`[] |

#### Returns

[`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>

**`Since`**

2.0.0

## getters

### head

▸ **head**<`A`\>(`self`): `undefined` \| `A`

Returns the first element of the list, if it exists.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |

#### Returns

`undefined` \| `A`

**`Since`**

2.0.0

---

### isEmpty

▸ **isEmpty**<`A`\>(`self`): `boolean`

Returns `true` if the list contains zero elements, `false`, otherwise.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |

#### Returns

`boolean`

**`Since`**

2.0.0

---

### length

▸ **length**<`A`\>(`self`): `number`

Returns the length of the list.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |

#### Returns

`number`

**`Since`**

2.0.0

---

### tail

▸ **tail**<`A`\>(`self`): `undefined` \| `A`

Returns the last element of the list, if it exists.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |

#### Returns

`undefined` \| `A`

**`Since`**

2.0.0

## symbol

### TypeId

Ƭ **TypeId**: typeof `TypeId`

**`Since`**

2.0.0

## traversing

### forEach

▸ **forEach**<`A`\>(`f`): (`self`: [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\>) => `void`

Executes the specified function `f` for each element in the list.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type                       |
| :--- | :------------------------- |
| `f`  | (`element`: `A`) => `void` |

#### Returns

`fn`

▸ (`self`): `void`

##### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |

##### Returns

`void`

**`Since`**

2.0.0

▸ **forEach**<`A`\>(`self`, `f`): `void`

Executes the specified function `f` for each element in the list.

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                                        |
| :----- | :---------------------------------------------------------- |
| `self` | [`MutableList`](../interfaces/MutList.MutableList.md)<`A`\> |
| `f`    | (`element`: `A`) => `void`                                  |

#### Returns

`void`

**`Since`**

2.0.0
