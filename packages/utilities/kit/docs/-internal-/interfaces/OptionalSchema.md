[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / OptionalSchema

# Interface: OptionalSchema\<TWrapped, TDefault\>

Optional schema interface.

## Extends

- [`BaseSchema`](BaseSchema.md)\<[`InferInput`](../type-aliases/InferInput.md)\<`TWrapped`\> \| `undefined`, [`InferOptionalOutput`](../type-aliases/InferOptionalOutput.md)\<`TWrapped`, `TDefault`\>, [`InferIssue`](../type-aliases/InferIssue.md)\<`TWrapped`\>\>

## Type Parameters

### TWrapped

`TWrapped` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

### TDefault

`TDefault` *extends* [`Default`](../type-aliases/Default.md)\<`TWrapped`, `undefined`\>

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

> `readonly` **expects**: \`($\{TWrapped\["expects"\]\} \| undefined)\`

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

> `readonly` **reference**: \<`TWrapped`\>(`wrapped`) => `OptionalSchema`\<`TWrapped`, `undefined`\>\<`TWrapped`, `TDefault`\>(`wrapped`, `default_`) => `OptionalSchema`\<`TWrapped`, `TDefault`\>

The schema reference.

Creates an optional schema.

#### Type Parameters

##### TWrapped

`TWrapped` *extends* [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

#### Parameters

##### wrapped

`TWrapped`

The wrapped schema.

#### Returns

`OptionalSchema`\<`TWrapped`, `undefined`\>

An optional schema.

Creates an optional schema.

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

`OptionalSchema`\<`TWrapped`, `TDefault`\>

An optional schema.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`reference`](BaseSchema.md#reference)

***

### type

> `readonly` **type**: `"optional"`

The schema type.

#### Overrides

[`BaseSchema`](BaseSchema.md).[`type`](BaseSchema.md#type)

***

### wrapped

> `readonly` **wrapped**: `TWrapped`

The wrapped schema.
