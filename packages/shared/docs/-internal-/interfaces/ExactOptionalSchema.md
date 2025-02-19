[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ExactOptionalSchema

# Interface: ExactOptionalSchema\<TWrapped, TDefault\>

Exact optional schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped`\>\>

## Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

• **TDefault** *extends* [`Default`](../type-aliases/Default.md)\<`TWrapped`, `never`\>

## Properties

### async

> `readonly` **async**: `false`

Whether it's async.

#### Inherited from

[`BaseSchema`](BaseSchema.md).[`async`](BaseSchema.md#async)

***

### default

> `readonly` **default**: `TDefault`

The default value.

***

### expects

> `readonly` **expects**: `TWrapped`\[`"expects"`\]

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

### reference()

> `readonly` **reference**: \<`TWrapped`\>(`wrapped`) => [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped`, `TDefault`\>

The schema reference.

Creates an exact optional schema.

#### Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

#### Returns

[`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped`, `undefined`\>

An exact optional schema.

Creates an exact optional schema.

#### Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

• **TDefault** *extends* `unknown`

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

##### default\_

`TDefault`

The default value.

#### Returns

[`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped`, `TDefault`\>

An exact optional schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"exact_optional"`

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped`

The wrapped schema.
