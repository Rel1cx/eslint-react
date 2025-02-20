[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / StandardOptions

# Interface: StandardOptions\<Fn\>

## Extended by

- [`Options`](Options.md)

## Type Parameters

• **Fn** *extends* [`AnyFn`](../type-aliases/AnyFn.md)

## Properties

### isEqual?

> `optional` **isEqual**: [`EqualityComparator`](../type-aliases/EqualityComparator.md)

***

### isMatchingKey?

> `optional` **isMatchingKey**: [`MatchingKeyComparator`](../type-aliases/MatchingKeyComparator.md)

***

### isPromise?

> `optional` **isPromise**: `boolean`

***

### maxSize?

> `optional` **maxSize**: `number`

***

### onCacheAdd?

> `optional` **onCacheAdd**: [`CacheModifiedHandler`](../type-aliases/CacheModifiedHandler.md)\<`Fn`\>

***

### onCacheChange?

> `optional` **onCacheChange**: [`CacheModifiedHandler`](../type-aliases/CacheModifiedHandler.md)\<`Fn`\>

***

### onCacheHit?

> `optional` **onCacheHit**: [`CacheModifiedHandler`](../type-aliases/CacheModifiedHandler.md)\<`Fn`\>

***

### transformKey?

> `optional` **transformKey**: [`KeyTransformer`](../type-aliases/KeyTransformer.md)
