import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";

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
      description: "Reports all React Hooks.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      hook: "[hook] name: {{name}}, hookCalls: {{hookCalls}}.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, listeners } = ER.useHookCollector();

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
}
