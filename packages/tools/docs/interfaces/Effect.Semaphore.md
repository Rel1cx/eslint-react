[@eslint-react/tools](../README.md) / [Effect](../modules/Effect.md) / Semaphore

# Interface: Semaphore

[Effect](../modules/Effect.md).Semaphore

**`Since`**

2.0.0

## Table of contents

### Methods

- [release](Effect.Semaphore.md#release)
- [take](Effect.Semaphore.md#take)
- [withPermits](Effect.Semaphore.md#withpermits)

## Methods

### release

▸ **release**(`permits`): [`Effect`](Effect.Effect-1.md)\<`never`, `never`, `void`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `permits` | `number` |

#### Returns

[`Effect`](Effect.Effect-1.md)\<`never`, `never`, `void`\>

___

### take

▸ **take**(`permits`): [`Effect`](Effect.Effect-1.md)\<`never`, `never`, `number`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `permits` | `number` |

#### Returns

[`Effect`](Effect.Effect-1.md)\<`never`, `never`, `number`\>

___

### withPermits

▸ **withPermits**(`permits`): \<R, E, A\>(`self`: [`Effect`](Effect.Effect-1.md)\<`R`, `E`, `A`\>) => [`Effect`](Effect.Effect-1.md)\<`R`, `E`, `A`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `permits` | `number` |

#### Returns

`fn`

▸ \<`R`, `E`, `A`\>(`self`): [`Effect`](Effect.Effect-1.md)\<`R`, `E`, `A`\>

##### Type parameters

| Name |
| :------ |
| `R` |
| `E` |
| `A` |

##### Parameters

| Name | Type |
| :------ | :------ |
| `self` | [`Effect`](Effect.Effect-1.md)\<`R`, `E`, `A`\> |

##### Returns

[`Effect`](Effect.Effect-1.md)\<`R`, `E`, `A`\>
