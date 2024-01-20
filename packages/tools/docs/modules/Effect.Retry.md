[@eslint-react/tools](../README.md) / [Effect](Effect.md) / Retry

# Namespace: Retry

[Effect](Effect.md).Retry

**`Since`**

2.0.0

## Table of contents

### Interfaces

- [Options](../interfaces/Effect.Retry.Options.md)

### Type Aliases

- [Return](Effect.Retry.md#return)

## error handling

### Return

Ƭ **Return**\<`R`, `E`, `A`, `O`\>: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule.Schedule`\<infer X, infer \_I, infer \_O\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<infer X, infer \_E, infer \_A\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<infer X, infer \_E, infer \_A\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule.Schedule`\<infer \_R, infer \_I, infer \_O\>  } ? `E` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`E`, infer E2\>  } ? `E2` : `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<infer \_R, infer X, infer \_A\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<infer \_R, infer X, infer \_A\>  } ? `X` : `never`, `A`\> extends infer Z ? `Z` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `O` | extends [`Options`](../interfaces/Effect.Retry.Options.md)\<`E`\> |
