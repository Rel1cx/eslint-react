import { ESLintUtils } from "@typescript-eslint/utils";

export const documentBaseURL = "https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/rules";

export const createEslintRule = ESLintUtils.RuleCreator((ruleName) => `${documentBaseURL}/${ruleName}.md`);
