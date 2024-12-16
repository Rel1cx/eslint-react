import { isChildrenForEach } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-for-each";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'Children.forEach'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noChildrenForEach: "Using 'Children.forEach' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      MemberExpression(node) {
        if (isChildrenForEach(node, context)) {
          context.report({
            messageId: "noChildrenForEach",
            node: node.property,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
