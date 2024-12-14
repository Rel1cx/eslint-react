import { isChildrenMap } from "@eslint-react/core";
import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-children-map";

export const RULE_FEATURES = [
  "LNT",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using 'Children.map'",
    },
    messages: {
      noChildrenMap: "Using 'Children.map' is uncommon and can lead to fragile code. Use alternatives instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      MemberExpression(node) {
        if (isChildrenMap(node, context)) {
          context.report({
            messageId: "noChildrenMap",
            node: node.property,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
