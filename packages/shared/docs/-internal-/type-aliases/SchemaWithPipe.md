[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / SchemaWithPipe

# Type Alias: SchemaWithPipe\<TPipe\>

> **SchemaWithPipe**\<`TPipe`\> = [`Omit`](Omit.md)\<[`FirstTupleItem`](FirstTupleItem.md)\<`TPipe`\>, `"~standard"` \| `"~run"` \| `"~types"`\> & `object`

Schema with pipe type.

## Type declaration

### pipe

> `readonly` **pipe**: `TPipe`

The pipe items.

## Type Parameters

### TPipe

`TPipe` *extends* readonly \[[`BaseSchema`](../interfaces/BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](../interfaces/BaseIssue.md)\<`unknown`\>\>, `...PipeItem<any, unknown, BaseIssue<unknown>>[]`\]
