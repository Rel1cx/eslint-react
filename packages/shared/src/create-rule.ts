/* eslint-disable @typescript-eslint/no-unnecessary-type-arguments */
import { ESLintUtils } from "@typescript-eslint/utils";

import { BASEURL_DOCS } from "./constants";

const getDocsUrl = (ruleName: string) => `${BASEURL_DOCS}/${ruleName}.md`;

export const createRule: <TOptions extends readonly unknown[], TMessageIds extends string>(
    { name, meta, ...rule }: Readonly<ESLintUtils.RuleWithMetaAndName<TOptions, TMessageIds>>,
) => ESLintUtils.RuleModule<TMessageIds, TOptions, ESLintUtils.RuleListener> = ESLintUtils.RuleCreator(getDocsUrl);
