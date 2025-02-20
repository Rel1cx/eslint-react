[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ObjectSchema

# Interface: ObjectSchema\<TEntries, TMessage\>

Object schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<[`InferObjectInput`](../type-aliases/InferObjectInput.md)\<`TEntries`\>, [`InferObjectOutput`](../type-aliases/InferObjectOutput.md)\<`TEntries`\>, [`ObjectIssue`](ObjectIssue.md) \| [`InferObjectIssue`](../type-aliases/InferObjectIssue.md)\<`TEntries`\>\>

## Type Parameters

• **TEntries** *extends* [`ObjectEntries`](ObjectEntries.md)

• **TMessage** *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectIssue`](ObjectIssue.md)\> \| `undefined`

## Properties

### async

> `readonly` **async**: `false`

Whether it's async.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`async`](BaseSchema.md#async)

***

### entries

> `readonly` **entries**: `TEntries`

The entries schema.

***

### expects

> `readonly` **expects**: `"Object"`

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

> `readonly` **reference**: \<`TEntries`\>(`entries`) => [`ObjectSchema`](ObjectSchema.md)\<`TEntries`, `undefined`\>\<`TEntries`, `TMessage`\>(`entries`, `message`) => [`ObjectSchema`](ObjectSchema.md)\<`TEntries`, `TMessage`\>

The schema reference.

Creates an object schema.

Hint: This schema removes unknown entries. The output will only include the
entries you specify. To include unknown entries, use `looseObject`. To
return an issue for unknown entries, use `strictObject`. To include and
validate unknown entries, use `objectWithRest`.

#### Type Parameters

• **TEntries** *extends* [`ObjectEntries`](ObjectEntries.md)

#### Parameters

##### entries

`TEntries`

The entries schema.

#### Returns

[`ObjectSchema`](ObjectSchema.md)\<`TEntries`, `undefined`\>

An object schema.

Creates an object schema.

Hint: This schema removes unknown entries. The output will only include the
entries you specify. To include unknown entries, use `looseObject`. To
return an issue for unknown entries, use `strictObject`. To include and
validate unknown entries, use `objectWithRest`.

#### Type Parameters

• **TEntries** *extends* [`ObjectEntries`](ObjectEntries.md)

• **TMessage** *extends* `undefined` \| [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ObjectIssue`](ObjectIssue.md)\>

#### Parameters

##### entries

`TEntries`

The entries schema.

##### message

`TMessage`

The error message.

#### Returns

[`ObjectSchema`](ObjectSchema.md)\<`TEntries`, `TMessage`\>

An object schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"object"`

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
