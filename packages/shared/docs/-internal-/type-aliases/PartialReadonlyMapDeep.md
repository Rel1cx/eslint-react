[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / PartialReadonlyMapDeep

# Type Alias: PartialReadonlyMapDeep\<KeyType, ValueType, Options\>

> **PartialReadonlyMapDeep**\<`KeyType`, `ValueType`, `Options`\> = `object` & `ReadonlyMap`\<[`_PartialDeep`](PartialDeep.md)\<`KeyType`, `Options`\>, [`_PartialDeep`](PartialDeep.md)\<`ValueType`, `Options`\>\>

Same as `PartialDeep`, but accepts only `ReadonlyMap`s as inputs. Internal helper for `PartialDeep`.

## Type Parameters

### KeyType

`KeyType`

### ValueType

`ValueType`

### Options

`Options` *extends* [`Required`](Required.md)\<[`PartialDeepOptions`](PartialDeepOptions.md)\>
