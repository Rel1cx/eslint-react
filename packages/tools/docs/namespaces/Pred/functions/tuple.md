[**@eslint-react/tools**](../../../README.md) • **Docs**

***

[@eslint-react/tools](../../../README.md) / [Pred](../README.md) / tuple

# Function: tuple()

> **tuple**\<`T`\>(...`elements`): [`Predicate`](../interfaces/Predicate.md)\<`Readonly`\<\{ \[I in string \| number \| symbol\]: \[T\[I\<I\>\]\] extends \[Predicate\<A\>\] ? A : never \}\>\>

Similar to `Promise.all` but operates on `Predicate`s.

```
[Predicate<A>, Predicate<B>, ...] -> Predicate<[A, B, ...]>
```

## Type Parameters

• **T** *extends* readonly [`Predicate`](../interfaces/Predicate.md)\<`any`\>[]

## Parameters

• ...**elements**: `T`

## Returns

[`Predicate`](../interfaces/Predicate.md)\<`Readonly`\<\{ \[I in string \| number \| symbol\]: \[T\[I\<I\>\]\] extends \[Predicate\<A\>\] ? A : never \}\>\>

## Since

2.0.0
