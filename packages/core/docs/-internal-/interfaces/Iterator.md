[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / Iterator

# Interface: Iterator\<T, TReturn, TNext\>

## Extended by

- [`IterableIterator`](IterableIterator.md)

## Type Parameters

• **T**

• **TReturn** = `any`

• **TNext** = `any`

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
