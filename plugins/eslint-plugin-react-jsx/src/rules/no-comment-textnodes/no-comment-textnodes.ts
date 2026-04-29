import { createRule } from "@/utils/create-rule";
import { Check, isOneOf } from "@eslint-react/ast";
import { type RuleContext, type RuleFeature, merge } from "@eslint-react/eslint";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

export const RULE_NAME = "no-comment-textnodes";

export const RULE_FEATURES = [] as const satisfies RuleFeature[];

export type MessageID = "default";

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "Prevents comment strings from being accidentally inserted into a JSX element's text nodes.",
    },
    messages: {
      default:
        "Possible misused comment in text node. Comments inside children section of tag should be placed inside braces.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create,
  defaultOptions: [],
});

export function create(context: RuleContext<MessageID, []>) {
  function hasCommentLike(node: TSESTree.JSXText | TSESTree.Literal) {
    // If the node is within a JSX attribute or expression container, it's not a text node comment
    if (isOneOf([AST.JSXAttribute, AST.JSXExpressionContainer])(node.parent)) {
      return false;
    }
    // Examines the node's raw text to see if it starts with '//' or '/*'
    return /^\s*\/(?:\/|\*)/mu.test(context.sourceCode.getText(node));
  }
  const visitorFunction = (node: TSESTree.JSXText | TSESTree.Literal): void => {
    // Ensures the node is a direct child of a JSX element or fragment
    if (!Check.isJSXElementOrFragment(node.parent)) {
      return;
    }
    if (!hasCommentLike(node)) {
      return;
    }
    context.report({
      messageId: "default",
      node,
    });
  };
  return merge(
    {
      JSXText: visitorFunction,
      Literal: visitorFunction,
    },
  );
}
