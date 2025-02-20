[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / BaseTransformationAsync

# Interface: BaseTransformationAsync\<TInput, TOutput, TIssue\>

Base transformation async interface.

## Extends

- [`Omit`](../type-aliases/Omit.md)\<[`BaseTransformation`](BaseTransformation.md)\<`TInput`, `TOutput`, `TIssue`\>, `"reference"` \| `"async"` \| `"~run"`\>

## Type Parameters

• **TInput**

• **TOutput**

• **TIssue** *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### async

> `readonly` **async**: `true`

Whether it's async.

***

### kind

> `readonly` **kind**: `"transformation"`

The object kind.

#### Inherited from

`Omit.kind`

***

### reference()

> `readonly` **reference**: (...`args`) => [`BaseTransformation`](BaseTransformation.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseTransformationAsync`](BaseTransformationAsync.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The transformation reference.

#### Parameters

##### args

...`any`[]

#### Returns

[`BaseTransformation`](BaseTransformation.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseTransformationAsync`](BaseTransformationAsync.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

The transformation type.

#### Inherited from

`Omit.type`
