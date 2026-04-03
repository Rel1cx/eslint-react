import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule, stringify } from "../../utils";
import { getComponentCollectorLegacy } from "./lib";

export const RULE_NAME = "class-component";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all class components in JSON format.",
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
  const { api, visitor } = getComponentCollectorLegacy(context);
  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { name = "anonymous", node: component } of api.getAllComponents(program)) {
          context.report({
            data: {
              json: stringify({ name }),
            },
            messageId: "default",
            node: component,
          });
        }
      },
    },
  );
}
