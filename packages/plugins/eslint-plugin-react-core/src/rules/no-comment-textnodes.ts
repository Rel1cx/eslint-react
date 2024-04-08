import { isOneOf } from "@eslint-react/ast";
import { type TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as N } from "@typescript-eslint/types";
import type { ESLintUtils } from "@typescript-eslint/utils";
import type { ConstantCase } from "string-ts";

import { createRule } from "../utils";

export const RULE_NAME = "no-comment-textnodes";

export type MessageID = ConstantCase<typeof RULE_NAME>;

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow comments from being inserted as text nodes",
      requiresTypeChecking: false,
    },
    messages: {
      NO_COMMENT_TEXTNODES:
        "Possible misused comment in text node. Comments inside children section of tag should be placed inside braces.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function checkText(node: TSESTree.JSXText | TSESTree.Literal) {
      if (isOneOf([N.JSXAttribute, N.JSXExpressionContainer])(node.parent)) return false;
      const rawValue = context.sourceCode.getText(node);

      return /^\s*\/(\/|\*)/mu.test(rawValue) && node.parent.type.includes("JSX");
    }

    const check = (node: TSESTree.JSXText | TSESTree.Literal) => {
      if (!isOneOf([N.JSXElement, N.JSXFragment])(node.parent)) return;
      if (!checkText(node)) return;

      context.report({
        messageId: "NO_COMMENT_TEXTNODES",
        node,
      });
    };

    return {
      JSXText: check,
      Literal: check,
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
