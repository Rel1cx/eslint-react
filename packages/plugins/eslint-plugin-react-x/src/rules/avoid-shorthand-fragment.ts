import type { ESLintUtils } from "@typescript-eslint/utils";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "avoid-shorthand-fragment";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "avoid using shorthand fragment syntax",
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
}) satisfies ESLintUtils.RuleModule<MessageID>;
