import type { ESLintUtils } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "context";

export type MessageID = "CONTEXT_PROVIDER" | "CONTEXT_PROVIDER_WITH_VALUE";

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "suggestion",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "reports all context providers",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      CONTEXT_PROVIDER: "context provider found, name: {{name}}",
      CONTEXT_PROVIDER_WITH_VALUE: "context provider with value found, name: {{name}}",
    },
  },
  defaultOptions: [],
  create() {
    return {
      // TODO: implement this
    };
  },
});
