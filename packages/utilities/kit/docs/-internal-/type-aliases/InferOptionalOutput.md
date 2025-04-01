[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / InferOptionalOutput

# Type Alias: InferOptionalOutput\<TWrapped, TDefault\>

> **InferOptionalOutput**\<`TWrapped`, `TDefault`\> = `undefined` *extends* `TDefault` ? [`InferOutput`](InferOutput.md)\<`TWrapped`\> \| `undefined` : [`InferOutput`](InferOutput.md)\<`TWrapped`\> \| [`Extract`](Extract.md)\<[`DefaultValue`](DefaultValue.md)\<`TDefault`\>, `undefined`\>

Infer optional output type.

## Type Parameters

### TWrapped

`TWrapped` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### TDefault

`TDefault` *extends* [`DefaultAsync`](DefaultAsync.md)\<`TWrapped`, `undefined`\>
