import type * as ast from "@eslint-react/ast";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-no-iife";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows immediately-invoked function expressions in JSX.",
    },
    messages: {
      default: "Avoid using immediately-invoked function expressions in JSX.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    "JSXElement :function"(node: ast.TSESTreeFunction) {
      if (node.parent.type === AST.CallExpression && node.parent.callee === node) {
        context.report({
          messageId: "default",
          node: node.parent,
        });
      }
    },
    "JSXFragment :function"(node: ast.TSESTreeFunction) {
      if (node.parent.type === AST.CallExpression && node.parent.callee === node) {
        context.report({
          messageId: "default",
          node: node.parent,
        });
      }
    },
  };
}
