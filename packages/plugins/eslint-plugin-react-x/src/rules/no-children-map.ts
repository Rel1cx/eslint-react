import { isChildrenMap } from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-map";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallow `Children.map`.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noChildrenMap: "Using 'Children.map' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    MemberExpression(node) {
      if (isChildrenMap(context, node)) {
        context.report({
          messageId: "noChildrenMap",
          node: node.property,
        });
      }
    },
  };
}
