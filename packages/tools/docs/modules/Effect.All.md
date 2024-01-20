[@eslint-react/tools](../README.md) / [Effect](Effect.md) / All

# Namespace: All

[Effect](Effect.md).All

**`Since`**

2.0.0

## Table of contents

### Type Aliases

- [EffectAny](Effect.All.md#effectany)
- [ExtractMode](Effect.All.md#extractmode)
- [IsDiscard](Effect.All.md#isdiscard)
- [Return](Effect.All.md#return)
- [ReturnIterable](Effect.All.md#returniterable)
- [ReturnObject](Effect.All.md#returnobject)
- [ReturnTuple](Effect.All.md#returntuple)

## Type Aliases

### EffectAny

Ƭ **EffectAny**: [`Effect`](../interfaces/Effect.Effect-1.md)\<`any`, `any`, `any`\>

**`Since`**

2.0.0

___

### ExtractMode

Ƭ **ExtractMode**\<`A`\>: [`A`] extends [\{ `mode`: infer M  }] ? `M` : ``"default"``

**`Since`**

2.0.0

#### Type parameters

| Name |
| :------ |
| `A` |

___

### IsDiscard

Ƭ **IsDiscard**\<`A`\>: [`Extract`\<`A`, \{ `discard`: ``true``  }\>] extends [`never`] ? ``false`` : ``true``

**`Since`**

2.0.0

#### Type parameters

| Name |
| :------ |
| `A` |

___

### Return

Ƭ **Return**\<`Arg`, `O`\>: [`Arg`] extends [`ReadonlyArray`\<[`EffectAny`](Effect.All.md#effectany)\>] ? [`ReturnTuple`](Effect.All.md#returntuple)\<`Arg`, [`IsDiscard`](Effect.All.md#isdiscard)\<`O`\>, [`ExtractMode`](Effect.All.md#extractmode)\<`O`\>\> : [`Arg`] extends [`Iterable`\<[`EffectAny`](Effect.All.md#effectany)\>] ? [`ReturnIterable`](Effect.All.md#returniterable)\<`Arg`, [`IsDiscard`](Effect.All.md#isdiscard)\<`O`\>, [`ExtractMode`](Effect.All.md#extractmode)\<`O`\>\> : [`Arg`] extends [`Record`\<`string`, [`EffectAny`](Effect.All.md#effectany)\>] ? [`ReturnObject`](Effect.All.md#returnobject)\<`Arg`, [`IsDiscard`](Effect.All.md#isdiscard)\<`O`\>, [`ExtractMode`](Effect.All.md#extractmode)\<`O`\>\> : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `Arg` | extends `Iterable`\<[`EffectAny`](Effect.All.md#effectany)\> \| `Record`\<`string`, [`EffectAny`](Effect.All.md#effectany)\> |
| `O` | extends `Object` |

___

### ReturnIterable

Ƭ **ReturnIterable**\<`T`, `Discard`, `Mode`\>: [`T`] extends [`Iterable`\<[`Variance`](../interfaces/Effect.Effect.Variance.md)\<infer R, infer E, infer A\>\>] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<`R`, `Mode` extends ``"either"`` ? `never` : `Mode` extends ``"validate"`` ? [`Option`](O.md#option)\<`E`\>[] : `E`, `Discard` extends ``true`` ? `void` : `Mode` extends ``"either"`` ? [`Either`](E.md#either)\<`E`, `A`\>[] : `A`[]\> : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `Iterable`\<[`EffectAny`](Effect.All.md#effectany)\> |
| `Discard` | extends `boolean` |
| `Mode` | `Mode` |

___

### ReturnObject

Ƭ **ReturnObject**\<`T`, `Discard`, `Mode`\>: [`T`] extends [\{ `[K: string]`: [`EffectAny`](Effect.All.md#effectany);  }] ? [`Effect`](../interfaces/Effect.Effect-1.md)\<keyof `T` extends `never` ? `never` : [`T`[keyof `T`]] extends [\{ `[EffectTypeId]`: \{ `_R`: (`_`: `never`) => infer R  }  }] ? `R` : `never`, `Mode` extends ``"either"`` ? `never` : keyof `T` extends `never` ? `never` : `Mode` extends ``"validate"`` ? \{ -readonly [K in keyof T]: [T[K]] extends [Variance\<infer \_R, infer \_E, infer \_A\>] ? Option\<\_E\> : never } : [`T`[keyof `T`]] extends [\{ `[EffectTypeId]`: \{ `_E`: (`_`: `never`) => infer E  }  }] ? `E` : `never`, `Discard` extends ``true`` ? `void` : `Mode` extends ``"either"`` ? \{ -readonly [K in keyof T]: [T[K]] extends [Variance\<infer \_R, infer \_E, infer \_A\>] ? Either\<\_E, \_A\> : never } : \{ -readonly [K in keyof T]: [T[K]] extends [Variance\<infer \_R, infer \_E, infer \_A\>] ? \_A : never }\> : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | `T` |
| `Discard` | extends `boolean` |
| `Mode` | `Mode` |

___

### ReturnTuple

Ƭ **ReturnTuple**\<`T`, `Discard`, `Mode`\>: [`Effect`](../interfaces/Effect.Effect-1.md)\<`T`[`number`] extends `never` ? `never` : [`T`[`number`]] extends [\{ `[EffectTypeId]`: \{ `_R`: (`_`: `never`) => infer R  }  }] ? `R` : `never`, `Mode` extends ``"either"`` ? `never` : `T`[`number`] extends `never` ? `never` : `Mode` extends ``"validate"`` ? \{ -readonly [K in keyof T]: [T[K]] extends [Variance\<infer \_R, infer \_E, infer \_A\>] ? Option\<\_E\> : never } : [`T`[`number`]] extends [\{ `[EffectTypeId]`: \{ `_E`: (`_`: `never`) => infer E  }  }] ? `E` : `never`, `Discard` extends ``true`` ? `void` : `T`[`number`] extends `never` ? [] : `Mode` extends ``"either"`` ? \{ -readonly [K in keyof T]: [T[K]] extends [Variance\<infer \_R, infer \_E, infer \_A\>] ? Either\<\_E, \_A\> : never } : \{ -readonly [K in keyof T]: [T[K]] extends [Variance\<infer \_R, infer \_E, infer \_A\>] ? \_A : never }\> extends infer X ? `X` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ReadonlyArray`\<`unknown`\> |
| `Discard` | extends `boolean` |
| `Mode` | `Mode` |
