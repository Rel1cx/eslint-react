import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import { createRule } from "../utils";

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
  const { ctx, visitor } = core.useComponentCollectorLegacy(context);

  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { node: component } of ctx.getAllComponents(program)) {
          const { body } = component.body;

          for (const member of body) {
            if (core.isUnsafeComponentWillUpdate(member)) {
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
