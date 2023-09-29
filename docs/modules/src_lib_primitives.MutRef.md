[eslint-plugin-react-ts](../README.md) / [src/lib/primitives](src_lib_primitives.md) / MutRef

# Namespace: MutRef

[src/lib/primitives](src_lib_primitives.md).MutRef

## Table of contents

### Interfaces

- [MutableRef](../interfaces/src_lib_primitives.MutRef.MutableRef.md)

### Type Aliases

- [TypeId](src_lib_primitives.MutRef.md#typeid)

### Functions

- [compareAndSet](src_lib_primitives.MutRef.md#compareandset)
- [decrement](src_lib_primitives.MutRef.md#decrement)
- [decrementAndGet](src_lib_primitives.MutRef.md#decrementandget)
- [get](src_lib_primitives.MutRef.md#get)
- [getAndDecrement](src_lib_primitives.MutRef.md#getanddecrement)
- [getAndIncrement](src_lib_primitives.MutRef.md#getandincrement)
- [getAndSet](src_lib_primitives.MutRef.md#getandset)
- [getAndUpdate](src_lib_primitives.MutRef.md#getandupdate)
- [increment](src_lib_primitives.MutRef.md#increment)
- [incrementAndGet](src_lib_primitives.MutRef.md#incrementandget)
- [make](src_lib_primitives.MutRef.md#make)
- [set](src_lib_primitives.MutRef.md#set)
- [setAndGet](src_lib_primitives.MutRef.md#setandget)
- [toggle](src_lib_primitives.MutRef.md#toggle)
- [update](src_lib_primitives.MutRef.md#update)
- [updateAndGet](src_lib_primitives.MutRef.md#updateandget)

## boolean

### toggle

▸ **toggle**(`self`): [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`boolean`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`boolean`\> |

#### Returns

[`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`boolean`\>

**`Since`**

1.0.0

## constructors

### make

▸ **make**<`T`\>(`value`): [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `value` | `T` |

#### Returns

[`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

**`Since`**

1.0.0

## general

### compareAndSet

▸ **compareAndSet**<`T`\>(`oldValue`, `newValue`): (`self`: [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>) => `boolean`

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
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |

##### Returns

`boolean`

**`Since`**

1.0.0

▸ **compareAndSet**<`T`\>(`self`, `oldValue`, `newValue`): `boolean`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |
| `oldValue` | `T` |
| `newValue` | `T` |

#### Returns

`boolean`

**`Since`**

1.0.0

___

### get

▸ **get**<`T`\>(`self`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |

#### Returns

`T`

**`Since`**

1.0.0

___

### getAndSet

▸ **getAndSet**<`T`\>(`value`): (`self`: [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>) => `T`

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
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |

##### Returns

`T`

**`Since`**

1.0.0

▸ **getAndSet**<`T`\>(`self`, `value`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |
| `value` | `T` |

#### Returns

`T`

**`Since`**

1.0.0

___

### getAndUpdate

▸ **getAndUpdate**<`T`\>(`f`): (`self`: [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>) => `T`

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
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |

##### Returns

`T`

**`Since`**

1.0.0

▸ **getAndUpdate**<`T`\>(`self`, `f`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |
| `f` | (`value`: `T`) => `T` |

#### Returns

`T`

**`Since`**

1.0.0

___

### set

▸ **set**<`T`\>(`value`): (`self`: [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>) => [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

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

▸ (`self`): [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |

##### Returns

[`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

**`Since`**

1.0.0

▸ **set**<`T`\>(`self`, `value`): [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |
| `value` | `T` |

#### Returns

[`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

**`Since`**

1.0.0

___

### setAndGet

▸ **setAndGet**<`T`\>(`value`): (`self`: [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>) => `T`

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
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |

##### Returns

`T`

**`Since`**

1.0.0

▸ **setAndGet**<`T`\>(`self`, `value`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |
| `value` | `T` |

#### Returns

`T`

**`Since`**

1.0.0

___

### update

▸ **update**<`T`\>(`f`): (`self`: [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>) => [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

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

▸ (`self`): [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |

##### Returns

[`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

**`Since`**

1.0.0

▸ **update**<`T`\>(`self`, `f`): [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |
| `f` | (`value`: `T`) => `T` |

#### Returns

[`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>

**`Since`**

1.0.0

___

### updateAndGet

▸ **updateAndGet**<`T`\>(`f`): (`self`: [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\>) => `T`

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
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |

##### Returns

`T`

**`Since`**

1.0.0

▸ **updateAndGet**<`T`\>(`self`, `f`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`T`\> |
| `f` | (`value`: `T`) => `T` |

#### Returns

`T`

**`Since`**

1.0.0

## numeric

### decrement

▸ **decrement**(`self`): [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`number`\> |

#### Returns

[`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`number`\>

**`Since`**

1.0.0

___

### decrementAndGet

▸ **decrementAndGet**(`self`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`number`\> |

#### Returns

`number`

**`Since`**

1.0.0

___

### getAndDecrement

▸ **getAndDecrement**(`self`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`number`\> |

#### Returns

`number`

**`Since`**

1.0.0

___

### getAndIncrement

▸ **getAndIncrement**(`self`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`number`\> |

#### Returns

`number`

**`Since`**

1.0.0

___

### increment

▸ **increment**(`self`): [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`number`\> |

#### Returns

[`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`number`\>

**`Since`**

1.0.0

___

### incrementAndGet

▸ **incrementAndGet**(`self`): `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`MutableRef`](../interfaces/src_lib_primitives.MutRef.MutableRef.md)<`number`\> |

#### Returns

`number`

**`Since`**

1.0.0

## symbol

### TypeId

Ƭ **TypeId**: typeof `TypeId`

**`Since`**

1.0.0
