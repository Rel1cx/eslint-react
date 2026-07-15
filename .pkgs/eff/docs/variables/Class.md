[@local/eff](../README.md) / Class

# Variable: Class

```ts
const Class: () => Pipeable;
```

Provides a base constructor whose instances implement the standard `Pipeable.pipe`
method.

**When to use**

Use when you need to define a class that supports Effect-style method
chaining through `.pipe(...)`.

## Returns

[`Pipeable`](../interfaces/Pipeable.md)

## Since

3.15.0
