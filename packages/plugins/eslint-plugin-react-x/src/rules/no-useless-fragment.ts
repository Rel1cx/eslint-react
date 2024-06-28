import { isOneOf, NodeType } from "@eslint-react/ast";
import { isFragmentElement } from "@eslint-react/core";
import { isBuiltInElement, isKeyedElement, isLiteral, isPaddingSpaces } from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export type MessageID =
  | "NO_USELESS_FRAGMENT"
  | "NO_USELESS_FRAGMENT_IN_BUILT_IN";

function check(
  node: TSESTree.JSXElement | TSESTree.JSXFragment,
  context: RuleContext,
) {
  if (isKeyedElement(node, context)) return;
  if (isBuiltInElement(node.parent)) context.report({ messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN", node });
  if (node.children.length === 0) return context.report({ messageId: "NO_USELESS_FRAGMENT", node });
  const isChildren = isOneOf([NodeType.JSXElement, NodeType.JSXFragment])(node.parent);
  const firstChildren = node.children[0];
  // <Foo content={<>ee eeee eeee ...</>} />
  if (node.children.length === 1 && isLiteral(firstChildren) && !isChildren) return;
  const nonPaddingChildren = node.children.filter((child) => !isPaddingSpaces(child));
  if (nonPaddingChildren.length > 1) return;
  if (nonPaddingChildren.length === 0) return context.report({ messageId: "NO_USELESS_FRAGMENT", node });
  const first = nonPaddingChildren[0];
  if (isMatching({ type: NodeType.JSXExpressionContainer, expression: P.not(NodeType.CallExpression) }, first)) return;
  context.report({ messageId: "NO_USELESS_FRAGMENT", node });
}

export default createRule<[], MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unnecessary fragments",
      recommended: "recommended",
      requiresTypeChecking: false,
    },
    messages: {
      NO_USELESS_FRAGMENT: "A fragment contains less than two children is unnecessary.",
      NO_USELESS_FRAGMENT_IN_BUILT_IN: "A fragment placed inside a built-in component is unnecessary.",
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
