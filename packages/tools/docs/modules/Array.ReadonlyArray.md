[@eslint-react/tools](../README.md) / [Array](Array.md) / ReadonlyArray

# Namespace: ReadonlyArray

[Array](Array.md).ReadonlyArray

**`Since`**

2.0.0

## Table of contents

### Type Aliases

- [AndNonEmpty](Array.ReadonlyArray.md#andnonempty)
- [Flatten](Array.ReadonlyArray.md#flatten)
- [Infer](Array.ReadonlyArray.md#infer)
- [OrNonEmpty](Array.ReadonlyArray.md#ornonempty)
- [With](Array.ReadonlyArray.md#with)

## Type Aliases

### AndNonEmpty

Ƭ **AndNonEmpty**\<`S`, `T`, `A`\>: `S` extends [`NonEmptyReadonlyArray`](Array.md#nonemptyreadonlyarray)\<`any`\> ? `T` extends [`NonEmptyReadonlyArray`](Array.md#nonemptyreadonlyarray)\<`any`\> ? [`NonEmptyArray`](Array.md#nonemptyarray)\<`A`\> : `A`[] : `A`[]

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `ReadonlyArray`\<`any`\> \| `Iterable`\<`any`\> |
| `T` | extends `ReadonlyArray`\<`any`\> \| `Iterable`\<`any`\> |
| `A` | `A` |

___

### Flatten

Ƭ **Flatten**\<`T`\>: `T` extends [`NonEmptyReadonlyArray`](Array.md#nonemptyreadonlyarray)\<[`NonEmptyReadonlyArray`](Array.md#nonemptyreadonlyarray)\<infer A\>\> ? [`NonEmptyArray`](Array.md#nonemptyarray)\<`A`\> : `T` extends `ReadonlyArray`\<`ReadonlyArray`\<infer A\>\> ? `A`[] : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ReadonlyArray`\<`ReadonlyArray`\<`any`\>\> |

___

### Infer

Ƭ **Infer**\<`S`\>: `S` extends `ReadonlyArray`\<infer A\> ? `A` : `S` extends `Iterable`\<infer A\> ? `A` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `ReadonlyArray`\<`any`\> \| `Iterable`\<`any`\> |

___

### OrNonEmpty

Ƭ **OrNonEmpty**\<`S`, `T`, `A`\>: `S` extends [`NonEmptyReadonlyArray`](Array.md#nonemptyreadonlyarray)\<`any`\> ? [`NonEmptyArray`](Array.md#nonemptyarray)\<`A`\> : `T` extends [`NonEmptyReadonlyArray`](Array.md#nonemptyreadonlyarray)\<`any`\> ? [`NonEmptyArray`](Array.md#nonemptyarray)\<`A`\> : `A`[]

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `ReadonlyArray`\<`any`\> \| `Iterable`\<`any`\> |
| `T` | extends `ReadonlyArray`\<`any`\> \| `Iterable`\<`any`\> |
| `A` | `A` |

___

### With

Ƭ **With**\<`S`, `A`\>: `S` extends [`NonEmptyReadonlyArray`](Array.md#nonemptyreadonlyarray)\<`any`\> ? [`NonEmptyArray`](Array.md#nonemptyarray)\<`A`\> : `A`[]

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `S` | extends `ReadonlyArray`\<`any`\> \| `Iterable`\<`any`\> |
| `A` | `A` |
