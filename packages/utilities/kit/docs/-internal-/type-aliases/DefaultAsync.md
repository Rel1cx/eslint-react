[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / DefaultAsync

# Type Alias: DefaultAsync\<TWrapped, TInput\>

> **DefaultAsync**\<`TWrapped`, `TInput`\> = [`MaybeReadonly`](MaybeReadonly.md)\<[`InferInput`](InferInput.md)\<`TWrapped`\> \| `TInput`\> \| (`dataset`?, `config`?) => [`MaybePromise`](MaybePromise.md)\<[`MaybeReadonly`](MaybeReadonly.md)\<[`InferInput`](InferInput.md)\<`TWrapped`\> \| `TInput`\>\> \| `undefined`

Default async type.

## Type Parameters

### TWrapped

`TWrapped` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### TInput

`TInput` *extends* `null` \| `undefined`
