[**@eslint-react/tools**](../README.md)

***

[@eslint-react/tools](../README.md) / tuple

# Function: tuple()

> **tuple**\<`T`\>(...`elements`): [`Extract`\<`T`\[`number`\], [`Any`](../namespaces/Refinement/type-aliases/Any.md)\>] *extends* [`never`] ? [`Predicate`](../interfaces/Predicate.md)\<\{ readonly \[I in string \| number \| symbol\]: In\<T\[I\<I\>\]\> \}\> : [`Refinement`](../interfaces/Refinement.md)\<\{ readonly \[I in string \| number \| symbol\]: T\[I\<I\>\] extends Any ? In\<any\[any\]\> : In\<T\[I\<I\>\]\> \}, \{ readonly \[I in string \| number \| symbol\]: T\[I\<I\>\] extends Any ? Out\<any\[any\]\> : In\<T\[I\<I\>\]\> \}\>

Similar to `Promise.all` but operates on `Predicate`s.

```
[Refinement<A, B>, Refinement<C, D>, ...] -> Refinement<[A, C, ...], [B, D, ...]>
[Predicate<A>, Predicate<B>, ...] -> Predicate<[A, B, ...]>
[Refinement<A, B>, Predicate<C>, ...] -> Refinement<[A, C, ...], [B, C, ...]>
```

## Type Parameters

• **T** *extends* readonly [`Any`](../namespaces/Predicate/type-aliases/Any.md)[]

## Parameters

### elements

...`T`

## Returns

[`Extract`\<`T`\[`number`\], [`Any`](../namespaces/Refinement/type-aliases/Any.md)\>] *extends* [`never`] ? [`Predicate`](../interfaces/Predicate.md)\<\{ readonly \[I in string \| number \| symbol\]: In\<T\[I\<I\>\]\> \}\> : [`Refinement`](../interfaces/Refinement.md)\<\{ readonly \[I in string \| number \| symbol\]: T\[I\<I\>\] extends Any ? In\<any\[any\]\> : In\<T\[I\<I\>\]\> \}, \{ readonly \[I in string \| number \| symbol\]: T\[I\<I\>\] extends Any ? Out\<any\[any\]\> : In\<T\[I\<I\>\]\> \}\>

## Since

2.0.0

## Since

2.0.0
