[@eslint-react/tools](../README.md) / [Context](../modules/Context.md) / TagUnify

# Interface: TagUnify\<A\>

[Context](../modules/Context.md).TagUnify

**`Since`**

2.0.0

## Type parameters

| Name | Type |
| :------ | :------ |
| `A` | extends `Object` |

## Hierarchy

- **`TagUnify`**

  ↳ [`EffectUnify`](Effect.EffectUnify.md)

## Table of contents

### Properties

- [Tag](Context.TagUnify.md#tag)

## Properties

### Tag

• `Optional` **Tag**: () => `A`[typeof `typeSymbol`] extends [`Tag`](Context.Tag.md)\<`I0`, `S0`\> \| `_` ? [`Tag`](Context.Tag.md)\<`I0`, `S0`\> : `never`

#### Type declaration

▸ (): `A`[typeof `typeSymbol`] extends [`Tag`](Context.Tag.md)\<`I0`, `S0`\> \| `_` ? [`Tag`](Context.Tag.md)\<`I0`, `S0`\> : `never`

##### Returns

`A`[typeof `typeSymbol`] extends [`Tag`](Context.Tag.md)\<`I0`, `S0`\> \| `_` ? [`Tag`](Context.Tag.md)\<`I0`, `S0`\> : `never`
