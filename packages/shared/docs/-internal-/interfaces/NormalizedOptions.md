[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / NormalizedOptions

# Interface: NormalizedOptions\<Fn\>

## Extends

- [`Options`](Options.md)\<`Fn`\>

## Type Parameters

• **Fn** *extends* [`AnyFn`](../type-aliases/AnyFn.md)

## Indexable

\[`key`: `string`\]: `any`

\[`index`: `number`\]: `any`

## Properties

### isEqual

> **isEqual**: [`EqualityComparator`](../type-aliases/EqualityComparator.md)

#### Overrides

[`Options`](Options.md).[`isEqual`](Options.md#isequal)

***

### isMatchingKey?

> `optional` **isMatchingKey**: [`MatchingKeyComparator`](../type-aliases/MatchingKeyComparator.md)

#### Inherited from

[`Options`](Options.md).[`isMatchingKey`](Options.md#ismatchingkey)

***

### isPromise

> **isPromise**: `boolean`

#### Overrides

[`Options`](Options.md).[`isPromise`](Options.md#ispromise)

***

### maxSize

> **maxSize**: `number`

#### Overrides

[`Options`](Options.md).[`maxSize`](Options.md#maxsize)

***

### onCacheAdd?

> `optional` **onCacheAdd**: [`CacheModifiedHandler`](../type-aliases/CacheModifiedHandler.md)\<`Fn`\>

#### Inherited from

[`Options`](Options.md).[`onCacheAdd`](Options.md#oncacheadd)

***

### onCacheChange?

> `optional` **onCacheChange**: [`CacheModifiedHandler`](../type-aliases/CacheModifiedHandler.md)\<`Fn`\>

#### Inherited from

[`Options`](Options.md).[`onCacheChange`](Options.md#oncachechange)

***

### onCacheHit?

> `optional` **onCacheHit**: [`CacheModifiedHandler`](../type-aliases/CacheModifiedHandler.md)\<`Fn`\>

#### Inherited from

[`Options`](Options.md).[`onCacheHit`](Options.md#oncachehit)

***

### transformKey?

> `optional` **transformKey**: [`KeyTransformer`](../type-aliases/KeyTransformer.md)

#### Inherited from

[`Options`](Options.md).[`transformKey`](Options.md#transformkey)
