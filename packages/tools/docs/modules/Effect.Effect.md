[@eslint-react/tools](../README.md) / [Effect](Effect.md) / Effect

# Namespace: Effect

[Effect](Effect.md).Effect

**`Since`**

2.0.0

## Table of contents

### Interfaces

- [Variance](../interfaces/Effect.Effect.Variance.md)
- [VarianceStruct](../interfaces/Effect.Effect.VarianceStruct.md)

### Type Aliases

- [Context](Effect.Effect.md#context)
- [Error](Effect.Effect.md#error)
- [Success](Effect.Effect.md#success)
- [Unify](Effect.Effect.md#unify)

## models

### Unify

Ƭ **Unify**\<`Ret`\>: [`Effect`](../interfaces/Effect.Effect-1.md)\<[`Context`](Effect.Effect.md#context)\<`Ret`\>, [`Error`](Effect.Effect.md#error)\<`Ret`\>, [`Success`](Effect.Effect.md#success)\<`Ret`\>\>

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Ret` | extends [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\> |

## type-level

### Context

Ƭ **Context**\<`T`\>: [`T`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<infer \_R, infer \_E, infer \_A\>] ? `_R` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\> |

___

### Error

Ƭ **Error**\<`T`\>: [`T`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<infer \_R, infer \_E, infer \_A\>] ? `_E` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\> |

___

### Success

Ƭ **Success**\<`T`\>: [`T`] extends [[`Effect`](../interfaces/Effect.Effect-1.md)\<infer \_R, infer \_E, infer \_A\>] ? `_A` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\> |
