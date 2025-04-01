[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / BaseValidation

# Interface: BaseValidation\<TInput, TOutput, TIssue\>

Base validation interface.

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

> `readonly` **expects**: `null` \| `string`

The expected property.

***

### kind

> `readonly` **kind**: `"validation"`

The object kind.

***

### reference()

> `readonly` **reference**: (...`args`) => `BaseValidation`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The validation reference.

#### Parameters

##### args

...`any`[]

#### Returns

`BaseValidation`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

The validation type.
