import * as ESLintUtils from "@typescript-eslint/utils/eslint-utils";

function getDocsUrl(ruleName: string) {
  return `https://eslint-react.xyz/docs/rules/${ruleName}`;
}

export const createRule = ESLintUtils.RuleCreator(getDocsUrl);
