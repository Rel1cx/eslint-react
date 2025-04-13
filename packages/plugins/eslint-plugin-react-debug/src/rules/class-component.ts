import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as ER from "@eslint-react/core";

import { createRule } from "../utils";

export const RULE_NAME = "class-component";

export const RULE_FEATURES = [
  "DBG",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Reports all class components.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      classComponent: "{{json}}",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const { ctx, listeners } = ER.useComponentCollectorLegacy();
  return {
    ...listeners,
    "Program:exit"(program) {
      const components = ctx.getAllComponents(program);
      for (const { name = "anonymous", node: component } of components.values()) {
        context.report({
          messageId: "classComponent",
          node: component,
          data: {
            json: JSON.stringify({ name }),
          },
        });
      }
    },
  };
}
