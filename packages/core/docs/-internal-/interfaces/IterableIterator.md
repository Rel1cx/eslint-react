[**@eslint-react/core**](../../README.md)

***

[@eslint-react/core](../../README.md) / [\<internal\>](../README.md) / IterableIterator

# Interface: IterableIterator\<T, TReturn, TNext\>

Describes a user-defined [Iterator](Iterator.md) that is also iterable.

## Extends

- [`Iterator`](Iterator.md)\<`T`, `TReturn`, `TNext`\>

## Type Parameters

• **T**

• **TReturn** = `any`

• **TNext** = `any`

## Methods

### \[iterator\]()

> **\[iterator\]**(): [`IterableIterator`](IterableIterator.md)\<`T`, `TReturn`, `TNext`\>

#### Returns

[`IterableIterator`](IterableIterator.md)\<`T`, `TReturn`, `TNext`\>

***

### next()

> **next**(...`__namedParameters`): [`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

#### Parameters

##### \_\_namedParameters

\[\] | \[`TNext`\]

#### Returns

[`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

#### Inherited from

[`Iterator`](Iterator.md).[`next`](Iterator.md#next)

***

### return()?

> `optional` **return**(`value`?): [`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

#### Parameters

##### value?

`TReturn`

#### Returns

[`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

#### Inherited from

[`Iterator`](Iterator.md).[`return`](Iterator.md#return)

***

### throw()?

> `optional` **throw**(`e`?): [`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

#### Parameters

##### e?

`any`

#### Returns

[`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `TReturn`\>

#### Inherited from

[`Iterator`](Iterator.md).[`throw`](Iterator.md#throw)
