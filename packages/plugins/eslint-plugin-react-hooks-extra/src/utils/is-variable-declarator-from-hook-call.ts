import { isHookName } from "@eslint-react/core";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

function isInitFromHookCall(init: TSESTree.Expression | null) {
  if (init?.type !== T.CallExpression) return false;
  switch (init.callee.type) {
    case T.Identifier:
      return isHookName(init.callee.name);
    case T.MemberExpression:
      return init.callee.property.type === T.Identifier
        && isHookName(init.callee.property.name);
    default:
      return false;
  }
}

export function isVariableDeclaratorFromHookCall(node: TSESTree.Node): node is
  & TSESTree.VariableDeclarator
  & { init: TSESTree.VariableDeclarator["init"] & {} }
{
  if (node.type !== T.VariableDeclarator) return false;
  if (node.id.type !== T.Identifier) return false;
  return isInitFromHookCall(node.init);
}
