import * as core from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

function isInitFromHookCall(init: TSESTree.Expression | null) {
  if (init?.type !== AST.CallExpression) return false;
  switch (init.callee.type) {
    case AST.Identifier:
      return core.isHookName(init.callee.name);
    case AST.MemberExpression:
      return init.callee.property.type === AST.Identifier
        && core.isHookName(init.callee.property.name);
    default:
      return false;
  }
}

export function isVariableDeclaratorFromHookCall(node: TSESTree.Node): node is
  & TSESTree.VariableDeclarator
  & { init: TSESTree.VariableDeclarator["init"] & {} }
{
  if (node.type !== AST.VariableDeclarator) return false;
  if (node.id.type !== AST.Identifier) return false;
  return isInitFromHookCall(node.init);
}
