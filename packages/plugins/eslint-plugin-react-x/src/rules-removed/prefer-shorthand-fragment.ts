import * as ER from "@eslint-react/core";
import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-shorthand-fragment";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    deprecated: true,
    docs: {
      description: "Enforces shorthand syntax for fragments.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      preferShorthandFragment: "Use fragment shorthand syntax instead of 'Fragment' component.",
    },
    replacedBy: [
      "react-x/jsx-shorthand-fragment",
    ],
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    JSXElement(node: TSESTree.JSXElement) {
      if (!ER.isFragmentElement(context, node)) return;
      const hasAttributes = node.openingElement.attributes.length > 0;
      if (hasAttributes) {
        return;
      }
      context.report({
        messageId: "preferShorthandFragment",
        node,
        fix: (fixer) => {
          const { closingElement, openingElement } = node;
          if (closingElement == null) {
            return [];
          }
          return [
            fixer.replaceTextRange([openingElement.range[0], openingElement.range[1]], "<>"),
            fixer.replaceTextRange([closingElement.range[0], closingElement.range[1]], "</>"),
          ];
        },
      });
    },
  };
}
