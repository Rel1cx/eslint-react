import { WEBSITE_URL } from "@eslint-react/shared";
import { ESLintUtils } from "@typescript-eslint/utils";

function getDocsUrl(ruleName: string) {
  return `${WEBSITE_URL}/docs/rules/naming-convention-${ruleName}`;
}

export const createRule = ESLintUtils.RuleCreator(getDocsUrl);
