import { isComponentWillMount, useComponentCollectorLegacy } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-component-will-mount";

export const RULE_FEATURES = [
  "MOD",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Replace usages of `componentWillMount` with `UNSAFE_componentWillMount`.",
    },
    fixable: "code",
    messages: {
      noComponentWillMount: "[Deprecated] Use 'UNSAFE_componentWillMount' instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  // Fast path: skip if `componentWillMount` is not present in the file
  if (!context.sourceCode.text.includes("componentWillMount")) return {};
  const { ctx, listeners } = useComponentCollectorLegacy();

  return {
    ...listeners,
    "Program:exit"(program) {
      for (const { node: component } of ctx.getAllComponents(program)) {
        const { body } = component.body;
        for (const member of body) {
          if (isComponentWillMount(member)) {
            context.report({
              messageId: "noComponentWillMount",
              node: member,
              fix(fixer) {
                if (!("key" in member)) {
                  return null;
                }
                return fixer.replaceText(member.key, "UNSAFE_componentWillMount");
              },
            });
          }
        }
      }
    },
  };
}
