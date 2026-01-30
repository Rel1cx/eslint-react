import * as ast from "@eslint-react/ast";
import type { RuleContext, RuleFeature } from "@eslint-react/shared";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-no-comment-textnodes";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description:
        "Prevents comment strings (e.g., beginning with '//' or '/*') from being accidentally inserted into a JSX element's text nodes.",
    },
    messages: {
      jsxNoCommentTextnodes:
        "Possible misused comment in text node. Comments inside children section of tag should be placed inside braces.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>): RuleListener {
  function hasCommentLike(node: TSESTree.JSXText | TSESTree.Literal) {
    // If the node is within a JSX attribute or expression container, it's not a text node comment
    if (ast.isOneOf([AST.JSXAttribute, AST.JSXExpressionContainer])(node.parent)) {
      return false;
    }
    // Examines the node's raw text to see if it starts with '//' or '/*'
    return /^\s*\/(?:\/|\*)/mu.test(context.sourceCode.getText(node));
  }
  const visitorFunction = (node: TSESTree.JSXText | TSESTree.Literal): void => {
    // Ensures the node is a direct child of a JSX element or fragment
    if (!ast.isOneOf([AST.JSXElement, AST.JSXFragment])(node.parent)) {
      return;
    }
    if (!hasCommentLike(node)) {
      return;
    }
    context.report({
      messageId: "jsxNoCommentTextnodes",
      node,
    });
  };
  return {
    JSXText: visitorFunction,
    Literal: visitorFunction,
  };
}
