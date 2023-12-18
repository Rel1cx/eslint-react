[@eslint-react/tools](../README.md) / Helper

# Namespace: Helper

## Table of contents

### Namespaces

- [Debug](Helper.Debug.md)
- [Record](Helper.Record.md)
- [Union](Helper.Union.md)

### Type Aliases

- [Narrow](Helper.md#narrow)

### Functions

- [asConst](Helper.md#asconst)
- [constant](Helper.md#constant)
- [id](Helper.md#id)
- [narrow](Helper.md#narrow-1)
- [noop](Helper.md#noop)

## Type Aliases

### Narrow

Ƭ **Narrow**\<`TType`\>: \{ [K in keyof TType]: Narrow\<TType[K]\> } \| `TType` extends [] ? [] : `never` \| `TType` extends `Function` ? `TType` : `never` \| `TType` extends `bigint` \| `boolean` \| `number` \| `string` ? `TType` : `never`

Infers embedded primitive type of any type

**`Since`**

0.0.1

**`Param`**

Type to infer

**`Example`**

```ts
type Result = Narrow<['foo', 'bar', 1]>
```

**`See`**

https://twitter.com/hd_nvim/status/1578567206190780417

#### Type parameters

| Name |
| :------ |
| `TType` |

## Functions

### asConst

▸ **asConst**\<`T`\>(`a`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | `T` | The value to infer. |

#### Returns

`T`

**`Since`**

0.0.1

___

### constant

▸ **constant**\<`T`\>(`a`): () => `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |

#### Returns

`fn`

▸ (): `T`

##### Returns

`T`

**`Since`**

0.0.1

___

### id

▸ **id**\<`T`\>(`a`): `T`

#### Type parameters

| Name |
| :------ |
| `T` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `a` | `T` |

#### Returns

`T`

**`Since`**

0.0.1

___

### narrow

▸ **narrow**\<`TType`\>(`a`): [`Narrow`](Helper.md#narrow)\<`TType`\>

Infers embedded primitive type of any type
Same as `as const` but without setting the object as readonly and without needing the user to use it.

#### Type parameters

| Name |
| :------ |
| `TType` |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `a` | [`Narrow`](Helper.md#narrow)\<`TType`\> | Value to infer |

#### Returns

[`Narrow`](Helper.md#narrow)\<`TType`\>

Value with embedded type inferred

**`Since`**

0.0.1

**`Example`**

```ts
const result = narrow(['foo', 'bar', 1])
```

___

### noop

▸ **noop**(): `void`

#### Returns

`void`

**`Since`**

0.0.1
