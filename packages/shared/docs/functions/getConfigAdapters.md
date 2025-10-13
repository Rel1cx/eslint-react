[**@eslint-react/shared**](../README.md)

***

[@eslint-react/shared](../README.md) / getConfigAdapters

# Function: getConfigAdapters()

> **getConfigAdapters**(`pluginName`, `plugin`): `object`

## Parameters

### pluginName

`string`

### plugin

[`CompatiblePlugin`](../interfaces/CompatiblePlugin.md)

## Returns

`object`

### toFlatConfig()

> **toFlatConfig**: (`config`) => `object`

#### Parameters

##### config

[`CompatibleConfig`](../interfaces/CompatibleConfig.md)

#### Returns

`object`

##### name?

> `optional` **name**: `string`

##### plugins

> **plugins**: `object`

###### Index Signature

\[`key`: `string`\]: [`CompatiblePlugin`](../interfaces/CompatiblePlugin.md)

##### rules?

> `optional` **rules**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `RuleConfig`\<`unknown`[]\>\>

##### settings?

> `optional` **settings**: [`SettingsConfig`](../interfaces/SettingsConfig.md)

### toLegacyConfig()

> **toLegacyConfig**: (`__namedParameters`) => `object`

#### Parameters

##### \_\_namedParameters

[`CompatibleConfig`](../interfaces/CompatibleConfig.md)

#### Returns

`object`

##### plugins

> **plugins**: `string`[]

##### rules

> **rules**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `RuleConfig`\<`unknown`[]\>\> \| `undefined`
