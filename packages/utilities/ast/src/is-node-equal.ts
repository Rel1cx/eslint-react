import { F, zip } from "@eslint-react/tools";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES } from "@typescript-eslint/types";

/**
 * Determines whether node equals to another node
 * @param a node to compare
 * @param b node to compare
 * @returns `true` if node equal
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts
 */
export const isNodeEqual: {
  (a: TSESTree.Node): (b: TSESTree.Node) => boolean;
  (a: TSESTree.Node, b: TSESTree.Node): boolean;
} = F.dual(2, (a: TSESTree.Node, b: TSESTree.Node): boolean => {
  if (a.type !== b.type) return false;
  if (a.type === AST_NODE_TYPES.ThisExpression && b.type === AST_NODE_TYPES.ThisExpression) return true;
  if (a.type === AST_NODE_TYPES.Literal && b.type === AST_NODE_TYPES.Literal) return a.value === b.value;
  if (a.type === AST_NODE_TYPES.TemplateElement && b.type === AST_NODE_TYPES.TemplateElement) {
    return a.value.raw === b.value.raw;
  }
  if (a.type === AST_NODE_TYPES.TemplateLiteral && b.type === AST_NODE_TYPES.TemplateLiteral) {
    if (a.quasis.length !== b.quasis.length || a.expressions.length !== b.expressions.length) return false;
    if (!zip(a.quasis, b.quasis).every(([a, b]) => isNodeEqual(a, b))) return false;
    if (!zip(a.expressions, b.expressions).every(([a, b]) => isNodeEqual(a, b))) return false;
    return true;
  }
  if (a.type === AST_NODE_TYPES.Identifier && b.type === AST_NODE_TYPES.Identifier) return a.name === b.name;
  if (a.type === AST_NODE_TYPES.PrivateIdentifier && b.type === AST_NODE_TYPES.PrivateIdentifier) {
    return a.name === b.name;
  }
  if (a.type === AST_NODE_TYPES.MemberExpression && b.type === AST_NODE_TYPES.MemberExpression) {
    return isNodeEqual(a.property, b.property) && isNodeEqual(a.object, b.object);
  }
  return false;
});
