import * as TSEUtils from "@typescript-eslint/utils";

export const documentBaseURL = "https://github.com/Rel1cx/eslint-plugin-react-ts/blob/main/docs/rules";

export const createEslintRule = TSEUtils.ESLintUtils.RuleCreator((ruleName) => `${documentBaseURL}/${ruleName}.md`);
