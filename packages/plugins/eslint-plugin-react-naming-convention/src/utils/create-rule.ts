import { createRuleForPlugin } from "@eslint-react/shared";
// Workaround for @typescript-eslint/utils's TS2742 error.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ESLintUtils } from "@typescript-eslint/utils";

export const createRule = createRuleForPlugin("react-naming-convention");
