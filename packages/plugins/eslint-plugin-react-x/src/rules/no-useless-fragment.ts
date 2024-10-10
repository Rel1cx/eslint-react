import * as AST from "@eslint-react/ast";
import { isFragmentElement } from "@eslint-react/core";
import * as JSX from "@eslint-react/jsx";
import type { RuleContext } from "@eslint-react/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";
import type { TSESTree } from "@typescript-eslint/utils";
import { isMatching, P } from "ts-pattern";

import { createRule } from "../utils";

export const RULE_NAME = "no-useless-fragment";

export type MessageID =
  | "noUselessFragment"
  | "noUselessFragmentInBuiltIn";

// eslint-disable-next-line @typescript-eslint/consistent-return
function check(
  node: TSESTree.JSXElement | TSESTree.JSXFragment,
  context: RuleContext,
  allowExpressions: boolean,
) {
  const initialScope = context.sourceCode.getScope(node);
  if (JSX.isKeyedElement(node, initialScope)) return;
  if (JSX.isBuiltInElement(node.parent)) context.report({ messageId: "noUselessFragmentInBuiltIn", node });
  if (node.children.length === 0) return context.report({ messageId: "noUselessFragment", node });
  const isChildren = AST.isOneOf([AST_NODE_TYPES.JSXElement, AST_NODE_TYPES.JSXFragment])(node.parent);
  const [firstChildren] = node.children;
  // <Foo content={<>ee eeee eeee ...</>} />
  if (allowExpressions && node.children.length === 1 && JSX.isLiteral(firstChildren) && !isChildren) return;
  if (!allowExpressions && isChildren) {
    // <Foo><>hello, world</></Foo>
    return context.report({ messageId: "noUselessFragment", node });
  } else if (!allowExpressions && !isChildren && node.children.length === 1) {
    // const foo = <>{children}</>;
    // return <>{children}</>;
    return context.report({ messageId: "noUselessFragment", node });
  }
  const nonPaddingChildren = node.children.filter((child) => !JSX.isPaddingSpaces(child));
  if (nonPaddingChildren.length > 1) return;
  if (nonPaddingChildren.length === 0) return context.report({ messageId: "noUselessFragment", node });
  const [first] = nonPaddingChildren;
  if (
    isMatching({ type: AST_NODE_TYPES.JSXExpressionContainer, expression: P.not(AST_NODE_TYPES.CallExpression) }, first)
  ) return;
  context.report({ messageId: "noUselessFragment", node });
}

type Options = [
  {
    allowExpressions: boolean;
  },
];

export default createRule<Options, MessageID>({
  meta: {
    type: "problem",
    docs: {
      description: "disallow unnecessary fragments",
    },
    messages: {
      noUselessFragment: "A fragment contains less than two children is unnecessary.",
      noUselessFragmentInBuiltIn: "A fragment placed inside a built-in component is unnecessary.",
    },
    schema: [{
      type: "object",
      properties: {
        allowExpressions: {
          type: "boolean",
        },
      },
      additionalProperties: false,
    }],
  },
  defaultOptions: [{
    allowExpressions: true,
  }],
  name: RULE_NAME,
  create(context, [option]) {
    const { allowExpressions = true } = option;
    return {
      JSXElement(node) {
        if (!isFragmentElement(node, context)) return;
        check(node, context, allowExpressions);
      },
      JSXFragment(node) {
        check(node, context, allowExpressions);
      },
    };
  },
});
