[**@eslint-react/shared**](../README.md)

***

[@eslint-react/shared](../README.md) / getConfigAdapters

# Function: getConfigAdapters()

> **getConfigAdapters**(`pluginName`, `plugin`): `object`

## Parameters

### pluginName

`string`

### plugin

`CompatiblePlugin`

## Returns

`object`

### toFlatConfig()

> **toFlatConfig**: (`config`) => `object`

#### Parameters

##### config

`CompatibleConfig`

#### Returns

`object`

##### name?

> `optional` **name**: `string`

##### plugins

> **plugins**: `object`

###### Index Signature

\[`key`: `string`\]: `CompatiblePlugin`

##### rules?

> `optional` **rules**: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `RuleConfig`\<`unknown`[]\>\>

##### settings?

> `optional` **settings**: `SettingsConfig`

### toLegacyConfig()

> **toLegacyConfig**: (`__namedParameters`) => `object`

#### Parameters

##### \_\_namedParameters

`CompatibleConfig`

#### Returns

`object`

##### plugins

> **plugins**: `string`[]

##### rules

> **rules**: `undefined` \| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `RuleConfig`\<`unknown`[]\>\>
