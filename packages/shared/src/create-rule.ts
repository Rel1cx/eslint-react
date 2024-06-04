import { ESLintUtils } from "@typescript-eslint/utils";

import { WEBSITE_URL } from "./constants";

const getDocsUrl = (pluginName: string) => (ruleName: string) => {
  if (pluginName === "core") return `${WEBSITE_URL}/rules/${ruleName}`;
  return `${WEBSITE_URL}/rules/${pluginName}-${ruleName}`;
};

/* eslint-disable no-restricted-syntax */
export interface ESLintPluginDocs {
  recommended?: "recommended";
  requiresTypeChecking?: boolean;
}
/* eslint-enable no-restricted-syntax */

export const createRuleForPlugin = (pluginName: string) =>
  ESLintUtils.RuleCreator<ESLintPluginDocs>(getDocsUrl(pluginName));
