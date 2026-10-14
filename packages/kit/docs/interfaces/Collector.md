[@eslint-react/kit](../README.md) / Collector

# Interface: Collector\<T\>

## Extended by

- [`CollectorWithContext`](CollectorWithContext.md)

## Type Parameters

| Type Parameter                    |
| --------------------------------- |
| <a id="type-parameter-t"></a> `T` |

## Properties

| Property                                | Type                                              |
| --------------------------------------- | ------------------------------------------------- |
| <a id="property-query"></a> `query`     | \{ `all`(`program`: `Program`): `T`[]; \}         |
| `query.all`                             | (`program`: `Program`) => `T`[]                   |
| <a id="property-visitor"></a> `visitor` | [`RuleListener`](../type-aliases/RuleListener.md) |
