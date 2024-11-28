[**@eslint-react/tools**](../../README.md)

***

[@eslint-react/tools](../../README.md) / [./Either.js](../README.md) / gen

# Function: gen()

> **gen**\<`Self`, `K`, `A`\>(...`args`): [`Either`](../type-aliases/Either.md)\<`A`, [`K`] *extends* [`Variance`\<[`EitherTypeLambda`](../interfaces/EitherTypeLambda.md), `any`, `any`, `E`\>] ? `E` : [`K`] *extends* [`YieldWrap`\<[`Either`](../type-aliases/Either.md)\<`any`, `E`\>\>] ? `E` : `never`\>

## Type Parameters

• **Self**

• **K** *extends* `Variance`\<[`EitherTypeLambda`](../interfaces/EitherTypeLambda.md), `any`, `any`, `any`\> \| `YieldWrap`\<[`Either`](../type-aliases/Either.md)\<`any`, `any`\>\>

• **A**

## Parameters

### args

[`Self`, (`this`, `resume`) => `Generator`\<`K`, `A`, `never`\>] | [(`resume`) => `Generator`\<`K`, `A`, `never`\>]

## Returns

[`Either`](../type-aliases/Either.md)\<`A`, [`K`] *extends* [`Variance`\<[`EitherTypeLambda`](../interfaces/EitherTypeLambda.md), `any`, `any`, `E`\>] ? `E` : [`K`] *extends* [`YieldWrap`\<[`Either`](../type-aliases/Either.md)\<`any`, `E`\>\>] ? `E` : `never`\>

## Since

2.0.0
