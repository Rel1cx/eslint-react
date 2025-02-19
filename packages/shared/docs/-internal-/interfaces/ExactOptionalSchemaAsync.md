[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ExactOptionalSchemaAsync

# Interface: ExactOptionalSchemaAsync\<TWrapped, TDefault\>

Exact optional schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped`\>, [`InferOutput`](../type-aliases/InferOutput.md)\<`TWrapped`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped`\>\>

## Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

• **TDefault** *extends* [`DefaultAsync`](../type-aliases/DefaultAsync.md)\<`TWrapped`, `never`\>

## Properties

### async

> `readonly` **async**: `true`

Whether it's async.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`async`](BaseSchemaAsync.md#async)

***

### default

> `readonly` **default**: `TDefault`

The default value.

***

### expects

> `readonly` **expects**: `TWrapped`\[`"expects"`\]

The expected property.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`expects`](BaseSchemaAsync.md#expects)

***

### kind

> `readonly` **kind**: `"schema"`

The object kind.

#### Inherited from

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`kind`](BaseSchemaAsync.md#kind)

***

### reference

> `readonly` **reference**: \<`TWrapped`\>(`wrapped`) => [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped`, `TDefault`\> \| \<`TWrapped`\>(`wrapped`) => [`ExactOptionalSchemaAsync`](ExactOptionalSchemaAsync.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`ExactOptionalSchemaAsync`](ExactOptionalSchemaAsync.md)\<`TWrapped`, `TDefault`\>

The schema reference.

#### Type declaration

\<`TWrapped`\>(`wrapped`) => [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`ExactOptionalSchema`](ExactOptionalSchema.md)\<`TWrapped`, `TDefault`\>

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

\<`TWrapped`\>(`wrapped`) => [`ExactOptionalSchemaAsync`](ExactOptionalSchemaAsync.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`ExactOptionalSchemaAsync`](ExactOptionalSchemaAsync.md)\<`TWrapped`, `TDefault`\>

Creates an exact optional schema.

#### Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

#### Returns

[`ExactOptionalSchemaAsync`](ExactOptionalSchemaAsync.md)\<`TWrapped`, `undefined`\>

An exact optional schema.

Creates an exact optional schema.

#### Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

• **TDefault** *extends* `unknown`

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

##### default\_

`TDefault`

The default value.

#### Returns

[`ExactOptionalSchemaAsync`](ExactOptionalSchemaAsync.md)\<`TWrapped`, `TDefault`\>

An exact optional schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"exact_optional"`

The schema type.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`type`](BaseSchemaAsync.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped`

The wrapped schema.
