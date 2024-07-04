import { useHookCollector } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "react-hooks";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "report all React Hooks",
    },
    messages: {
      REACT_HOOKS: "[react hooks] name: {{name}}, hookCalls: {{hookCalls}}.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    const { ctx, listeners } = useHookCollector();

    return {
      ...listeners,
      "Program:exit"(node) {
        const allHooks = ctx.getAllHooks(node);

        for (const { name, hookCalls, node } of allHooks.values()) {
          context.report({
            data: {
              name: name.value,
              hookCalls: hookCalls.length,
            },
            messageId: "REACT_HOOKS",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
