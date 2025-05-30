import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-component-will-mount";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns the usage of `UNSAFE_componentWillMount` in class components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noUnsafeComponentWillMount: "Do not use 'UNSAFE_componentWillMount'.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  if (!context.sourceCode.text.includes("UNSAFE_componentWillMount")) return {};
  const { ctx, listeners } = ER.useComponentCollectorLegacy();

  return {
    ...listeners,
    "Program:exit"(program) {
      const components = ctx.getAllComponents(program);

      for (const { node: component } of components.values()) {
        const { body } = component.body;

        for (const member of body) {
          if (ER.isUnsafeComponentWillMount(member)) {
            context.report({
              messageId: "noUnsafeComponentWillMount",
              node: member,
            });
          }
        }
      }
    },
  };
}
