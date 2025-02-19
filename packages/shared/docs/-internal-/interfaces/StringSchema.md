[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / StringSchema

# Interface: StringSchema\<TMessage\>

String schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`string`, `string`, [`StringIssue`](StringIssue.md)\>

## Type Parameters

• **TMessage** *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StringIssue`](StringIssue.md)\> \| `undefined`

## Properties

### async

> `readonly` **async**: `false`

Whether it's async.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`async`](BaseSchema.md#async)

***

### expects

> `readonly` **expects**: `"string"`

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### kind

> `readonly` **kind**: `"schema"`

The object kind.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`kind`](BaseSchema.md#kind)

***

### message

> `readonly` **message**: `TMessage`

The error message.

***

### reference()

> `readonly` **reference**: () => [`StringSchema`](StringSchema.md)\<`undefined`\>\<`TMessage`\>(`message`) => [`StringSchema`](StringSchema.md)\<`TMessage`\>

The schema reference.

Creates a string schema.

#### Returns

[`StringSchema`](StringSchema.md)\<`undefined`\>

A string schema.

Creates a string schema.

#### Type Parameters

• **TMessage** *extends* `undefined` \| [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`StringIssue`](StringIssue.md)\>

#### Parameters

##### message

`TMessage`

The error message.

#### Returns

[`StringSchema`](StringSchema.md)\<`TMessage`\>

A string schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"string"`

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
