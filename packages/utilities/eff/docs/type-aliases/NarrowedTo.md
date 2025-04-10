[**@eslint-react/eff**](../README.md)

***

[@eslint-react/eff](../README.md) / NarrowedTo

# Type Alias: NarrowedTo\<T, Base\>

> **NarrowedTo**\<`T`, `Base`\> = [`Extract`](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union)\<`T`, `Base`\> *extends* `never` ? `Base` : `0` *extends* `1` & [`NoInfer`](https://www.typescriptlang.org/docs/handbook/utility-types.html#noinfertype)\<`T`\> ? `Base` : [`Extract`](https://www.typescriptlang.org/docs/handbook/utility-types.html#extracttype-union)\<`T`, `Base`\>

An extension of Extract for type predicates which falls back to the base
in order to narrow the `unknown` case.

## Type Parameters

### T

`T`

### Base

`Base`

## Example

```ts
function isMyType<T>(data: T | MyType): data is NarrowedTo<T, MyType> { ... }
```
