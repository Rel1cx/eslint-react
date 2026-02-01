import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "no-component-will-receive-props";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'componentWillReceiveProps' with 'UNSAFE_componentWillReceiveProps'.",
    },
    fixable: "code",
    messages: {
      default: "[Deprecated] Use 'UNSAFE_componentWillReceiveProps' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `componentWillReceiveProps` is not present in the file
  if (!context.sourceCode.text.includes("componentWillReceiveProps")) return {};
  const { ctx, visitor } = core.useComponentCollectorLegacy(context);

  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { node: component } of ctx.getAllComponents(program)) {
          const { body } = component.body;
          for (const member of body) {
            if (core.isComponentWillReceiveProps(member)) {
              context.report({
                messageId: "default",
                node: member,
                fix(fixer) {
                  if (!("key" in member)) {
                    return null;
                  }
                  return fixer.replaceText(member.key, "UNSAFE_componentWillReceiveProps");
                },
              });
            }
          }
        }
      },
    },
  );
}
