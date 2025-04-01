[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / ReadonlyAction

# Interface: ReadonlyAction\<TInput\>

Readonly action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput`, [`ReadonlyOutput`](../type-aliases/ReadonlyOutput.md)\<`TInput`\>, `never`\>

## Type Parameters

### TInput

`TInput`

## Properties

### async

> `readonly` **async**: `false`

Whether it's async.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`async`](BaseTransformation.md#async)

***

### kind

> `readonly` **kind**: `"transformation"`

The object kind.

#### Inherited from

[`BaseTransformation`](BaseTransformation.md).[`kind`](BaseTransformation.md#kind)

***

### reference()

> `readonly` **reference**: \<`TInput`\>() => `ReadonlyAction`\<`TInput`\>

The action reference.

Creates a readonly transformation action.

#### Type Parameters

##### TInput

`TInput`

#### Returns

`ReadonlyAction`\<`TInput`\>

A readonly action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"readonly"`

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
