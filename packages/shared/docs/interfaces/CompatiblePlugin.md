[@eslint-react/shared](../README.md) / CompatiblePlugin

# Interface: CompatiblePlugin

A plugin with a compatible shape for use with `defineConfig()` and `tseslint.config()`.
Intentionally wide/inaccurate for compatibility purposes.

## Properties

| Property | Type |
| ------ | ------ |
| <a id="meta"></a> `meta` | \{ `name`: `string`; `version`: `string`; \} |
| `meta.name` | `string` |
| `meta.version` | `string` |
| <a id="rules"></a> `rules` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, [`CompatibleRule`](CompatibleRule.md)\> |
