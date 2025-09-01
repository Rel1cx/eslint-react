import type { CompatibleConfig, CompatiblePlugin } from "@eslint-react/kit";

export function getConfigAdapters(pluginName: string, plugin: CompatiblePlugin) {
  function toFlatConfig(config: CompatibleConfig) {
    return {
      ...config,
      plugins: {
        [pluginName]: plugin,
      },
    };
  }
  function toLegacyConfig({ rules }: CompatibleConfig) {
    return {
      plugins: [pluginName],
      rules,
    };
  }
  return { toFlatConfig, toLegacyConfig } as const;
}
