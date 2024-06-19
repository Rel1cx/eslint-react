import { isFragmentElement } from "@eslint-react/core";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-shorthand-fragment";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce using fragment syntax instead of Fragment component",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      PREFER_SHORTHAND_FRAGMENT: "Prefer shorthand fragment syntax instead of fragment component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXElement(node) {
        if (isFragmentElement(node, context)) {
          const hasAttributes = node.openingElement.attributes.length > 0;
          if (hasAttributes) return;
          context.report({
            messageId: "PREFER_SHORTHAND_FRAGMENT",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
