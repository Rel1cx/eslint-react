[@eslint-react/tools](../README.md) / [Effect](../modules/Effect.md) / [Repeat](../modules/Effect.Repeat.md) / Options

# Interface: Options\<A\>

[Effect](../modules/Effect.md).[Repeat](../modules/Effect.Repeat.md).Options

**`Since`**

2.0.0

## Type parameters

| Name |
| :------ |
| `A` |

## Table of contents

### Properties

- [schedule](Effect.Repeat.Options.md#schedule)
- [times](Effect.Repeat.Options.md#times)
- [until](Effect.Repeat.Options.md#until)
- [while](Effect.Repeat.Options.md#while)

## Properties

### schedule

• `Optional` **schedule**: `Schedule`\<`any`, `A`, `any`\>

___

### times

• `Optional` **times**: `number`

___

### until

• `Optional` **until**: (`_`: `A`) => `boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>

#### Type declaration

▸ (`_`): `boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `A` |

##### Returns

`boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>

___

### while

• `Optional` **while**: (`_`: `A`) => `boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>

#### Type declaration

▸ (`_`): `boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `_` | `A` |

##### Returns

`boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>
