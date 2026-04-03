import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { createRule } from "../../utils";

import { getComponentCollectorLegacy, isUnsafeComponentWillUpdate } from "./lib";

export const RULE_NAME = "no-unsafe-component-will-update";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns about the use of 'UNSAFE_componentWillUpdate' in class components.",
    },
    messages: {
      default: "Do not use 'UNSAFE_componentWillUpdate'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `UNSAFE_componentWillUpdate` is not present in the file
  if (!context.sourceCode.text.includes("UNSAFE_componentWillUpdate")) return {};
  const { api, visitor } = getComponentCollectorLegacy(context);

  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { node: component } of api.getAllComponents(program)) {
          const { body } = component.body;

          for (const member of body) {
            if (isUnsafeComponentWillUpdate(member)) {
              context.report({
                messageId: "default",
                node: member,
              });
            }
          }
        }
      },
    },
  );
}
