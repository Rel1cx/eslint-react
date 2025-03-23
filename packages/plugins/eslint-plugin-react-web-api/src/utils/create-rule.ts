import { getDocsUrl } from "@eslint-react/shared";
import { ESLintUtils } from "@typescript-eslint/utils";

export const createRule = ESLintUtils.RuleCreator(getDocsUrl("web-api"));
