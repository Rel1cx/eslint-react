import type { RuleFeature } from "@eslint-react/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "avoid-shorthand-fragment";

export const RULE_FEATURES = [
  "CHK",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow using shorthand fragment syntax",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    messages: {
      avoidShorthandFragment: "Avoid using shorthand fragment syntax. Use 'Fragment' component instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXFragment(node) {
        context.report({
          messageId: "avoidShorthandFragment",
          node,
        });
      },
    };
  },
  defaultOptions: [],
});
