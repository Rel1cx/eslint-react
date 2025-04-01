[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / NumberSchema

# Interface: NumberSchema\<TMessage\>

Number schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<`number`, `number`, [`NumberIssue`](NumberIssue.md)\>

## Type Parameters

### TMessage

`TMessage` *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NumberIssue`](NumberIssue.md)\> \| `undefined`

## Properties

### async

> `readonly` **async**: `false`

Whether it's async.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`async`](BaseSchema.md#async)

***

### expects

> `readonly` **expects**: `"number"`

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

> `readonly` **reference**: () => `NumberSchema`\<`undefined`\>\<`TMessage`\>(`message`) => `NumberSchema`\<`TMessage`\>

The schema reference.

Creates a number schema.

#### Returns

`NumberSchema`\<`undefined`\>

A number schema.

Creates a number schema.

#### Type Parameters

##### TMessage

`TMessage` *extends* `undefined` \| [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`NumberIssue`](NumberIssue.md)\>

#### Parameters

##### message

`TMessage`

The error message.

#### Returns

`NumberSchema`\<`TMessage`\>

A number schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"number"`

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
