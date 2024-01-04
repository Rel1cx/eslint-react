import { isOneOf, NodeType } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

import { isFromPragma } from "../pragma";

// Workaround for @typescript-eslint/utils's TS2742 error.
type _ = (node: TSESTree.Identifier | TSESTree.MemberExpression, context: RuleContext) => boolean;

export const isCreateElement: _ = isFromPragma("createElement");

export const isCreateElementCall = (
  node: TSESTree.CallExpression,
  context: RuleContext,
) => {
  if (!isOneOf([NodeType.Identifier, NodeType.MemberExpression])(node.callee)) return false;

  return isCreateElement(node.callee, context);
};

export const isCloneElement: _ = isFromPragma("cloneElement");

export const isCloneElementCall = (
  node: TSESTree.CallExpression,
  context: RuleContext,
) => {
  if (!isOneOf([NodeType.Identifier, NodeType.MemberExpression])(node.callee)) return false;

  return isCloneElement(node.callee, context);
};
