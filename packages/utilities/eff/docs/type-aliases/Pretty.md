[@eslint-react/eff](../README.md) / Pretty

# Type Alias: Pretty\<T\>

```ts
type Pretty<T> = { [P in keyof T]: T[P] } & {
};
```

Simplifies a complex type intersection into a flat object type for better readability
in IDE tooltips and error messages.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |
