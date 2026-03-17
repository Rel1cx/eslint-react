[@eslint-react/kit](../README.md) / Collector

# Interface: Collector\<T\>

The return type of a collector — a query API paired with an AST visitor.

The `visitor` must be merged into the rule's listener (via [merge](../functions/merge.md))
so the collector can traverse the AST and populate its query results.

## Type Parameters

| Type Parameter |
| ------ |
| `T` |

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="property-query"></a> `query` | \{ `all`: `T`[]; \} | Query API for accessing collected semantic nodes after traversal. |
| `query.all` | `T`[] | - |
| <a id="property-visitor"></a> `visitor` | `RuleListener` | AST visitor that drives the collection — merge this into your rule listener. |
