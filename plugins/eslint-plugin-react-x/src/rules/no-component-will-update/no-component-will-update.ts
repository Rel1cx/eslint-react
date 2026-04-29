import * as core from "@eslint-react/core";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";

import { createRule } from "@/utils/create-rule";

export const RULE_NAME = "no-component-will-update";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'componentWillUpdate' with 'UNSAFE_componentWillUpdate'.",
    },
    fixable: "code",
    messages: {
      default: "[Deprecated] Use 'UNSAFE_componentWillUpdate' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  // Fast path: skip if `componentWillUpdate` is not present in the file
  if (!context.sourceCode.text.includes("componentWillUpdate")) return {};
  const { api, visitor } = core.getClassComponentCollector(context);

  return merge(
    visitor,
    {
      "Program:exit"(program) {
        for (const { node: component } of api.getAllComponents(program)) {
          const { body } = component.body;
          for (const member of body) {
            if (core.isComponentWillUpdate(member)) {
              context.report({
                fix(fixer) {
                  if (!("key" in member)) {
                    return null;
                  }
                  return fixer.replaceText(member.key, "UNSAFE_componentWillUpdate");
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
