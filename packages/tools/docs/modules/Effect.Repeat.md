[@eslint-react/tools](../README.md) / [Effect](Effect.md) / Repeat

# Namespace: Repeat

[Effect](Effect.md).Repeat

**`Since`**

2.0.0

## Table of contents

### Interfaces

- [Options](../interfaces/Effect.Repeat.Options.md)

### Type Aliases

- [Return](Effect.Repeat.md#return)

## repetition / recursion

### Return

Ƭ **Return**\<`R`, `E`, `A`, `O`\>: [`Effect`](../interfaces/Effect.Effect-1.md)\<`R` \| `O` extends \{ `schedule`: `Schedule.Schedule`\<infer X, infer \_I, infer \_O\>  } ? `X` : `never` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<infer X, infer \_E, infer \_A\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<infer X, infer \_E, infer \_A\>  } ? `X` : `never`, `E` \| `O` extends \{ `while`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<infer \_R, infer X, infer \_A\>  } ? `X` : `never` \| `O` extends \{ `until`: (...`args`: `any`[]) => [`Effect`](../interfaces/Effect.Effect-1.md)\<infer \_R, infer X, infer \_A\>  } ? `X` : `never`, `O` extends \{ `schedule`: `Schedule.Schedule`\<infer \_R, infer \_I, infer Out\>  } ? `Out` : `O` extends \{ `until`: [`Refinement`](../interfaces/.Refinement.md)\<`A`, infer B\>  } ? `B` : `A`\> extends infer Z ? `Z` : `never`

**`Since`**

2.0.0

#### Type parameters

| Name | Type |
| :------ | :------ |
| `R` | `R` |
| `E` | `E` |
| `A` | `A` |
| `O` | extends [`Options`](../interfaces/Effect.Repeat.Options.md)\<`A`\> |
