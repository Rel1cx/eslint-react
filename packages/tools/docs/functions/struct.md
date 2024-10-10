[**@eslint-react/tools**](../README.md) • **Docs**

***

[@eslint-react/tools](../README.md) / struct

# Function: struct()

> **struct**\<`R`\>(`fields`): [`Extract`\<`R`\[keyof `R`\], [`Any`](../namespaces/Refinement/type-aliases/Any.md)\>] *extends* [`never`] ? [`Predicate`](../interfaces/Predicate.md)\<\{ readonly \[K in string \| number \| symbol\]: In\<R\[K\]\> \}\> : [`Refinement`](../interfaces/Refinement.md)\<\{ readonly \[K in string \| number \| symbol\]: R\[K\] extends Any ? In\<any\[any\]\> : In\<R\[K\]\> \}, \{ readonly \[K in string \| number \| symbol\]: R\[K\] extends Any ? Out\<any\[any\]\> : In\<R\[K\]\> \}\>

```
{ ab: Refinement<A, B>; cd: Refinement<C, D>, ... } -> Refinement<{ ab: A; cd: C; ... }, { ab: B; cd: D; ... }>
{ a: Predicate<A, B>; b: Predicate<B>, ... } -> Predicate<{ a: A; b: B; ... }>
{ ab: Refinement<A, B>; c: Predicate<C>, ... } -> Refinement<{ ab: A; c: C; ... }, { ab: B; c: С; ... }>
```

## Type Parameters

• **R** *extends* `Record`\<`string`, [`Any`](../namespaces/Predicate/type-aliases/Any.md)\>

## Parameters

• **fields**: `R`

## Returns

[`Extract`\<`R`\[keyof `R`\], [`Any`](../namespaces/Refinement/type-aliases/Any.md)\>] *extends* [`never`] ? [`Predicate`](../interfaces/Predicate.md)\<\{ readonly \[K in string \| number \| symbol\]: In\<R\[K\]\> \}\> : [`Refinement`](../interfaces/Refinement.md)\<\{ readonly \[K in string \| number \| symbol\]: R\[K\] extends Any ? In\<any\[any\]\> : In\<R\[K\]\> \}, \{ readonly \[K in string \| number \| symbol\]: R\[K\] extends Any ? Out\<any\[any\]\> : In\<R\[K\]\> \}\>

## Since

2.0.0
