import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-dollar";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME> | RuleSuggestMessageID;

export type RuleSuggestMessageID = "removeDollarSign";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents dollar signs from being inserted as text nodes before expressions.",
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      jsxDollar: "Possible unnecessary '$' character before expression.",
      removeDollarSign: "Remove the dollar sign '$' before the expression.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  /**
   * Visitor function for JSXElement and JSXFragment nodes
   * @param node The JSXElement or JSXFragment node to be checked
   */
  const visitorFunction = (node: TSESTree.JSXElement | TSESTree.JSXFragment) => {
    for (const [index, child] of node.children.entries()) {
      if (child.type !== T.JSXText || !child.value.endsWith("$")) continue;
      // Ensure the next sibling is a JSXExpressionContainer
      if (node.children[index + 1]?.type !== T.JSXExpressionContainer) continue;
      // Skip if there are only two children (the dollar sign and the expression) it doesn't seem to be split from a template literal
      if (child.value === "$" && node.children.length === 2) continue;
      const pos = child.loc.end;
      context.report({
        messageId: "jsxDollar",
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
  return { JSXElement: visitorFunction, JSXFragment: visitorFunction };
}
