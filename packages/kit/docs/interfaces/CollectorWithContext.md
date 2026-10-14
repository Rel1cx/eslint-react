[@eslint-react/kit](../README.md) / CollectorWithContext

# Interface: CollectorWithContext\<T\>

## Extends

- [`Collector`](Collector.md)\<`T`\>

## Type Parameters

| Type Parameter                    |
| --------------------------------- |
| <a id="type-parameter-t"></a> `T` |

## Properties

| Property                                | Type                                              | Overrides                                                          | Inherited from                                                         |
| --------------------------------------- | ------------------------------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------- |
| <a id="property-query"></a> `query`     | \{ `all`(`program`: `Program`): `T`[]; \}         | [`Collector`](Collector.md).[`query`](Collector.md#property-query) | -                                                                      |
| `query.all`                             | (`program`: `Program`) => `T`[]                   | -                                                                  | -                                                                      |
| <a id="property-visitor"></a> `visitor` | [`RuleListener`](../type-aliases/RuleListener.md) | -                                                                  | [`Collector`](Collector.md).[`visitor`](Collector.md#property-visitor) |
