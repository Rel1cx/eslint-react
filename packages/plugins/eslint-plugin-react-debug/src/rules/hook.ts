import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule, stringify } from "../utils";

export const RULE_NAME = "hook";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all React Hooks in JSON format.",
    },
    messages: {
      default: "{{json}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, visitor } = core.useHookCollector(context);

  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { name, node, hookCalls } of ctx.getAllHooks(program)) {
          context.report({
            messageId: "default",
            node,
            data: {
              json: stringify({
                name,
                hookCalls: hookCalls.length,
              }),
            },
          });
        }
      },
    },
  );
}
