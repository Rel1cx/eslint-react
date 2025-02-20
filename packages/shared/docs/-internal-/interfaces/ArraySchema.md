[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ArraySchema

# Interface: ArraySchema\<TItem, TMessage\>

Array schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TItem`\>[], [`InferOutput`](../type-aliases/InferOutput.md)\<`TItem`\>[], [`ArrayIssue`](ArrayIssue.md) \| [`InferIssue`](../type-aliases/InferIssue.md)\<`TItem`\>\>

## Type Parameters

• **TItem** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

• **TMessage** *extends* [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ArrayIssue`](ArrayIssue.md)\> \| `undefined`

## Properties

### async

> `readonly` **async**: `false`

Whether it's async.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`async`](BaseSchema.md#async)

***

### expects

> `readonly` **expects**: `"Array"`

The expected property.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`expects`](BaseSchema.md#expects)

***

### item

> `readonly` **item**: `TItem`

The array item schema.

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

> `readonly` **reference**: \<`TItem`\>(`item`) => [`ArraySchema`](ArraySchema.md)\<`TItem`, `undefined`\>\<`TItem`, `TMessage`\>(`item`, `message`) => [`ArraySchema`](ArraySchema.md)\<`TItem`, `TMessage`\>

The schema reference.

Creates an array schema.

#### Type Parameters

• **TItem** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### item

`TItem`

The item schema.

#### Returns

[`ArraySchema`](ArraySchema.md)\<`TItem`, `undefined`\>

An array schema.

Creates an array schema.

#### Type Parameters

• **TItem** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

• **TMessage** *extends* `undefined` \| [`ErrorMessage`](../type-aliases/ErrorMessage.md)\<[`ArrayIssue`](ArrayIssue.md)\>

#### Parameters

##### item

`TItem`

The item schema.

##### message

`TMessage`

The error message.

#### Returns

[`ArraySchema`](ArraySchema.md)\<`TItem`, `TMessage`\>

An array schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"array"`

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)
