[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / DefaultValue

# Type Alias: DefaultValue\<TDefault\>

> **DefaultValue**\<`TDefault`\>: `TDefault` *extends* [`DefaultAsync`](DefaultAsync.md)\<infer TWrapped, infer TInput\> ? `TDefault` *extends* (`dataset`?, `config`?) => [`MaybePromise`](MaybePromise.md)\<[`InferInput`](InferInput.md)\<`TWrapped`\> \| `TInput`\> ? [`Awaited`](Awaited.md)\<[`ReturnType`](ReturnType.md)\<`TDefault`\>\> : `TDefault` : `never`

Default value type.

## Type Parameters

• **TDefault** *extends* [`Default`](Default.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `null` \| `undefined`\> \| [`DefaultAsync`](DefaultAsync.md)\<[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `null` \| `undefined`\>
