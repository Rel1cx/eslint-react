import { F } from "@eslint-react/eff";
import { zip } from "@eslint-react/types";
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
  switch (true) {
    case a === b:
      return true;
    case a.type !== b.type:
      return false;
    case a.type === AST_NODE_TYPES.Literal
      && b.type === AST_NODE_TYPES.Literal:
      return a.value === b.value;
    case a.type === AST_NODE_TYPES.TemplateElement
      && b.type === AST_NODE_TYPES.TemplateElement:
      return a.value.raw === b.value.raw;
    case a.type === AST_NODE_TYPES.TemplateLiteral
      && b.type === AST_NODE_TYPES.TemplateLiteral:
      if (a.quasis.length !== b.quasis.length || a.expressions.length !== b.expressions.length) return false;
      if (!zip(a.quasis, b.quasis).every(([a, b]) => isNodeEqual(a, b))) return false;
      if (!zip(a.expressions, b.expressions).every(([a, b]) => isNodeEqual(a, b))) return false;
      return true;
    case a.type === AST_NODE_TYPES.Identifier
      && b.type === AST_NODE_TYPES.Identifier:
      return a.name === b.name;
    case a.type === AST_NODE_TYPES.PrivateIdentifier
      && b.type === AST_NODE_TYPES.PrivateIdentifier:
      return a.name === b.name;
    case a.type === AST_NODE_TYPES.MemberExpression
      && b.type === AST_NODE_TYPES.MemberExpression:
      return isNodeEqual(a.property, b.property) && isNodeEqual(a.object, b.object);
    case a.type === AST_NODE_TYPES.JSXAttribute
      && b.type === AST_NODE_TYPES.JSXAttribute: {
      if (a.name.name !== b.name.name) return false;
      if (a.value === null || b.value === null) return a.value === b.value;
      return isNodeEqual(a.value, b.value);
    }
    case a.type === AST_NODE_TYPES.ThisExpression
      && b.type === AST_NODE_TYPES.ThisExpression:
      return true;
    default:
      return false;
  }
});
