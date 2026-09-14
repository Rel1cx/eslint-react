/* tsl-ignore dx/no-duplicate-imports */
import { createRule } from "@/utils/create-rule";
import { stringify } from "@/utils/stringify";
import * as core from "@eslint-react/core";
import { type RichContext, buildRichContext } from "@eslint-react/core";
import { type RuleFeature, type RuleListener, merge } from "@eslint-react/eslint";

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
  create: (context) => create(buildRichContext(context)),
  defaultOptions: [],
});

export function create(context: RichContext<MessageID, []>): RuleListener {
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
