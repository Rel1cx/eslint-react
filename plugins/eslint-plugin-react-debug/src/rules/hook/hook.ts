import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";

import { createRule } from "../../utils/create-rule";
import { stringify } from "../../utils/stringify";

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

export function create(context: RuleContext<MessageID, []>) {
  const { api, visitor } = core.getHookCollector(context);

  return merge(
    visitor,
    {
      "Program:exit"(program) {
        for (const { name, hookCalls, node } of api.getAllHooks(program)) {
          context.report({
            data: {
              json: stringify({
                name,
                hookCalls: hookCalls.length,
              }),
            },
            messageId: "default",
            node,
          });
        }
      },
    },
  );
}
