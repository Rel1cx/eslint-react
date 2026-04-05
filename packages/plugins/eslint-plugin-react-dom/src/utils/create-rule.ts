import { ESLintUtils } from "@typescript-eslint/utils";

function getDocsUrl(ruleName: string) {
  return `https://eslint-react.xyz/docs/rules/dom-${ruleName}`;
}

export const createRule = ESLintUtils.RuleCreator(getDocsUrl);
