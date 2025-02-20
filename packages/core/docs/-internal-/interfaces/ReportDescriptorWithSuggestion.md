[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ReportDescriptorWithSuggestion

# Interface: ReportDescriptorWithSuggestion\<MessageIds\>

## Extends

- [`ReportDescriptorBase`](ReportDescriptorBase.md)\<`MessageIds`\>

## Type Parameters

• **MessageIds** *extends* `string`

## Properties

### data?

> `readonly` `optional` **data**: [`Readonly`](../type-aliases/Readonly.md)\<[`Record`](../type-aliases/Record.md)\<`string`, `unknown`\>\>

The parameters for the message string associated with `messageId`.

#### Inherited from

[`ReportDescriptorBase`](ReportDescriptorBase.md).[`data`](ReportDescriptorBase.md#data)

***

### fix?

> `readonly` `optional` **fix**: `null` \| [`ReportFixFunction`](../type-aliases/ReportFixFunction.md)

The fixer function.

#### Inherited from

[`ReportDescriptorBase`](ReportDescriptorBase.md).[`fix`](ReportDescriptorBase.md#fix)

***

### messageId

> `readonly` **messageId**: `MessageIds`

The messageId which is being reported.

#### Inherited from

[`ReportDescriptorBase`](ReportDescriptorBase.md).[`messageId`](ReportDescriptorBase.md#messageid)

***

### suggest?

> `readonly` `optional` **suggest**: `null` \| readonly [`SuggestionReportDescriptor`](SuggestionReportDescriptor.md)\<`MessageIds`\>[]

6.7's Suggestions API
