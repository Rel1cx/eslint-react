import { isOneOf } from "@eslint-react/ast";
import { isFragmentElement } from "@eslint-react/core";
import { isBuiltInElement, isKeyedElement, isLiteral, isPaddingSpaces } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export type MessageID =
  | "noUselessFragment"
  | "noUselessFragmentInBuiltIn";

function check(
  node: TSESTree.JSXElement | TSESTree.JSXFragment,
  context: RuleContext,
) {
  if (isKeyedElement(node, context)) return;
  if (isBuiltInElement(node.parent)) context.report({ messageId: "noUselessFragmentInBuiltIn", node });
  if (node.children.length === 0) return context.report({ messageId: "noUselessFragment", node });
  const isChildren = isOneOf([AST_NODE_TYPES.JSXElement, AST_NODE_TYPES.JSXFragment])(node.parent);
  const firstChildren = node.children[0];
  // <Foo content={<>ee eeee eeee ...</>} />
  if (node.children.length === 1 && isLiteral(firstChildren) && !isChildren) return;
  const nonPaddingChildren = node.children.filter((child) => !isPaddingSpaces(child));
  if (nonPaddingChildren.length > 1) return;
  if (nonPaddingChildren.length === 0) return context.report({ messageId: "noUselessFragment", node });
  const first = nonPaddingChildren[0];
  if (
    isMatching({ type: AST_NODE_TYPES.JSXExpressionContainer, expression: P.not(AST_NODE_TYPES.CallExpression) }, first)
  ) return;
  context.report({ messageId: "noUselessFragment", node });
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unnecessary fragments",
    },
    messages: {
      noUselessFragment: "A fragment contains less than two children is unnecessary.",
      noUselessFragmentInBuiltIn: "A fragment placed inside a built-in component is unnecessary.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    return {
      JSXElement(node) {
        if (!isFragmentElement(node, context)) return;
        check(node, context);
      },
      JSXFragment(node) {
        check(node, context);
      },
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
