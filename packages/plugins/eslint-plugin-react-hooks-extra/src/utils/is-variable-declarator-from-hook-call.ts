import { isReactHookName } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

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
  if (node.type !== AST_NODE_TYPES.VariableDeclarator) return false;
  if (node.id.type !== AST_NODE_TYPES.Identifier) return false;
  if (node.init?.type !== AST_NODE_TYPES.CallExpression) return false;
  switch (node.init.callee.type) {
    case AST_NODE_TYPES.Identifier:
      return isReactHookName(node.init.callee.name);
    case AST_NODE_TYPES.MemberExpression:
      return node.init.callee.property.type === AST_NODE_TYPES.Identifier
        && isReactHookName(node.init.callee.property.name);
    default:
      return false;
  }
}
