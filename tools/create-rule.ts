import { ESLintUtils } from "@typescript-eslint/utils";

export const BASEURL_RULE = "https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/src/rules";

export const BASEURL_CONFIGS = "https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/src/configs";

export const BASEURL_DOCS = "https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules";

const getDocsUrl = (ruleName: string) => `${BASEURL_DOCS}/${ruleName}.md`;

export const createRule = ESLintUtils.RuleCreator(getDocsUrl);
