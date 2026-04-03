import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";

import { createRule } from "../../utils";
import { getComponentCollectorLegacy, isComponentWillReceiveProps } from "./lib";

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

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `componentWillReceiveProps` is not present in the file
  if (!context.sourceCode.text.includes("componentWillReceiveProps")) return {};
  const { api, visitor } = getComponentCollectorLegacy(context);

  return defineRuleListener(
    visitor,
    {
      "Program:exit"(program) {
        for (const { node: component } of api.getAllComponents(program)) {
          const { body } = component.body;
          for (const member of body) {
            if (isComponentWillReceiveProps(member)) {
              context.report({
                fix(fixer) {
                  if (!("key" in member)) {
                    return null;
                  }
                  return fixer.replaceText(member.key, "UNSAFE_componentWillReceiveProps");
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
