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
    if (!context.sourceCode.text.includes("use")) return {};
    const { ctx, listeners } = useHookCollector();

    return {
      ...listeners,
      "Program:exit"(node) {
        const allHooks = ctx.getAllHooks(node);
        for (const { name, node, hookCalls } of allHooks.values()) {
          if (hookCalls.length > 0) continue;
          context.report({
            messageId: "ensureCustomHooksUsingOtherHooks",
            node,
            data: {
              name: name.value,
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
