[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / ReportDescriptorBase

# Interface: ReportDescriptorBase\<MessageIds\>

## Extended by

- [`ReportDescriptorWithSuggestion`](ReportDescriptorWithSuggestion.md)

## Type Parameters

• **MessageIds** *extends* `string`

## Properties

### data?

> `readonly` `optional` **data**: [`Readonly`](../type-aliases/Readonly.md)\<[`Record`](../type-aliases/Record.md)\<`string`, `unknown`\>\>

The parameters for the message string associated with `messageId`.

***

### fix?

> `readonly` `optional` **fix**: `null` \| [`ReportFixFunction`](../type-aliases/ReportFixFunction.md)

The fixer function.

***

### messageId

> `readonly` **messageId**: `MessageIds`

The messageId which is being reported.
