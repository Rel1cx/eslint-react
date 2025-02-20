[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / Options

# Interface: Options\<Fn\>

## Extends

- [`StandardOptions`](StandardOptions.md)\<`Fn`\>.[`Dictionary`](Dictionary.md)\<`any`\>

## Extended by

- [`NormalizedOptions`](NormalizedOptions.md)

## Type Parameters

• **Fn** *extends* [`AnyFn`](../type-aliases/AnyFn.md)

## Indexable

\[`key`: `string`\]: `any`

\[`index`: `number`\]: `any`

## Properties

### isEqual?

> `optional` **isEqual**: [`EqualityComparator`](../type-aliases/EqualityComparator.md)

#### Inherited from

[`StandardOptions`](StandardOptions.md).[`isEqual`](StandardOptions.md#isequal)

***

### isMatchingKey?

> `optional` **isMatchingKey**: [`MatchingKeyComparator`](../type-aliases/MatchingKeyComparator.md)

#### Inherited from

[`StandardOptions`](StandardOptions.md).[`isMatchingKey`](StandardOptions.md#ismatchingkey)

***

### isPromise?

> `optional` **isPromise**: `boolean`

#### Inherited from

[`StandardOptions`](StandardOptions.md).[`isPromise`](StandardOptions.md#ispromise)

***

### maxSize?

> `optional` **maxSize**: `number`

#### Inherited from

[`StandardOptions`](StandardOptions.md).[`maxSize`](StandardOptions.md#maxsize)

***

### onCacheAdd?

> `optional` **onCacheAdd**: [`CacheModifiedHandler`](../type-aliases/CacheModifiedHandler.md)\<`Fn`\>

#### Inherited from

[`StandardOptions`](StandardOptions.md).[`onCacheAdd`](StandardOptions.md#oncacheadd)

***

### onCacheChange?

> `optional` **onCacheChange**: [`CacheModifiedHandler`](../type-aliases/CacheModifiedHandler.md)\<`Fn`\>

#### Inherited from

[`StandardOptions`](StandardOptions.md).[`onCacheChange`](StandardOptions.md#oncachechange)

***

### onCacheHit?

> `optional` **onCacheHit**: [`CacheModifiedHandler`](../type-aliases/CacheModifiedHandler.md)\<`Fn`\>

#### Inherited from

[`StandardOptions`](StandardOptions.md).[`onCacheHit`](StandardOptions.md#oncachehit)

***

### transformKey?

> `optional` **transformKey**: [`KeyTransformer`](../type-aliases/KeyTransformer.md)

#### Inherited from

[`StandardOptions`](StandardOptions.md).[`transformKey`](StandardOptions.md#transformkey)
