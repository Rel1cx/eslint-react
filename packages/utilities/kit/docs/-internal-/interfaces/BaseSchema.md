[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / BaseSchema

# Interface: BaseSchema\<TInput, TOutput, TIssue\>

Base schema interface.

## Extended by

- [`ObjectSchema`](ObjectSchema.md)
- [`OptionalSchema`](OptionalSchema.md)
- [`BooleanSchema`](BooleanSchema.md)
- [`UnionSchema`](UnionSchema.md)
- [`LiteralSchema`](LiteralSchema.md)
- [`NumberSchema`](NumberSchema.md)
- [`ExactOptionalSchema`](ExactOptionalSchema.md)
- [`NullishSchema`](NullishSchema.md)

## Type Parameters

### TInput

`TInput`

### TOutput

`TOutput`

### TIssue

`TIssue` *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### async

> `readonly` **async**: `false`

Whether it's async.

***

### expects

> `readonly` **expects**: `string`

The expected property.

***

### kind

> `readonly` **kind**: `"schema"`

The object kind.

***

### reference()

> `readonly` **reference**: (...`args`) => `BaseSchema`\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The schema reference.

#### Parameters

##### args

...`any`[]

#### Returns

`BaseSchema`\<`unknown`, `unknown`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

The schema type.
