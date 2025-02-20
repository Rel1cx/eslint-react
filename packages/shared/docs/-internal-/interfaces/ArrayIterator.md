[**@eslint-react/shared**](../../README.md)

***

[@eslint-react/shared](../../README.md) / [\<internal\>](../README.md) / ArrayIterator

# Interface: ArrayIterator\<T\>

## Extends

- `IteratorObject`\<`T`, [`BuiltinIteratorReturn`](../type-aliases/BuiltinIteratorReturn.md), `unknown`\>

## Type Parameters

• **T**

## Methods

### \[iterator\]()

> **\[iterator\]**(): [`ArrayIterator`](ArrayIterator.md)\<`T`\>

#### Returns

[`ArrayIterator`](ArrayIterator.md)\<`T`\>

#### Overrides

`IteratorObject.[iterator]`

***

### next()

> **next**(...`__namedParameters`): [`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `undefined`\>

#### Parameters

##### \_\_namedParameters

\[\] | \[`unknown`\]

#### Returns

[`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `undefined`\>

#### Inherited from

`IteratorObject.next`

***

### return()?

> `optional` **return**(`value`?): [`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `undefined`\>

#### Parameters

##### value?

`undefined`

#### Returns

[`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `undefined`\>

#### Inherited from

`IteratorObject.return`

***

### throw()?

> `optional` **throw**(`e`?): [`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `undefined`\>

#### Parameters

##### e?

`any`

#### Returns

[`IteratorResult`](../type-aliases/IteratorResult.md)\<`T`, `undefined`\>

#### Inherited from

`IteratorObject.throw`
