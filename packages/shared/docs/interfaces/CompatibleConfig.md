[@eslint-react/shared](../README.md) / CompatibleConfig

# Interface: CompatibleConfig

A configuration object with a compatible shape for use with `defineConfig()` and `tseslint.config()`.
Intentionally wide/inaccurate for compatibility purposes.

## Properties

| Property | Type | Description |
| ------ | ------ | ------ |
| <a id="name"></a> `name?` | `string` | Optional configuration name. |
| <a id="rules"></a> `rules?` | [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `RuleConfig`\<`unknown`[]\>\> | Rule configurations. |
| <a id="settings"></a> `settings?` | [`SettingsConfig`](SettingsConfig.md) | Shared settings. |
