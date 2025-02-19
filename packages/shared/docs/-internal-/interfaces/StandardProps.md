[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / StandardProps

# Interface: StandardProps\<TInput, TOutput\>

The Standard Schema properties interface.

## Type Parameters

• **TInput**

• **TOutput**

## Properties

### types?

> `readonly` `optional` **types**: [`StandardTypes`](StandardTypes.md)\<`TInput`, `TOutput`\>

Inferred types associated with the schema.

***

### validate()

> `readonly` **validate**: (`value`) => [`StandardResult`](../type-aliases/StandardResult.md)\<`TOutput`\> \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StandardResult`](../type-aliases/StandardResult.md)\<`TOutput`\>\>

Validates unknown input values.

#### Parameters

##### value

`unknown`

#### Returns

[`StandardResult`](../type-aliases/StandardResult.md)\<`TOutput`\> \| [`Promise`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Promise)\<[`StandardResult`](../type-aliases/StandardResult.md)\<`TOutput`\>\>

***

### vendor

> `readonly` **vendor**: `"valibot"`

The vendor name of the schema library.

***

### version

> `readonly` **version**: `1`

The version number of the standard.
