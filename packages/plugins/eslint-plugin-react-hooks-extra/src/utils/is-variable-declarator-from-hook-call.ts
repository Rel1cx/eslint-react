import { isReactHookName } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isVariableDeclaratorFromHookCall(node: TSESTree.Node): node is
  & {
    id: TSESTree.Identifier;
    init:
      & {
        callee: TSESTree.Identifier | TSESTree.MemberExpression;
      }
      & TSESTree.CallExpression;
  }
  & TSESTree.VariableDeclarator
{
  if (node.type !== T.VariableDeclarator) return false;
  if (node.id.type !== T.Identifier) return false;
  if (node.init?.type !== T.CallExpression) return false;
  switch (node.init.callee.type) {
    case T.Identifier:
      return isReactHookName(node.init.callee.name);
    case T.MemberExpression:
      return node.init.callee.property.type === T.Identifier
        && isReactHookName(node.init.callee.property.name);
    default:
      return false;
  }
}
