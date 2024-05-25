import { NodeType } from "@eslint-react/ast";
import { isFragmentElement } from "@eslint-react/core";
import { hasProp, isJSXElementOfBuiltinComponent, isLiteral, isPaddingSpaces } from "@eslint-react/jsx";
import type { ESLintUtils, TSESTree } from "@typescript-eslint/utils";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export type MessageID =
  | "NO_USELESS_FRAGMENT"
  | "NO_USELESS_FRAGMENT_IN_BUILT_IN";

const allowExpressions = true;

/**
 * Check if a JSXElement or JSXFragment has only one literal child and is not a child
 * @param node The AST node to check
 * @returns `true` if the node has only one literal child and is not a child
 * @example Somehow fragment like this is useful: <Foo content={<>ee eeee eeee ...</>} />
 */
function isFragmentWithOnlyTextAndIsNotChild(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  return node.children.length === 1
    && isLiteral(node.children[0])
    && !(node.parent.type === NodeType.JSXElement || node.parent.type === NodeType.JSXFragment);
}

function containsCallExpression(node: TSESTree.Node) {
  return node.type === NodeType.JSXExpressionContainer
    && node.expression.type === NodeType.CallExpression;
}

/**
 * Check if a JSXElement or JSXFragment has less than two non-padding children and the first child is not a call expression
 * @param node The AST node to check
 * @returns boolean
 */
function isFragmentHasLessThanTwoChildren(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  const nonPaddingChildren = node.children.filter(
    (child) => !isPaddingSpaces(child),
  );

  if (nonPaddingChildren.length === 1 && nonPaddingChildren[0]) {
    return !containsCallExpression(nonPaddingChildren[0]);
  }

  return nonPaddingChildren.length === 0;
}

function isFragmentWithSingleExpression(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
  const children = node.children.filter((child) => !isPaddingSpaces(child));

  return (
    children.length === 1
    && children[0]?.type === NodeType.JSXExpressionContainer
  );
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
      NO_USELESS_FRAGMENT: "A fragment containing a single element is usually unnecessary.",
      NO_USELESS_FRAGMENT_IN_BUILT_IN: "Passing a fragment to a host component is unnecessary.",
    },
    schema: [],
  },
  name: RULE_NAME,
  create(context) {
    function checkNode(node: TSESTree.JSXElement | TSESTree.JSXFragment) {
      const initialScope = context.sourceCode.getScope(node);

      if (
        node.type === NodeType.JSXElement
        && hasProp(
          node.openingElement.attributes,
          "key",
          context,
          initialScope,
        )
      ) {
        return;
      }

      if (
        isFragmentHasLessThanTwoChildren(node)
        && !isFragmentWithOnlyTextAndIsNotChild(node)
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        && !(allowExpressions && isFragmentWithSingleExpression(node))
      ) {
        context.report({
          messageId: "NO_USELESS_FRAGMENT",
          node,
        });
      }

      if (
        node.parent.type === NodeType.JSXElement
        && isJSXElementOfBuiltinComponent(node.parent)
      ) {
        context.report({
          messageId: "NO_USELESS_FRAGMENT_IN_BUILT_IN",
          node,
        });
      }
    }

    return {
      JSXElement(node) {
        if (isFragmentElement(node, context)) {
          checkNode(node);
        }
      },
      JSXFragment: checkNode,
    };
  },
  defaultOptions: [],
}) satisfies ESLintUtils.RuleModule<MessageID>;
