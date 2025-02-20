[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / BaseIssue

# Interface: BaseIssue\<TInput\>

Base issue interface.

## Extends

- [`Config`](Config.md)\<[`BaseIssue`](BaseIssue.md)\<`TInput`\>\>

## Extended by

- [`ObjectIssue`](ObjectIssue.md)
- [`StringIssue`](StringIssue.md)
- [`BooleanIssue`](BooleanIssue.md)
- [`ArrayIssue`](ArrayIssue.md)

## Type Parameters

• **TInput**

## Properties

### abortEarly?

> `readonly` `optional` **abortEarly**: `boolean`

Whether it should be aborted early.

#### Inherited from

[`Config`](Config.md).[`abortEarly`](Config.md#abortearly)

***

### abortPipeEarly?

> `readonly` `optional` **abortPipeEarly**: `boolean`

Whether a pipe should be aborted early.

#### Inherited from

[`Config`](Config.md).[`abortPipeEarly`](Config.md#abortpipeearly)

***

### expected

> `readonly` **expected**: `null` \| `string`

The expected property.

***

### input

> `readonly` **input**: `TInput`

The raw input data.

***

### issues?

> `readonly` `optional` **issues**: \[[`BaseIssue`](BaseIssue.md)\<`TInput`\>, `...BaseIssue<TInput>[]`\]

The sub issues.

***

### kind

> `readonly` **kind**: `"schema"` \| `"validation"` \| `"transformation"`

The issue kind.

***

### lang?

> `readonly` `optional` **lang**: `string`

The selected language.

#### Inherited from

[`Config`](Config.md).[`lang`](Config.md#lang)

***

### message

> `readonly` **message**: `string`

The error message.

#### Overrides

[`Config`](Config.md).[`message`](Config.md#message)

***

### path?

> `readonly` `optional` **path**: \[[`IssuePathItem`](../type-aliases/IssuePathItem.md), `...IssuePathItem[]`\]

The issue path.

***

### received

> `readonly` **received**: `string`

The received property.

***

### requirement?

> `readonly` `optional` **requirement**: `unknown`

The input requirement.

***

### type

> `readonly` **type**: `string`

The issue type.
