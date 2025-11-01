import * as AST from "@eslint-react/ast";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-dollar";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME> | "removeDollarSign";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents dollar signs from being inserted as text nodes before expressions.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
    },
    fixable: "code",
    hasSuggestions: true,
    messages: {
      jsxDollar:
        "Possible misused dollar sign in text node. If you want to explicitly display '$' character i.e. show price, you can use template literals.",
      removeDollarSign: "Remove the dollar sign '$' before the expression.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  const visitorFunction = (node: TSESTree.JSXElement | TSESTree.JSXFragment) => {
    for (const [index, child] of node.children.entries()) {
      if (child.type !== T.JSXText) continue;
      if (!child.raw.endsWith("$")) continue;
      if (node.children[index + 1]?.type !== T.JSXExpressionContainer) continue;
      context.report({
        messageId: "jsxDollar",
        node: child,
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
  return {
    JSXElement: visitorFunction,
    JSXFragment: visitorFunction,
  };
}
