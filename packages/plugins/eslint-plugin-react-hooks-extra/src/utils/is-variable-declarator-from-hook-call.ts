import { NodeType } from "@eslint-react/ast";
import { isReactHookName } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";

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
  if (node.type !== NodeType.VariableDeclarator) return false;
  if (node.id.type !== NodeType.Identifier) return false;
  if (node.init?.type !== NodeType.CallExpression) return false;
  switch (node.init.callee.type) {
    case NodeType.Identifier:
      return isReactHookName(node.init.callee.name);
    case NodeType.MemberExpression:
      return node.init.callee.property.type === NodeType.Identifier
        && isReactHookName(node.init.callee.property.name);
    default:
      return false;
  }
}
