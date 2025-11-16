[@eslint-react/shared](../README.md) / getConfigAdapters

# Function: getConfigAdapters()

```ts
function getConfigAdapters(pluginName: string, plugin: CompatiblePlugin): {
  toFlatConfig: (config: CompatibleConfig) => {
     name?: string;
     plugins: {
      [key: string]: CompatiblePlugin;
     };
     rules?: Record<string, RuleConfig<unknown[]>>;
     settings?: SettingsConfig;
  };
  toLegacyConfig: (__namedParameters: CompatibleConfig) => {
     plugins: string[];
     rules:   | Record<string, RuleConfig<unknown[]>>
        | undefined;
  };
};
```

## Parameters

| Parameter | Type |
| ------ | ------ |
| `pluginName` | `string` |
| `plugin` | [`CompatiblePlugin`](../interfaces/CompatiblePlugin.md) |

## Returns

```ts
{
  toFlatConfig: (config: CompatibleConfig) => {
     name?: string;
     plugins: {
      [key: string]: CompatiblePlugin;
     };
     rules?: Record<string, RuleConfig<unknown[]>>;
     settings?: SettingsConfig;
  };
  toLegacyConfig: (__namedParameters: CompatibleConfig) => {
     plugins: string[];
     rules:   | Record<string, RuleConfig<unknown[]>>
        | undefined;
  };
}
```

| Name | Type |
| ------ | ------ |
| `toFlatConfig()` | (`config`: [`CompatibleConfig`](../interfaces/CompatibleConfig.md)) => \{ `name?`: `string`; `plugins`: \{ \[`key`: `string`\]: [`CompatiblePlugin`](../interfaces/CompatiblePlugin.md); \}; `rules?`: [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `RuleConfig`\<`unknown`[]\>\>; `settings?`: [`SettingsConfig`](../interfaces/SettingsConfig.md); \} |
| `toLegacyConfig()` | (`__namedParameters`: [`CompatibleConfig`](../interfaces/CompatibleConfig.md)) => \{ `plugins`: `string`[]; `rules`: \| [`Record`](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type)\<`string`, `RuleConfig`\<`unknown`[]\>\> \| `undefined`; \} |
