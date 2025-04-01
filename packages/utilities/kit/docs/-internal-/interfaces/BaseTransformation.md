[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / BaseTransformation

# Interface: BaseTransformation\<TInput, TOutput, TIssue\>

Base transformation interface.

## Extended by

- [`ReadonlyAction`](ReadonlyAction.md)

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

### kind

> `readonly` **kind**: `"transformation"`

The object kind.

***

### reference()

> `readonly` **reference**: (...`args`) => `BaseTransformation`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

The transformation reference.

#### Parameters

##### args

...`any`[]

#### Returns

`BaseTransformation`\<`any`, `any`, [`BaseIssue`](BaseIssue.md)\<`unknown`\>\>

***

### type

> `readonly` **type**: `string`

The transformation type.
