[@eslint-react/kit](../README.md) / CollectorWithContext

# Interface: CollectorWithContext\<T, E\>

An extended collector that also provides access to the current traversal
context. Useful for rules that need to inspect which component or hook the
traversal is currently inside.

## Extends

- [`Collector`](Collector.md)\<`T`\>

## Type Parameters

| Type Parameter | Description |
| ------ | ------ |
| `T` | The semantic node type yielded by the collector. |
| `E` | The entry type tracking the current traversal position. |

## Properties

| Property | Type | Description | Overrides | Inherited from |
| ------ | ------ | ------ | ------ | ------ |
| <a id="property-query"></a> `query` | \{ `all`: `T`[]; \} | Query API with additional contextual access. | [`Collector`](Collector.md).[`query`](Collector.md#property-query) | - |
| `query.all` | `T`[] | - | - | - |
| <a id="property-visitor"></a> `visitor` | `RuleListener` | AST visitor that drives the collection — merge this into your rule listener. | - | [`Collector`](Collector.md).[`visitor`](Collector.md#property-visitor) |
