import { ESLintUtils } from "@typescript-eslint/utils";

function getDocsUrl() {
  return "TODO: add docs for local ESLint rules";
}

export const createRule = ESLintUtils.RuleCreator(getDocsUrl);
