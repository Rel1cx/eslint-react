import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "avoid-shorthand-fragment";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce using fragment component instead of shorthand fragment syntax",
    },
    messages: {
      AVOID_SHORTHAND_FRAGMENT: "Avoid shorthand fragment syntax, use fragment component instead.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXFragment(node) {
        context.report({
          messageId: "AVOID_SHORTHAND_FRAGMENT",
          node,
        });
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
