import { WEBSITE_URL } from "./constants";

/**
 * Get the URL for the documentation of a rule in a plugin.
 * @internal
 * @param pluginName The name of the plugin.
 * @returns The URL for the documentation of a rule.
 */
export const getDocsUrl = (pluginName: string) => (ruleName: string) => {
  if (pluginName === "x") {
    return `${WEBSITE_URL}/docs/rules/${ruleName}`;
  }
  return `${WEBSITE_URL}/docs/rules/${pluginName}-${ruleName}`;
};
