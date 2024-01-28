import { ESLintUtils } from "@typescript-eslint/utils";

import { WEBSITE_URL } from "./constants";

const getDocsUrl = (pluginName: string) => (ruleName: string) => {
  if (pluginName === "core") return `${WEBSITE_URL}/rules/${ruleName}`;
  return `${WEBSITE_URL}/rules/${pluginName}-${ruleName}`;
};

export const createRuleForPlugin = (pluginName: string) => ESLintUtils.RuleCreator(getDocsUrl(pluginName));
