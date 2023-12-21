import { hookCollector } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";
export const RULE_NAME = "react-hooks";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  name: RULE_NAME,
  meta: {
    type: "problem",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all React Hooks",
      requiresTypeChecking: false,
    },
    schema: [],
    messages: {
      REACT_HOOKS: "[react hooks] name: {{name}}, hookCalls: {{hookCalls}}",
    },
  },
  defaultOptions: [],
  create(context) {
    const { ctx, listeners } = hookCollector();

    return {
      ...listeners,
      "Program:exit"(node) {
        const allHooks = ctx.getAllHooks(node);

        for (const { name, hookCalls, node } of allHooks.values()) {
          context.report({
            data: {
              name,
              hookCalls: hookCalls.length,
            },
            messageId: "REACT_HOOKS",
            node,
          });
        }
      },
    };
  },
});
