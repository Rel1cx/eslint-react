[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / OptionalSchemaAsync

# Interface: OptionalSchemaAsync\<TWrapped, TDefault\>

Optional schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped`\> \| `undefined`, [`InferOptionalOutput`](../type-aliases/InferOptionalOutput.md)\<`TWrapped`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped`\>\>

## Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

• **TDefault** *extends* [`DefaultAsync`](../type-aliases/DefaultAsync.md)\<`TWrapped`, `undefined`\>

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

> `readonly` **expects**: \`($\{TWrapped\["expects"\]\} \| undefined)\`

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

> `readonly` **reference**: \<`TWrapped`\>(`wrapped`) => [`OptionalSchema`](OptionalSchema.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`OptionalSchema`](OptionalSchema.md)\<`TWrapped`, `TDefault`\> \| \<`TWrapped`\>(`wrapped`) => [`OptionalSchemaAsync`](OptionalSchemaAsync.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`OptionalSchemaAsync`](OptionalSchemaAsync.md)\<`TWrapped`, `TDefault`\>

The schema reference.

#### Type declaration

\<`TWrapped`\>(`wrapped`) => [`OptionalSchema`](OptionalSchema.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`OptionalSchema`](OptionalSchema.md)\<`TWrapped`, `TDefault`\>

Creates an optional schema.

#### Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

#### Returns

[`OptionalSchema`](OptionalSchema.md)\<`TWrapped`, `undefined`\>

An optional schema.

Creates an optional schema.

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

[`OptionalSchema`](OptionalSchema.md)\<`TWrapped`, `TDefault`\>

An optional schema.

\<`TWrapped`\>(`wrapped`) => [`OptionalSchemaAsync`](OptionalSchemaAsync.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`OptionalSchemaAsync`](OptionalSchemaAsync.md)\<`TWrapped`, `TDefault`\>

Creates an optional schema.

#### Type Parameters

• **TWrapped** *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

#### Returns

[`OptionalSchemaAsync`](OptionalSchemaAsync.md)\<`TWrapped`, `undefined`\>

An optional schema.

Creates an optional schema.

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

[`OptionalSchemaAsync`](OptionalSchemaAsync.md)\<`TWrapped`, `TDefault`\>

An optional schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"optional"`

The schema type.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`type`](BaseSchemaAsync.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped`

The wrapped schema.
