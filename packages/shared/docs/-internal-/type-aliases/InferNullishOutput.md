[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / InferNullishOutput

# Type Alias: InferNullishOutput\<TWrapped, TDefault\>

> **InferNullishOutput**\<`TWrapped`, `TDefault`\>: `undefined` *extends* `TDefault` ? [`InferOutput`](InferOutput.md)\<`TWrapped`\> \| `null` \| `undefined` : [`InferOutput`](InferOutput.md)\<`TWrapped`\> \| [`Extract`](Extract.md)\<[`DefaultValue`](DefaultValue.md)\<`TDefault`\>, `null` \| `undefined`\>

Infer nullish output type.

## Type Parameters

• **TWrapped** *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

• **TDefault** *extends* [`DefaultAsync`](DefaultAsync.md)\<`TWrapped`, `null` \| `undefined`\>
