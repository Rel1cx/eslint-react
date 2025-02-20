[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / Cache

# Class: Cache\<Fn\>

## Type Parameters

• **Fn** *extends* [`AnyFn`](../type-aliases/AnyFn.md)

## Constructors

### new Cache()

> **new Cache**\<`Fn`\>(`options`): [`Cache`](Cache.md)\<`Fn`\>

#### Parameters

##### options

[`NormalizedOptions`](../interfaces/NormalizedOptions.md)\<`Fn`\>

#### Returns

[`Cache`](Cache.md)\<`Fn`\>

## Properties

### canTransformKey

> `readonly` **canTransformKey**: `boolean`

***

### getKeyIndex

> `readonly` **getKeyIndex**: [`KeyIndexGetter`](../type-aliases/KeyIndexGetter.md)

***

### keys

> **keys**: [`Key`](../type-aliases/Key.md)[]

The prevents call arguments which have cached results.

***

### options

> `readonly` **options**: [`NormalizedOptions`](../interfaces/NormalizedOptions.md)\<`Fn`\>

***

### shouldCloneArguments

> `readonly` **shouldCloneArguments**: `boolean`

***

### shouldUpdateOnAdd

> `readonly` **shouldUpdateOnAdd**: `boolean`

***

### shouldUpdateOnChange

> `readonly` **shouldUpdateOnChange**: `boolean`

***

### shouldUpdateOnHit

> `readonly` **shouldUpdateOnHit**: `boolean`

***

### values

> **values**: `any`[]

The results of previous cached calls.

## Accessors

### size

#### Get Signature

> **get** **size**(): `number`

The number of cached [key,value] results.

##### Returns

`number`

***

### snapshot

#### Get Signature

> **get** **snapshot**(): [`CacheSnapshot`](../interfaces/CacheSnapshot.md)

A copy of the cache at a moment in time. This is useful
to compare changes over time, since the cache mutates
internally for performance reasons.

##### Returns

[`CacheSnapshot`](../interfaces/CacheSnapshot.md)

## Methods

### orderByLru()

> **orderByLru**(`key`, `value`, `startingIndex`): `void`

Order the array based on a Least-Recently-Used basis.

#### Parameters

##### key

[`Key`](../type-aliases/Key.md)

##### value

`any`

##### startingIndex

`number`

#### Returns

`void`

***

### updateAsyncCache()

> **updateAsyncCache**(`memoized`): `void`

Update the promise method to auto-remove from cache if rejected, and
if resolved then fire cache hit / changed.

#### Parameters

##### memoized

[`Memoized`](../type-aliases/Memoized.md)\<`Fn`\>

#### Returns

`void`
