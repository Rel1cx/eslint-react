import { isOneOf, NodeType } from "@eslint-react/ast";
import type { RuleContext } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";

import { isFromPragma } from "../pragma";

export const isCreateElement = isFromPragma("createElement");

export const isCreateElementCall = (
  node: TSESTree.CallExpression,
  context: RuleContext,
) => {
  if (!isOneOf([NodeType.Identifier, NodeType.MemberExpression])(node.callee)) return false;

  return isCreateElement(node.callee, context);
};

export const isCloneElement = isFromPragma("cloneElement");

export const isCloneElementCall = (
  node: TSESTree.CallExpression,
  context: RuleContext,
) => {
  if (!isOneOf([NodeType.Identifier, NodeType.MemberExpression])(node.callee)) return false;

  return isCloneElement(node.callee, context);
};
