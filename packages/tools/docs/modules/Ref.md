[@eslint-react/tools](../README.md) / Ref

# Namespace: Ref

## Table of contents

### Namespaces

- [Ref](Ref.Ref.md)

### Interfaces

- [Ref](../interfaces/Ref.Ref-1.md)

### Type Aliases

- [RefTypeId](Ref.md#reftypeid)

### Variables

- [RefTypeId](Ref.md#reftypeid-1)

### Functions

- [get](Ref.md#get)
- [getAndSet](Ref.md#getandset)
- [getAndUpdate](Ref.md#getandupdate)
- [getAndUpdateSome](Ref.md#getandupdatesome)
- [make](Ref.md#make)
- [modify](Ref.md#modify)
- [modifySome](Ref.md#modifysome)
- [set](Ref.md#set)
- [setAndGet](Ref.md#setandget)
- [unsafeMake](Ref.md#unsafemake)
- [update](Ref.md#update)
- [updateAndGet](Ref.md#updateandget)
- [updateSome](Ref.md#updatesome)
- [updateSomeAndGet](Ref.md#updatesomeandget)

## constructors

### make

▸ **make**\<`A`\>(`value`): `Effect`\<`never`, `never`, [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `A`  |

#### Returns

`Effect`\<`never`, `never`, [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>\>

**`Since`**

2.0.0

## getters

### get

▸ **get**\<`A`\>(`self`): `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

#### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

## symbols

### RefTypeId

Ƭ **RefTypeId**: typeof [`RefTypeId`](Ref.md#reftypeid-1)

**`Since`**

2.0.0

---

### RefTypeId

• `Const` **RefTypeId**: unique `symbol`

**`Since`**

2.0.0

## unsafe

### unsafeMake

▸ **unsafeMake**\<`A`\>(`value`): [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type |
| :------ | :--- |
| `value` | `A`  |

#### Returns

[`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>

**`Since`**

2.0.0

## utils

### getAndSet

▸ **getAndSet**\<`A`\>(`value`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `A`\>

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

▸ (`self`): `Effect`\<`never`, `never`, `A`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

▸ **getAndSet**\<`A`\>(`self`, `value`): `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `self`  | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |
| `value` | `A`                                        |

#### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

---

### getAndUpdate

▸ **getAndUpdate**\<`A`\>(`f`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `f`  | (`a`: `A`) => `A` |

#### Returns

`fn`

▸ (`self`): `Effect`\<`never`, `never`, `A`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

▸ **getAndUpdate**\<`A`\>(`self`, `f`): `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |
| `f`    | (`a`: `A`) => `A`                          |

#### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

---

### getAndUpdateSome

▸ **getAndUpdateSome**\<`A`\>(`pf`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `pf` | (`a`: `A`) => [`Option`](O.md#option)\<`A`\> |

#### Returns

`fn`

▸ (`self`): `Effect`\<`never`, `never`, `A`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

▸ **getAndUpdateSome**\<`A`\>(`self`, `pf`): `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>   |
| `pf`   | (`a`: `A`) => [`Option`](O.md#option)\<`A`\> |

#### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

---

### modify

▸ **modify**\<`A`, `B`\>(`f`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name | Type                              |
| :--- | :-------------------------------- |
| `f`  | (`a`: `A`) => readonly [`B`, `A`] |

#### Returns

`fn`

▸ (`self`): `Effect`\<`never`, `never`, `B`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `B`\>

**`Since`**

2.0.0

▸ **modify**\<`A`, `B`\>(`self`, `f`): `Effect`\<`never`, `never`, `B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |
| `f`    | (`a`: `A`) => readonly [`B`, `A`]          |

#### Returns

`Effect`\<`never`, `never`, `B`\>

**`Since`**

2.0.0

---

### modifySome

▸ **modifySome**\<`B`, `A`\>(`fallback`, `pf`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `B`\>

#### Type parameters

| Name |
| :--- |
| `B`  |
| `A`  |

#### Parameters

| Name       | Type                                                         |
| :--------- | :----------------------------------------------------------- |
| `fallback` | `B`                                                          |
| `pf`       | (`a`: `A`) => [`Option`](O.md#option)\<readonly [`B`, `A`]\> |

#### Returns

`fn`

▸ (`self`): `Effect`\<`never`, `never`, `B`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `B`\>

**`Since`**

2.0.0

▸ **modifySome**\<`A`, `B`\>(`self`, `fallback`, `pf`): `Effect`\<`never`, `never`, `B`\>

#### Type parameters

| Name |
| :--- |
| `A`  |
| `B`  |

#### Parameters

| Name       | Type                                                         |
| :--------- | :----------------------------------------------------------- |
| `self`     | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>                   |
| `fallback` | `B`                                                          |
| `pf`       | (`a`: `A`) => [`Option`](O.md#option)\<readonly [`B`, `A`]\> |

#### Returns

`Effect`\<`never`, `never`, `B`\>

**`Since`**

2.0.0

---

### set

▸ **set**\<`A`\>(`value`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `void`\>

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

▸ (`self`): `Effect`\<`never`, `never`, `void`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `void`\>

**`Since`**

2.0.0

▸ **set**\<`A`\>(`self`, `value`): `Effect`\<`never`, `never`, `void`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `self`  | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |
| `value` | `A`                                        |

#### Returns

`Effect`\<`never`, `never`, `void`\>

**`Since`**

2.0.0

---

### setAndGet

▸ **setAndGet**\<`A`\>(`value`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `A`\>

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

▸ (`self`): `Effect`\<`never`, `never`, `A`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

▸ **setAndGet**\<`A`\>(`self`, `value`): `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name    | Type                                       |
| :------ | :----------------------------------------- |
| `self`  | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |
| `value` | `A`                                        |

#### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

---

### update

▸ **update**\<`A`\>(`f`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `void`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `f`  | (`a`: `A`) => `A` |

#### Returns

`fn`

▸ (`self`): `Effect`\<`never`, `never`, `void`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `void`\>

**`Since`**

2.0.0

▸ **update**\<`A`\>(`self`, `f`): `Effect`\<`never`, `never`, `void`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |
| `f`    | (`a`: `A`) => `A`                          |

#### Returns

`Effect`\<`never`, `never`, `void`\>

**`Since`**

2.0.0

---

### updateAndGet

▸ **updateAndGet**\<`A`\>(`f`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type              |
| :--- | :---------------- |
| `f`  | (`a`: `A`) => `A` |

#### Returns

`fn`

▸ (`self`): `Effect`\<`never`, `never`, `A`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

▸ **updateAndGet**\<`A`\>(`self`, `f`): `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |
| `f`    | (`a`: `A`) => `A`                          |

#### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

---

### updateSome

▸ **updateSome**\<`A`\>(`f`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `void`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `f`  | (`a`: `A`) => [`Option`](O.md#option)\<`A`\> |

#### Returns

`fn`

▸ (`self`): `Effect`\<`never`, `never`, `void`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `void`\>

**`Since`**

2.0.0

▸ **updateSome**\<`A`\>(`self`, `f`): `Effect`\<`never`, `never`, `void`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>   |
| `f`    | (`a`: `A`) => [`Option`](O.md#option)\<`A`\> |

#### Returns

`Effect`\<`never`, `never`, `void`\>

**`Since`**

2.0.0

---

### updateSomeAndGet

▸ **updateSomeAndGet**\<`A`\>(`pf`): (`self`: [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>) => `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name | Type                                         |
| :--- | :------------------------------------------- |
| `pf` | (`a`: `A`) => [`Option`](O.md#option)\<`A`\> |

#### Returns

`fn`

▸ (`self`): `Effect`\<`never`, `never`, `A`\>

##### Parameters

| Name   | Type                                       |
| :----- | :----------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\> |

##### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0

▸ **updateSomeAndGet**\<`A`\>(`self`, `pf`): `Effect`\<`never`, `never`, `A`\>

#### Type parameters

| Name |
| :--- |
| `A`  |

#### Parameters

| Name   | Type                                         |
| :----- | :------------------------------------------- |
| `self` | [`Ref`](../interfaces/Ref.Ref-1.md)\<`A`\>   |
| `pf`   | (`a`: `A`) => [`Option`](O.md#option)\<`A`\> |

#### Returns

`Effect`\<`never`, `never`, `A`\>

**`Since`**

2.0.0
