[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / SchemaWithPipeAsync

# Type Alias: SchemaWithPipeAsync\<TPipe\>

> **SchemaWithPipeAsync**\<`TPipe`\>: [`Omit`](Omit.md)\<[`FirstTupleItem`](FirstTupleItem.md)\<`TPipe`\>, `"async"` \| `"~standard"` \| `"~run"` \| `"~types"`\> & `object`

Schema with pipe async type.

## Type declaration

### async

> `readonly` **async**: `true`

Whether it's async.

### pipe

> `readonly` **pipe**: `TPipe`

The pipe items.

## Type Parameters

• **TPipe** *extends* \[[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](../interfaces/BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, ...(PipeItem\<any, unknown, BaseIssue\<unknown\>\> \| PipeItemAsync\<any, unknown, BaseIssue\<unknown\>\>)\[\]\]
