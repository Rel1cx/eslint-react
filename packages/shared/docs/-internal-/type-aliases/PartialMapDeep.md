[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / PartialMapDeep

# Type Alias: PartialMapDeep\<KeyType, ValueType, Options\>

> **PartialMapDeep**\<`KeyType`, `ValueType`, `Options`\> = `object` & [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<[`_PartialDeep`](PartialDeep.md)\<`KeyType`, `Options`\>, [`_PartialDeep`](PartialDeep.md)\<`ValueType`, `Options`\>\>

Same as `PartialDeep`, but accepts only `Map`s and as inputs. Internal helper for `PartialDeep`.

## Type Parameters

### KeyType

`KeyType`

### ValueType

`ValueType`

### Options

`Options` *extends* [`Required`](Required.md)\<[`PartialDeepOptions`](PartialDeepOptions.md)\>
