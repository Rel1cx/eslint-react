[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / NullishSchema

# Interface: NullishSchema\<TWrapped, TDefault\>

Nullish schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped`\> \| `null` \| `undefined`, [`InferNullishOutput`](../type-aliases/InferNullishOutput.md)\<`TWrapped`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped`\>\>

## Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

• **TDefault** *extends* [`Default`](../type-aliases/Default.md)\<`TWrapped`, `null` \| `undefined`\>

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

> `readonly` **expects**: \`($\{TWrapped\["expects"\]\} \| null \| undefined)\`

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

> `readonly` **reference**: \<`TWrapped`\>(`wrapped`) => [`NullishSchema`](NullishSchema.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`NullishSchema`](NullishSchema.md)\<`TWrapped`, `TDefault`\>

The schema reference.

Creates a nullish schema.

#### Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

#### Returns

[`NullishSchema`](NullishSchema.md)\<`TWrapped`, `undefined`\>

A nullish schema.

Creates a nullish schema.

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

[`NullishSchema`](NullishSchema.md)\<`TWrapped`, `TDefault`\>

A nullish schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"nullish"`

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped`

The wrapped schema.
