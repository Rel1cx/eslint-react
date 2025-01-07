import { F } from "@eslint-react/eff";
import { zip } from "@eslint-react/types";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as T } from "@typescript-eslint/types";

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
    case a.type === T.Literal
      && b.type === T.Literal:
      return a.value === b.value;
    case a.type === T.TemplateElement
      && b.type === T.TemplateElement:
      return a.value.raw === b.value.raw;
    case a.type === T.TemplateLiteral
      && b.type === T.TemplateLiteral:
      if (a.quasis.length !== b.quasis.length || a.expressions.length !== b.expressions.length) {
        return false;
      }
      if (!zip(a.quasis, b.quasis).every(([a, b]) => isNodeEqual(a, b))) {
        return false;
      }
      if (!zip(a.expressions, b.expressions).every(([a, b]) => isNodeEqual(a, b))) {
        return false;
      }
      return true;
    case a.type === T.Identifier
      && b.type === T.Identifier:
      return a.name === b.name;
    case a.type === T.PrivateIdentifier
      && b.type === T.PrivateIdentifier:
      return a.name === b.name;
    case a.type === T.MemberExpression
      && b.type === T.MemberExpression:
      return isNodeEqual(a.property, b.property) && isNodeEqual(a.object, b.object);
    case a.type === T.JSXAttribute
      && b.type === T.JSXAttribute: {
      if (a.name.name !== b.name.name) {
        return false;
      }
      if (a.value === null || b.value === null) {
        return a.value === b.value;
      }
      return isNodeEqual(a.value, b.value);
    }
    case a.type === T.ThisExpression
      && b.type === T.ThisExpression:
      return true;
    default:
      return false;
  }
});
