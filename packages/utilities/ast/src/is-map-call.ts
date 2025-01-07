import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

export function isMapCallLoose(node: TSESTree.Node): node is TSESTree.CallExpression {
  if (node.type !== T.CallExpression) {
    return false;
  }
  if (node.callee.type !== T.MemberExpression) {
    return false;
  }
  if (node.callee.property.type !== T.Identifier) {
    return false;
  }
  const { name } = node.callee.property;
  return name === "map" || name.endsWith("Map");
}
