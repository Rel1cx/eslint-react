[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / NullishSchemaAsync

# Interface: NullishSchemaAsync\<TWrapped, TDefault\>

Nullish schema async interface.

## Extends

- [`BaseSchemaAsync`](BaseSchemaAsync.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped`\> \| `null` \| `undefined`, [`InferNullishOutput`](../type-aliases/InferNullishOutput.md)\<`TWrapped`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped`\>\>

## Type Parameters

### TWrapped

`TWrapped` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TDefault

`TDefault` *extends* [`DefaultAsync`](../type-aliases/DefaultAsync.md)\<`TWrapped`, `null` \| `undefined`\>

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

> `readonly` **expects**: \`($\{TWrapped\["expects"\]\} \| null \| undefined)\`

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

> `readonly` **reference**: \<`TWrapped`\>(`wrapped`) => [`NullishSchema`](NullishSchema.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`NullishSchema`](NullishSchema.md)\<`TWrapped`, `TDefault`\> \| \<`TWrapped`\>(`wrapped`) => `NullishSchemaAsync`\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => `NullishSchemaAsync`\<`TWrapped`, `TDefault`\>

The schema reference.

#### Type declaration

\<`TWrapped`\>(`wrapped`) => [`NullishSchema`](NullishSchema.md)\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => [`NullishSchema`](NullishSchema.md)\<`TWrapped`, `TDefault`\>

Creates a nullish schema.

#### Type Parameters

##### TWrapped

`TWrapped` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

#### Returns

[`NullishSchema`](NullishSchema.md)\<`TWrapped`, `undefined`\>

A nullish schema.

Creates a nullish schema.

#### Type Parameters

##### TWrapped

`TWrapped` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### TDefault

`TDefault` *extends* `unknown`

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

\<`TWrapped`\>(`wrapped`) => `NullishSchemaAsync`\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => `NullishSchemaAsync`\<`TWrapped`, `TDefault`\>

Creates a nullish schema.

#### Type Parameters

##### TWrapped

`TWrapped` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

#### Returns

`NullishSchemaAsync`\<`TWrapped`, `undefined`\>

A nullish schema.

Creates a nullish schema.

#### Type Parameters

##### TWrapped

`TWrapped` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

##### TDefault

`TDefault` *extends* `unknown`

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

##### default\_

`TDefault`

The default value.

#### Returns

`NullishSchemaAsync`\<`TWrapped`, `TDefault`\>

A nullish schema.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`reference`](BaseSchemaAsync.md#reference)

***

### type

> `readonly` **type**: `"nullish"`

The schema type.

#### Overrides

[`BaseSchemaAsync`](BaseSchemaAsync.md).[`type`](BaseSchemaAsync.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped`

The wrapped schema.
