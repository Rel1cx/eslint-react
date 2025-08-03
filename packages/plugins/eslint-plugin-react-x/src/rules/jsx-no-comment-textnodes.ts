import type { RuleContext, RuleFeature } from "@eslint-react/kit";
import type { TSESTree } from "@typescript-eslint/types";
import type { RuleListener } from "@typescript-eslint/utils/ts-eslint";
import type { CamelCase } from "string-ts";
import * as AST from "@eslint-react/ast";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

import { createRule } from "../utils";

export const RULE_NAME = "jsx-no-comment-textnodes";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = CamelCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents comments from being inserted as text nodes.",
      [Symbol.for("rule_features")]: RULE_FEATURES,
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
    if (AST.isOneOf([T.JSXAttribute, T.JSXExpressionContainer])(node.parent)) {
      return false;
    }
    const rawValue = context.sourceCode.getText(node);
    return /^\s*\/(?:\/|\*)/mu.test(rawValue);
  }
  const visitorFunction = (node: TSESTree.JSXText | TSESTree.Literal): void => {
    if (!AST.isOneOf([T.JSXElement, T.JSXFragment])(node.parent)) {
      return;
    }
    if (!hasCommentLike(node)) {
      return;
    }
    if (!node.parent.type.includes("JSX")) {
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
