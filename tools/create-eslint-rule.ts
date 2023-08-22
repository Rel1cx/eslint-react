import { ESLintUtils } from "@typescript-eslint/utils";

import { BASEURL_DOCS } from "../constants";

export const createEslintRule = ESLintUtils.RuleCreator((ruleName) => `${BASEURL_DOCS}/${ruleName}.md`);
