import { isUnsafeComponentWillMount, useComponentCollectorLegacy } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-unsafe-component-will-mount";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Warns about the use of 'UNSAFE_componentWillMount' in class components.",
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
  // Fast path: skip if `UNSAFE_componentWillMount` is not present in the file
  if (!context.sourceCode.text.includes("UNSAFE_componentWillMount")) return {};
  const { ctx, listeners } = useComponentCollectorLegacy();

  return {
    ...listeners,
    "Program:exit"(program) {
      for (const { node: component } of ctx.getAllComponents(program)) {
        const { body } = component.body;

        for (const member of body) {
          if (isUnsafeComponentWillMount(member)) {
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
