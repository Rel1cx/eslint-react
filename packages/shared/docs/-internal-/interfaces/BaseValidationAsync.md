[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / BaseValidationAsync

# Interface: BaseValidationAsync\<TInput, TOutput, TIssue\>

Base validation async interface.

## Extends

- [`Omit`](../type-aliases/Omit.md)\<[`BaseValidation`](BaseValidation.md)\<`TInput`, `TOutput`, `TIssue`\>, `"reference"` \| `"async"` \| `"~run"`\>

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

> `readonly` **expects**: `null` \| `string`

The expected property.

#### Inherited from

`Omit.expects`

***

### kind

> `readonly` **kind**: `"validation"`

The object kind.

#### Inherited from

`Omit.kind`

***

### reference()

> `readonly` **reference**: (...`args`) => [`BaseValidation`](BaseValidation.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseValidationAsync`](BaseValidationAsync.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The validation reference.

#### Parameters

##### args

...`any`[]

#### Returns

[`BaseValidation`](BaseValidation.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\> \| [`BaseValidationAsync`](BaseValidationAsync.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

The validation type.

#### Inherited from

`Omit.type`
