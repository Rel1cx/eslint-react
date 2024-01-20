[@eslint-react/tools](../README.md) / [Effect](../modules/Effect.md) / [Retry](../modules/Effect.Retry.md) / Options

# Interface: Options\<E\>

[Effect](../modules/Effect.md).[Retry](../modules/Effect.Retry.md).Options

**`Since`**

2.0.0

## Type parameters

| Name |
| :------ |
| `E` |

## Table of contents

### Properties

- [schedule](Effect.Retry.Options.md#schedule)
- [times](Effect.Retry.Options.md#times)
- [until](Effect.Retry.Options.md#until)
- [while](Effect.Retry.Options.md#while)

## Properties

### schedule

• `Optional` **schedule**: `Schedule`\<`any`, `E`, `any`\>

___

### times

• `Optional` **times**: `number`

___

### until

• `Optional` **until**: (`error`: `E`) => `boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>

#### Type declaration

▸ (`error`): `boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` |

##### Returns

`boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>

___

### while

• `Optional` **while**: (`error`: `E`) => `boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>

#### Type declaration

▸ (`error`): `boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>

##### Parameters

| Name | Type |
| :------ | :------ |
| `error` | `E` |

##### Returns

`boolean` \| [`Effect`](Effect.Effect-1.md)\<`any`, `any`, `boolean`\>
