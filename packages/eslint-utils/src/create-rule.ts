import { WEBSITE_URL } from "@eslint-react/shared";
import { ESLintUtils } from "@typescript-eslint/utils";

const getDocsUrl = (pluginName: string) => (ruleName: string) => {
  return `${WEBSITE_URL}/rules/${pluginName}-${ruleName}`;
};

export const createRuleForPlugin = (pluginName: string) => ESLintUtils.RuleCreator(getDocsUrl(pluginName));
