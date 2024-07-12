[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Pred](../README.md) / struct

# Function: struct()

> **struct**\<`R`\>(`fields`): [`Predicate`](../interfaces/Predicate.md)\<\{ readonly \[K in string \| number \| symbol\]: \[R\[K\]\] extends \[Predicate\<A\>\] ? A : never \}\>

## Type Parameters

• **R** *extends* `Record`\<`string`, [`Predicate`](../interfaces/Predicate.md)\<`any`\>\>

## Parameters

• **fields**: `R`

## Returns

[`Predicate`](../interfaces/Predicate.md)\<\{ readonly \[K in string \| number \| symbol\]: \[R\[K\]\] extends \[Predicate\<A\>\] ? A : never \}\>

## Since

2.0.0
