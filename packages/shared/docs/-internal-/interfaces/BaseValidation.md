[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / BaseValidation

# Interface: BaseValidation\<TInput, TOutput, TIssue\>

Base validation interface.

## Type Parameters

• **TInput**

• **TOutput**

• **TIssue** *extends* [`BaseIssue`](BaseIssue.md)\<`unknown`\>

## Properties

### async

> `readonly` **async**: `false`

Whether it's async.

***

### expects

> `readonly` **expects**: `null` \| `string`

The expected property.

***

### kind

> `readonly` **kind**: `"validation"`

The object kind.

***

### reference()

> `readonly` **reference**: (...`args`) => [`BaseValidation`](BaseValidation.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The validation reference.

#### Parameters

##### args

...`any`[]

#### Returns

[`BaseValidation`](BaseValidation.md)\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

The validation type.
