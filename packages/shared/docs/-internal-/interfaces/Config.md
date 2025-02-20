[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / Config

# Interface: Config\<TIssue\>

Config interface.

## Extended by

- [`BaseIssue`](BaseIssue.md)

## Type Parameters

• **TIssue** *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### abortEarly?

> `readonly` `optional` **abortEarly**: `boolean`

Whether it should be aborted early.

***

### abortPipeEarly?

> `readonly` `optional` **abortPipeEarly**: `boolean`

Whether a pipe should be aborted early.

***

### lang?

> `readonly` `optional` **lang**: `string`

The selected language.

***

### message?

> `readonly` `optional` **message**: [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<`TIssue`\>

The error message.
