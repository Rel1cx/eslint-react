[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / \_PartialDeep

# Type Alias: \_PartialDeep\<T, Options\>

> **\_PartialDeep**\<`T`, `Options`\> = `T` *extends* [`BuiltIns`](BuiltIns.md) \| (...`arguments_`) => `unknown` \| (...`arguments_`) => `unknown` ? `T` : `T` *extends* [`Map`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Map)\<infer KeyType, infer ValueType\> ? [`PartialMapDeep`](PartialMapDeep.md)\<`KeyType`, `ValueType`, `Options`\> : `T` *extends* [`Set`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Set)\<infer ItemType\> ? [`PartialSetDeep`](PartialSetDeep.md)\<`ItemType`, `Options`\> : `T` *extends* `ReadonlyMap`\<infer KeyType, infer ValueType\> ? [`PartialReadonlyMapDeep`](PartialReadonlyMapDeep.md)\<`KeyType`, `ValueType`, `Options`\> : `T` *extends* `ReadonlySet`\<infer ItemType\> ? [`PartialReadonlySetDeep`](PartialReadonlySetDeep.md)\<`ItemType`, `Options`\> : `T` *extends* `object` ? `T` *extends* `ReadonlyArray`\<infer ItemType\> ? `Options`\[`"recurseIntoArrays"`\] *extends* `true` ? `ItemType`[] *extends* `T` ? readonly ... *extends* `T` ? `ReadonlyArray`\<...\> : ...[] : [`PartialObjectDeep`](PartialObjectDeep.md)\<`T`, `Options`\> : `T` : [`PartialObjectDeep`](PartialObjectDeep.md)\<`T`, `Options`\> : `unknown`

## Type Parameters

### T

`T`

### Options

`Options` *extends* [`Required`](Required.md)\<[`PartialDeepOptions`](PartialDeepOptions.md)\>
