import type { CompatibleConfig, CompatiblePlugin } from "./types";

/**
 * Get configuration adapters for converting between flat and legacy config formats
 * @param pluginName The name of the plugin
 * @param plugin The plugin instance
 * @returns Object with toFlatConfig and toLegacyConfig functions
 */
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
