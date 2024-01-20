[@eslint-react/tools](../README.md) / [Effect](../modules/Effect.md) / EffectUnify

# Interface: EffectUnify\<A\>

[Effect](../modules/Effect.md).EffectUnify

**`Since`**

2.0.0

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Object` |

## Hierarchy

- [`EitherUnify`](E.EitherUnify.md)\<`A`\>

- [`OptionUnify`](O.OptionUnify.md)\<`A`\>

- [`TagUnify`](Context.TagUnify.md)\<`A`\>

  ↳ **`EffectUnify`**

## Table of contents

### Properties

- [Effect](Effect.EffectUnify.md#effect)
- [Either](Effect.EffectUnify.md#either)
- [Option](Effect.EffectUnify.md#option)
- [Tag](Effect.EffectUnify.md#tag)

## Properties

### Effect

• `Optional` **Effect**: () => `A`[typeof `typeSymbol`] extends [`Effect`](Effect.Effect-1.md)\<`R0`, `E0`, `A0`\> \| `_` ? [`Effect`](Effect.Effect-1.md)\<`R0`, `E0`, `A0`\> : `never`

#### Type declaration

▸ (): `A`[typeof `typeSymbol`] extends [`Effect`](Effect.Effect-1.md)\<`R0`, `E0`, `A0`\> \| `_` ? [`Effect`](Effect.Effect-1.md)\<`R0`, `E0`, `A0`\> : `never`

##### Returns

`A`[typeof `typeSymbol`] extends [`Effect`](Effect.Effect-1.md)\<`R0`, `E0`, `A0`\> \| `_` ? [`Effect`](Effect.Effect-1.md)\<`R0`, `E0`, `A0`\> : `never`

___

### Either

• `Optional` **Either**: () => `A`[typeof `typeSymbol`] extends [`Either`](../modules/E.md#either)\<`E0`, `A0`\> \| `_` ? [`Either`](../modules/E.md#either)\<`E0`, `A0`\> : `never`

#### Type declaration

▸ (): `A`[typeof `typeSymbol`] extends [`Either`](../modules/E.md#either)\<`E0`, `A0`\> \| `_` ? [`Either`](../modules/E.md#either)\<`E0`, `A0`\> : `never`

##### Returns

`A`[typeof `typeSymbol`] extends [`Either`](../modules/E.md#either)\<`E0`, `A0`\> \| `_` ? [`Either`](../modules/E.md#either)\<`E0`, `A0`\> : `never`

#### Inherited from

[EitherUnify](E.EitherUnify.md).[Either](E.EitherUnify.md#either)

___

### Option

• `Optional` **Option**: () => `A`[typeof `typeSymbol`] extends [`Option`](../modules/O.md#option)\<`A0`\> \| `_` ? [`Option`](../modules/O.md#option)\<`A0`\> : `never`

#### Type declaration

▸ (): `A`[typeof `typeSymbol`] extends [`Option`](../modules/O.md#option)\<`A0`\> \| `_` ? [`Option`](../modules/O.md#option)\<`A0`\> : `never`

##### Returns

`A`[typeof `typeSymbol`] extends [`Option`](../modules/O.md#option)\<`A0`\> \| `_` ? [`Option`](../modules/O.md#option)\<`A0`\> : `never`

#### Inherited from

[OptionUnify](O.OptionUnify.md).[Option](O.OptionUnify.md#option)

___

### Tag

• `Optional` **Tag**: () => `A`[typeof `typeSymbol`] extends [`Tag`](Context.Tag.md)\<`I0`, `S0`\> \| `_` ? [`Tag`](Context.Tag.md)\<`I0`, `S0`\> : `never`

#### Type declaration

▸ (): `A`[typeof `typeSymbol`] extends [`Tag`](Context.Tag.md)\<`I0`, `S0`\> \| `_` ? [`Tag`](Context.Tag.md)\<`I0`, `S0`\> : `never`

##### Returns

`A`[typeof `typeSymbol`] extends [`Tag`](Context.Tag.md)\<`I0`, `S0`\> \| `_` ? [`Tag`](Context.Tag.md)\<`I0`, `S0`\> : `never`

#### Inherited from

[TagUnify](Context.TagUnify.md).[Tag](Context.TagUnify.md#tag)
