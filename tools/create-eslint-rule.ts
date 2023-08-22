import { ESLintUtils } from "@typescript-eslint/utils";

export const BASEURL_RULE = "https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/rules";

export const BASEURL_CONFIGS = "https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/configs";

export const BASEURL_DOCS = "https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules";

export const createEslintRule = ESLintUtils.RuleCreator((ruleName) => `${BASEURL_DOCS}/${ruleName}.md`);
