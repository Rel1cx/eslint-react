[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / SchemaWithFallback

# Type Alias: SchemaWithFallback\<TSchema, TFallback\>

> **SchemaWithFallback**\<`TSchema`, `TFallback`\> = `TSchema` & `object`

Schema with fallback type.

## Type declaration

### fallback

> `readonly` **fallback**: `TFallback`

The fallback value.

## Type Parameters

### TSchema

`TSchema` *extends* [`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>

### TFallback

`TFallback` *extends* [`Fallback`](Fallback.md)\<`TSchema`\>
