import { isChildrenOnly } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/shared";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-only";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'Children.only'",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      noChildrenOnly: "Using 'Children.only' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      MemberExpression(node) {
        if (isChildrenOnly(context, node)) {
          context.report({
            messageId: "noChildrenOnly",
            node: node.property,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
