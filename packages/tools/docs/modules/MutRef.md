[@eslint-react/tools](../README.md) / MutRef

# Namespace: MutRef

## Table of contents

### Interfaces

- [MutableRef](../interfaces/MutRef.MutableRef.md)

### Type Aliases

- [TypeId](MutRef.md#typeid)

### Functions

- [compareAndSet](MutRef.md#compareandset)
- [decrement](MutRef.md#decrement)
- [decrementAndGet](MutRef.md#decrementandget)
- [get](MutRef.md#get)
- [getAndDecrement](MutRef.md#getanddecrement)
- [getAndIncrement](MutRef.md#getandincrement)
- [getAndSet](MutRef.md#getandset)
- [getAndUpdate](MutRef.md#getandupdate)
- [increment](MutRef.md#increment)
- [incrementAndGet](MutRef.md#incrementandget)
- [make](MutRef.md#make)
- [set](MutRef.md#set)
- [setAndGet](MutRef.md#setandget)
- [toggle](MutRef.md#toggle)
- [update](MutRef.md#update)
- [updateAndGet](MutRef.md#updateandget)

## boolean

### toggle

▸ **toggle**(`self`): [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`boolean`\> |

#### Returns

[`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`boolean`\>

**`Since`**

2.0.0

## constructors

### make

▸ **make**\<`T`\>(`value`): [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

**`Since`**

2.0.0

## general

### compareAndSet

▸ **compareAndSet**\<`T`\>(`oldValue`, `newValue`): (`self`: [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>) => `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `oldValue` | `T` |
| `newValue` | `T` |

#### Returns

`fn`

▸ (`self`): `boolean`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |

##### Returns

`boolean`

**`Since`**

2.0.0

▸ **compareAndSet**\<`T`\>(`self`, `oldValue`, `newValue`): `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |
| `oldValue` | `T` |
| `newValue` | `T` |

#### Returns

`boolean`

**`Since`**

2.0.0

___

### get

▸ **get**\<`T`\>(`self`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |

#### Returns

`T`

**`Since`**

2.0.0

___

### getAndSet

▸ **getAndSet**\<`T`\>(`value`): (`self`: [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`fn`

▸ (`self`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |

##### Returns

`T`

**`Since`**

2.0.0

▸ **getAndSet**\<`T`\>(`self`, `value`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |
| `value` | `T` |

#### Returns

`T`

**`Since`**

2.0.0

___

### getAndUpdate

▸ **getAndUpdate**\<`T`\>(`f`): (`self`: [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `T`) => `T` |

#### Returns

`fn`

▸ (`self`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |

##### Returns

`T`

**`Since`**

2.0.0

▸ **getAndUpdate**\<`T`\>(`self`, `f`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |
| `f` | (`value`: `T`) => `T` |

#### Returns

`T`

**`Since`**

2.0.0

___

### set

▸ **set**\<`T`\>(`value`): (`self`: [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>) => [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`fn`

▸ (`self`): [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |

##### Returns

[`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

**`Since`**

2.0.0

▸ **set**\<`T`\>(`self`, `value`): [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |
| `value` | `T` |

#### Returns

[`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

**`Since`**

2.0.0

___

### setAndGet

▸ **setAndGet**\<`T`\>(`value`): (`self`: [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

`fn`

▸ (`self`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |

##### Returns

`T`

**`Since`**

2.0.0

▸ **setAndGet**\<`T`\>(`self`, `value`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |
| `value` | `T` |

#### Returns

`T`

**`Since`**

2.0.0

___

### update

▸ **update**\<`T`\>(`f`): (`self`: [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>) => [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `T`) => `T` |

#### Returns

`fn`

▸ (`self`): [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |

##### Returns

[`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

**`Since`**

2.0.0

▸ **update**\<`T`\>(`self`, `f`): [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |
| `f` | (`value`: `T`) => `T` |

#### Returns

[`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>

**`Since`**

2.0.0

___

### updateAndGet

▸ **updateAndGet**\<`T`\>(`f`): (`self`: [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\>) => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `f` | (`value`: `T`) => `T` |

#### Returns

`fn`

▸ (`self`): `T`

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |

##### Returns

`T`

**`Since`**

2.0.0

▸ **updateAndGet**\<`T`\>(`self`, `f`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`T`\> |
| `f` | (`value`: `T`) => `T` |

#### Returns

`T`

**`Since`**

2.0.0

## numeric

### decrement

▸ **decrement**(`self`): [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`number`\> |

#### Returns

[`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`number`\>

**`Since`**

2.0.0

___

### decrementAndGet

▸ **decrementAndGet**(`self`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`number`\> |

#### Returns

`number`

**`Since`**

2.0.0

___

### getAndDecrement

▸ **getAndDecrement**(`self`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`number`\> |

#### Returns

`number`

**`Since`**

2.0.0

___

### getAndIncrement

▸ **getAndIncrement**(`self`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`number`\> |

#### Returns

`number`

**`Since`**

2.0.0

___

### increment

▸ **increment**(`self`): [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`number`\> |

#### Returns

[`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`number`\>

**`Since`**

2.0.0

___

### incrementAndGet

▸ **incrementAndGet**(`self`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/MutRef.MutableRef.md)\<`number`\> |

#### Returns

`number`

**`Since`**

2.0.0

## symbol

### TypeId

Ƭ **TypeId**: typeof `TypeId`

**`Since`**

2.0.0
