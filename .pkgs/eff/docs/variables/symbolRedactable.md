[@local/eff](../README.md) / symbolRedactable

# Variable: symbolRedactable

```ts
const symbolRedactable: unique symbol;
```

Defines the symbol used to identify objects that implement the [Redactable](../interfaces/Redactable.md)
protocol.

**Details**

The symbol is registered globally via `Symbol.for("~effect/Redactable")`, so it is
identical across multiple copies of the library at runtime, including values
created by the real `effect` package.

## Since

3.10.0
