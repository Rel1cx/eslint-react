import { ESLintUtils } from "@typescript-eslint/utils";

import { WEBSITE_URL } from "./constants";

/**
 * Get the URL for the documentation of a rule in a plugin.
 * @param pluginName The name of the plugin.
 * @returns The URL for the documentation of a rule.
 */
const getDocsUrl = (pluginName: string) => (ruleName: string) => {
  if (pluginName === "x") return `${WEBSITE_URL}/docs/rules/${ruleName}`;
  return `${WEBSITE_URL}/docs/rules/${pluginName}-${ruleName}`;
};

/**
 * Get the ESLint rule creator for a plugin.
 * @param pluginName The name of the plugin.
 * @returns The ESLint rule creator.
 */
export const createRuleForPlugin = (pluginName: string) => ESLintUtils.RuleCreator(getDocsUrl(pluginName));
