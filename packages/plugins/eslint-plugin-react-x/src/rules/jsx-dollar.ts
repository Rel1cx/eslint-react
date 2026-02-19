import { type RuleContext, type RuleFeature, defineRuleListener } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-dollar";

export const RULE_FEATURES = [
  "FIX",
] as const satisfies RuleFeature[];

export type MessageID = "default" | RuleSuggestMessageID;

export type RuleSuggestMessageID = "removeDollarSign";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents unintentional '$' sign before expression.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      default: "Prevents unintentional '$' sign before expression.",
      removeDollarSign: "Remove the dollar sign '$' before the expression.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  /**
   * Visitor function for JSXElement and JSXFragment nodes
   * @param node The JSXElement or JSXFragment node to be checked
   */
  const visitorFunction = (node: TSESTree.JSXElement | TSESTree.JSXFragment) => {
    for (const [index, child] of node.children.entries()) {
      if (child.type !== AST.JSXText || !child.value.endsWith("$")) continue;
      // Ensure the next sibling is a JSXExpressionContainer
      if (node.children[index + 1]?.type !== AST.JSXExpressionContainer) continue;
      // Skip if there are only two children (the dollar sign and the expression) it doesn't seem to be split from a template literal
      if (child.value === "$" && node.children.length === 2) continue;
      const pos = child.loc.end;
      context.report({
        messageId: "default",
        node: child,
        loc: {
          end: {
            column: pos.column,
            line: pos.line,
          },
          start: {
            column: pos.column - 1,
            line: pos.line,
          },
        },
        suggest: [
          {
            messageId: "removeDollarSign",
            fix(fixer) {
              return fixer.removeRange([child.range[1] - 1, child.range[1]]);
            },
          },
        ],
      });
    }
  };
  return defineRuleListener({ JSXElement: visitorFunction, JSXFragment: visitorFunction });
}
