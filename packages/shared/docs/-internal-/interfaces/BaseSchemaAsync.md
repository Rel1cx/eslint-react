[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / BaseSchemaAsync

# Interface: BaseSchemaAsync\<TInput, TOutput, TIssue\>

Base schema async interface.

## Extends

- [`Omit`](../type-aliases/Omit.md)\<[`BaseSchema`](BaseSchema.md)\<`TInput`, `TOutput`, `TIssue`\>, `"reference"` \| `"async"` \| `"~run"`\>

## Extended by

- [`ExactOptionalSchemaAsync`](ExactOptionalSchemaAsync.md)
- [`NullishSchemaAsync`](NullishSchemaAsync.md)
- [`OptionalSchemaAsync`](OptionalSchemaAsync.md)

## Type Parameters

• **TInput**

• **TOutput**

• **TIssue** *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### async

> `readonly` **async**: `true`

Whether it's async.

***

### expects

> `readonly` **expects**: `string`

The expected property.

#### Inherited from

`Omit.expects`

***

### kind

> `readonly` **kind**: `"schema"`

The object kind.

#### Inherited from

`Omit.kind`

***

### reference()

> `readonly` **reference**: (...`args`) => [`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The schema reference.

#### Parameters

##### args

...`any`[]

#### Returns

[`BaseSchema`](BaseSchema.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseSchemaAsync`](BaseSchemaAsync.md)\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

The schema type.

#### Inherited from

`Omit.type`
