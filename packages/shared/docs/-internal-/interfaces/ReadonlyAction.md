[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ReadonlyAction

# Interface: ReadonlyAction\<TInput\>

Readonly action interface.

## Extends

- [`BaseTransformation`](BaseTransformation.md)\<`TInput`, [`Readonly`](../type-aliases/Readonly.md)\<`TInput`\>, `never`\>

## Type Parameters

• **TInput**

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

> `readonly` **reference**: \<`TInput`\>() => [`ReadonlyAction`](ReadonlyAction.md)\<`TInput`\>

The action reference.

Creates a readonly transformation action.

#### Type Parameters

• **TInput**

#### Returns

[`ReadonlyAction`](ReadonlyAction.md)\<`TInput`\>

A readonly action.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`reference`](BaseTransformation.md#reference)

***

### type

> `readonly` **type**: `"readonly"`

The action type.

#### Overrides

[`BaseTransformation`](BaseTransformation.md).[`type`](BaseTransformation.md#type)
