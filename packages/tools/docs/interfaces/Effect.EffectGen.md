[@eslint-react/tools](../README.md) / [Effect](../modules/Effect.md) / EffectGen

# Interface: EffectGen\<R, E, A\>

[Effect](../modules/Effect.md).EffectGen

**`Since`**

2.0.0

## Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

## Table of contents

### Properties

- [\_A](Effect.EffectGen.md#_a)
- [\_E](Effect.EffectGen.md#_e)
- [\_R](Effect.EffectGen.md#_r)
- [value](Effect.EffectGen.md#value)

### Methods

- [[iterator]](Effect.EffectGen.md#[iterator])

## Properties

### \_A

• `Readonly` **\_A**: () => `A`

#### Type declaration

▸ (): `A`

##### Returns

`A`

___

### \_E

• `Readonly` **\_E**: () => `E`

#### Type declaration

▸ (): `E`

##### Returns

`E`

___

### \_R

• `Readonly` **\_R**: () => `R`

#### Type declaration

▸ (): `R`

##### Returns

`R`

___

### value

• `Readonly` **value**: [`Effect`](Effect.Effect-1.md)\<`R`, `E`, `A`\>

## Methods

### [iterator]

▸ **[iterator]**(): `Generator`\<[`EffectGen`](Effect.EffectGen.md)\<`R`, `E`, `A`\>, `A`, `unknown`\>

#### Returns

`Generator`\<[`EffectGen`](Effect.EffectGen.md)\<`R`, `E`, `A`\>, `A`, `unknown`\>
