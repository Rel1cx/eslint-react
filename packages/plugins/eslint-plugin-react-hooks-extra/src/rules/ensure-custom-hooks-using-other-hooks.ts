import { useHookCollector } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "ensure-custom-hooks-using-other-hooks";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce custom hooks using other hooks",
    },
    messages: {
      ensureCustomHooksUsingOtherHooks: "A custom hook '{{name}}' should use other hooks.",
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
          if (hookCalls.length > 0) continue;
          context.report({
            data: {
              name: name.value,
            },
            messageId: "ensureCustomHooksUsingOtherHooks",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
