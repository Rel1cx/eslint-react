[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / LiteralSchema

# Interface: LiteralSchema\<TLiteral, TMessage\>

Literal schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`TLiteral`, `TLiteral`, [`LiteralIssue`](LiteralIssue.md)\>

## Type Parameters

### TLiteral

`TLiteral` *extends* [`Literal`](../type-aliases/Literal.md)

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LiteralIssue`](LiteralIssue.md)\> \| `undefined`

## Properties

### async

> `readonly` **async**: `false`

Whether it's async.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`async`](BaseSchema.md#async)

***

### expects

> `readonly` **expects**: `string`

The expected property.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### kind

> `readonly` **kind**: `"schema"`

The object kind.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`kind`](BaseSchema.md#kind)

***

### literal

> `readonly` **literal**: `TLiteral`

The literal value.

***

### message

> `readonly` **message**: `TMessage`

The error message.

***

### reference()

> `readonly` **reference**: \<`TLiteral`\>(`literal_`) => `LiteralSchema`\<`TLiteral`, `undefined`\>\<`TLiteral`, `TMessage`\>(`literal_`, `message`) => `LiteralSchema`\<`TLiteral`, `TMessage`\>

The schema reference.

Creates a literal schema.

#### Type Parameters

##### TLiteral

`TLiteral` *extends* [`Literal`](../type-aliases/Literal.md)

#### Parameters

##### literal\_

`TLiteral`

The literal value.

#### Returns

`LiteralSchema`\<`TLiteral`, `undefined`\>

A literal schema.

Creates a literal schema.

#### Type Parameters

##### TLiteral

`TLiteral` *extends* [`Literal`](../type-aliases/Literal.md)

##### TMessage

`TMessage` *extends* `undefined` \| [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`LiteralIssue`](LiteralIssue.md)\>

#### Parameters

##### literal\_

`TLiteral`

The literal value.

##### message

`TMessage`

The error message.

#### Returns

`LiteralSchema`\<`TLiteral`, `TMessage`\>

A literal schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"literal"`

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
