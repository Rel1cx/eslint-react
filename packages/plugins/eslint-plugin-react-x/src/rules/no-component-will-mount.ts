import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";

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
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
  if (!context.sourceCode.text.includes("componentWillMount")) return {};
  const { ctx, listeners } = ER.useComponentCollectorLegacy();

  return {
    ...listeners,
    "Program:exit"(program) {
      const components = ctx.getAllComponents(program);
      for (const { node: component } of components.values()) {
        const { body } = component.body;
        for (const member of body) {
          if (ER.isComponentWillMount(member)) {
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
