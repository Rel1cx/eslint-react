import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule } from "../../utils";

export const RULE_NAME = "no-component-will-mount";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'componentWillMount' with 'UNSAFE_componentWillMount'.",
    },
    fixable: "code",
    messages: {
      default: "[Deprecated] Use 'UNSAFE_componentWillMount' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `componentWillMount` is not present in the file
  if (!context.sourceCode.text.includes("componentWillMount")) return {};
  const { ctx, visitor } = core.useComponentCollectorLegacy(context);

  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { node: component } of ctx.getAllComponents(program)) {
          const { body } = component.body;
          for (const member of body) {
            if (core.isComponentWillMount(member)) {
              context.report({
                fix(fixer) {
                  if (!("key" in member)) {
                    return null;
                  }
                  return fixer.replaceText(member.key, "UNSAFE_componentWillMount");
                },
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
