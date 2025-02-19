[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / SuggestionReportDescriptor

# Interface: SuggestionReportDescriptor\<MessageIds\>

Construct a type with the properties of T except for those in type K.

## Extends

- [`Omit`](../type-aliases/Omit.md)\<[`ReportDescriptorBase`](ReportDescriptorBase.md)\<`MessageIds`\>, `"fix"`\>

## Type Parameters

• **MessageIds** *extends* `string`

## Properties

### data?

> `readonly` `optional` **data**: [`Readonly`](../type-aliases/Readonly.md)\<[`Record`](../type-aliases/Record.md)\<`string`, `unknown`\>\>

The parameters for the message string associated with `messageId`.

#### Inherited from

`Omit.data`

***

### fix

> `readonly` **fix**: [`ReportFixFunction`](../type-aliases/ReportFixFunction.md)

***

### messageId

> `readonly` **messageId**: `MessageIds`

The messageId which is being reported.

#### Inherited from

`Omit.messageId`
