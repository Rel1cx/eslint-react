// eslint-disable-next-line functional-core/purity
import { ESLintUtils } from "@typescript-eslint/utils";

import { GITHUB_BASEURL } from "./constants";

const getDocsUrl = (pluginName: string) => (ruleName: string) => {
  return `${GITHUB_BASEURL}/packages/eslint-plugin-${pluginName}/src/rules/${ruleName}.md`;
};

export const createRuleForPlugin = (pluginName: string) => ESLintUtils.RuleCreator(getDocsUrl(pluginName));
