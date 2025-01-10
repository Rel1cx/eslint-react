import { useHookCollector } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "hook";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      // eslint-disable-next-line eslint-plugin/require-meta-docs-description
      description: "report all React Hooks",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      hook: "[hook] name: {{name}}, hookCalls: {{hookCalls}}.",
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

        for (const { name, node, hookCalls } of allHooks.values()) {
          context.report({
            messageId: "hook",
            node,
            data: {
              name,
              hookCalls: hookCalls.length,
            },
          });
        }
      },
    };
  },
  defaultOptions: [],
});
