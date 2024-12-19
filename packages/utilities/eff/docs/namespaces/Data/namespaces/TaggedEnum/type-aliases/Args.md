[**@eslint-react/tools**](../../../../../README.md)

***

[@eslint-react/tools](../../../../../README.md) / [Data](../../../README.md) / [TaggedEnum](../README.md) / Args

# Type Alias: Args\<A, K, E\>

> **Args**\<`A`, `K`, `E`\>: `{ readonly [K in keyof E as K extends "_tag" ? never : K]: E[K] }` *extends* infer T ? `object` *extends* `T` ? `void` : `T` : `never`

## Type Parameters

• **A** *extends* `object`

• **K** *extends* `A`\[`"_tag"`\]

• **E** = `Extract`\<`A`, \{ `_tag`: `K`; \}\>

## Since

2.0.0
