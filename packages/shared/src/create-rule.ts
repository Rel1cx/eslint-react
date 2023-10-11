import { ESLintUtils } from "@typescript-eslint/utils";

import { BASEURL_DOCS } from "./constants";

const getDocsUrl = (ruleName: string) => `${BASEURL_DOCS}/${ruleName}.md`;

export const createRule = ESLintUtils.RuleCreator(getDocsUrl);
