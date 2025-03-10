import * as JSX from "@eslint-react/jsx";
import type { RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "prefer-shorthand-fragment";

export const RULE_FEATURES = [
  "CHK",
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "enforce the use of shorthand syntax for fragments",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    messages: {
      preferShorthandFragment: "Use fragment shorthand syntax instead of 'Fragment' component.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXElement(node: TSESTree.JSXElement) {
        if (!JSX.isFragmentElement(node)) return;
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
  },
  defaultOptions: [],
});
