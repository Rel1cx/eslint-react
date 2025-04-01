[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / SchemaWithFallbackAsync

# Type Alias: SchemaWithFallbackAsync\<TSchema, TFallback\>

> **SchemaWithFallbackAsync**\<`TSchema`, `TFallback`\> = [`Omit`](Omit.md)\<`TSchema`, `"async"` \| `"~standard"` \| `"~run"`\> & `object`

Schema with fallback async type.

## Type declaration

### async

> `readonly` **async**: `true`

Whether it's async.

### fallback

> `readonly` **fallback**: `TFallback`

The fallback value.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### TFallback

`TFallback` *extends* [`FallbackAsync`](FallbackAsync.md)\<`TSchema`\>
