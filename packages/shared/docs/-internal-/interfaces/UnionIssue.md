[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / UnionIssue

# Interface: UnionIssue\<TSubIssue\>

Union issue interface.

## Extends

- [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Type Parameters

### TSubIssue

`TSubIssue` *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### abortEarly?

> `readonly` `optional` **abortEarly**: `boolean`

Whether it should be aborted early.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`abortEarly`](BaseIssue.md#abortearly)

***

### abortPipeEarly?

> `readonly` `optional` **abortPipeEarly**: `boolean`

Whether a pipe should be aborted early.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`abortPipeEarly`](BaseIssue.md#abortpipeearly)

***

### expected

> `readonly` **expected**: `string`

The expected property.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`expected`](BaseIssue.md#expected)

***

### input

> `readonly` **input**: `unknown`

The raw input data.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`input`](BaseIssue.md#input)

***

### issues?

> `readonly` `optional` **issues**: \[`TSubIssue`, `...TSubIssue[]`\]

The sub issues.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`issues`](BaseIssue.md#issues)

***

### kind

> `readonly` **kind**: `"schema"`

The issue kind.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`kind`](BaseIssue.md#kind)

***

### lang?

> `readonly` `optional` **lang**: `string`

The selected language.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`lang`](BaseIssue.md#lang)

***

### message

> `readonly` **message**: `string`

The error message.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`message`](BaseIssue.md#message)

***

### path?

> `readonly` `optional` **path**: \[[`IssuePathItem`](../type-aliases/IssuePathItem.md), `...IssuePathItem[]`\]

The issue path.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`path`](BaseIssue.md#path)

***

### received

> `readonly` **received**: `string`

The received property.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`received`](BaseIssue.md#received)

***

### requirement?

> `readonly` `optional` **requirement**: `unknown`

The input requirement.

#### Inherited from

[`BaseIssue`](BaseIssue.md).[`requirement`](BaseIssue.md#requirement)

***

### type

> `readonly` **type**: `"union"`

The issue type.

#### Overrides

[`BaseIssue`](BaseIssue.md).[`type`](BaseIssue.md#type)
