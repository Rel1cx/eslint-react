import type * as AST from "@eslint-react/ast";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";

import { AST_NODE_TYPES as T } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import { createRule } from "../utils";

export const RULE_NAME = "jsx-no-iife";

export const RULE_FEATURES = [
  "EXP",
] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Disallows 'IIFE' in JSX elements.",
    },
    messages: {
      jsxNoIife: "Avoid using IIFE in JSX elements.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  return {
    "JSXElement :function"(node: AST.TSESTreeFunction) {
      if (node.parent.type === T.CallExpression && node.parent.callee === node) {
        context.report({
          messageId: "jsxNoIife",
          node: node.parent,
        });
      }
    },
    "JSXFragment :function"(node: AST.TSESTreeFunction) {
      if (node.parent.type === T.CallExpression && node.parent.callee === node) {
        context.report({
          messageId: "jsxNoIife",
          node: node.parent,
        });
      }
    },
  };
}
