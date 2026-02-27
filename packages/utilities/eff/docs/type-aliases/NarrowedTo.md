[@eslint-react/eff](../README.md) / NarrowedTo

# Type Alias: NarrowedTo\<T, Base\>

```ts
type NarrowedTo<T, Base> = Extract<T, Base> extends never ? Base : 0 extends 1 & NoInfer<T> ? Base : Extract<T, Base>;
```

An extension of Extract for type predicates which falls back to the base
in order to narrow the `unknown` case.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
| `Base` |

## Example

```ts
function isMyType<T>(data: T | MyType): data is NarrowedTo<T, MyType> { ... }
```
