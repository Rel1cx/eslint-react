import { isFragmentElement } from "@eslint-react/core";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-shorthand-fragment";

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce using fragment syntax instead of 'Fragment' component",
    },
    messages: {
      preferShorthandFragment: "Use fragment shorthand syntax instead of 'Fragment' component.",
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
            messageId: "preferShorthandFragment",
            node,
          });
        }
      },
    };
  },
  defaultOptions: [],
});
