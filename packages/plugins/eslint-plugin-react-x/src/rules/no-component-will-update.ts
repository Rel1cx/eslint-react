import { isComponentWillUpdate, useComponentCollectorLegacy } from "@eslint-react/core";
import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-component-will-update";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replaces usage of 'componentWillUpdate' with 'UNSAFE_componentWillUpdate'.",
    },
    fixable: "code",
    messages: {
      noComponentWillUpdate: "[Deprecated] Use 'UNSAFE_componentWillUpdate' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `componentWillUpdate` is not present in the file
  if (!context.sourceCode.text.includes("componentWillUpdate")) return {};
  const { ctx, visitors } = useComponentCollectorLegacy(context);

  return defineRuleListener(
    visitors,
    {
      "Program:exit"(program) {
        for (const { node: component } of ctx.getAllComponents(program)) {
          const { body } = component.body;
          for (const member of body) {
            if (isComponentWillUpdate(member)) {
              context.report({
                messageId: "noComponentWillUpdate",
                node: member,
                fix(fixer) {
                  if (!("key" in member)) {
                    return null;
                  }
                  return fixer.replaceText(member.key, "UNSAFE_componentWillUpdate");
                },
              });
            }
          }
        }
      },
    },
  );
}
