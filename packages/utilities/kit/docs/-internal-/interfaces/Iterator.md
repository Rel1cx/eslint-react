[**@eslint-react/kit**](../../README.md)

***

[@eslint-react/kit](../../README.md) / [\<internal\>](../README.md) / Iterator

# Interface: Iterator\<T, TReturn, TNext\>

## Extended by

- [`IterableIterator`](IterableIterator.md)

## Type Parameters

### T

`T`

### TReturn

`TReturn` = `any`

### TNext

`TNext` = `any`

## Methods

### next()

> **next**(...`__namedParameters`): [`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

#### Parameters

##### \_\_namedParameters

\[\] | \[`TNext`\]

#### Returns

[`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

***

### return()?

> `optional` **return**(`value`?): [`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

#### Parameters

##### value?

`TReturn`

#### Returns

[`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

***

### throw()?

> `optional` **throw**(`e`?): [`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

#### Parameters

##### e?

`any`

#### Returns

[`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>
