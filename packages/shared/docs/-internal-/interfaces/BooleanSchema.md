[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / BooleanSchema

# Interface: BooleanSchema\<TMessage\>

Boolean schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`boolean`, `boolean`, [`BooleanIssue`](BooleanIssue.md)\>

## Type Parameters

• **TMessage** *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`BooleanIssue`](BooleanIssue.md)\> \| `undefined`

## Properties

### async

> `readonly` **async**: `false`

Whether it's async.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`async`](BaseSchema.md#async)

***

### expects

> `readonly` **expects**: `"boolean"`

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

> `readonly` **reference**: () => [`BooleanSchema`](BooleanSchema.md)\<`undefined`\>\<`TMessage`\>(`message`) => [`BooleanSchema`](BooleanSchema.md)\<`TMessage`\>

The schema reference.

Creates a boolean schema.

#### Returns

[`BooleanSchema`](BooleanSchema.md)\<`undefined`\>

A boolean schema.

Creates a boolean schema.

#### Type Parameters

• **TMessage** *extends* `undefined` \| [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`BooleanIssue`](BooleanIssue.md)\>

#### Parameters

##### message

`TMessage`

The error message.

#### Returns

[`BooleanSchema`](BooleanSchema.md)\<`TMessage`\>

A boolean schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"boolean"`

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
