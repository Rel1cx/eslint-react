import { dual } from "@eslint-react/eff";
import type { TSESTree } from "@typescript-eslint/types";
import { AST_NODE_TYPES as AST } from "@typescript-eslint/types";

import { getUnderlyingExpression } from "./expression-base";
import { isTypeExpression } from "./is";

/**
 * Check if two nodes are equal
 * @param a node to compare
 * @param b node to compare
 * @returns `true` if node equal
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts
 */
export const isNodeEqual: {
  (a: TSESTree.Node): (b: TSESTree.Node) => boolean;
  (a: TSESTree.Node, b: TSESTree.Node): boolean;
} = dual(2, (a: TSESTree.Node, b: TSESTree.Node): boolean => {
  a = isTypeExpression(a) ? getUnderlyingExpression(a) : a;
  b = isTypeExpression(b) ? getUnderlyingExpression(b) : b;
  switch (true) {
    case a === b:
      return true;
    case a.type !== b.type:
      return false;
    case a.type === AST.Literal
      && b.type === AST.Literal:
      return a.value === b.value;
    case a.type === AST.TemplateElement
      && b.type === AST.TemplateElement:
      return a.value.raw === b.value.raw;
    case a.type === AST.TemplateLiteral
      && b.type === AST.TemplateLiteral: {
      if (a.quasis.length !== b.quasis.length || a.expressions.length !== b.expressions.length) {
        return false;
      }
      let i = a.quasis.length;
      while (i--) {
        if (a.quasis[i]?.value.raw !== b.quasis[i]?.value.raw) {
          return false;
        }
      }
      i = a.expressions.length;
      while (i--) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const exprA = a.expressions[i]!;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const exprB = b.expressions[i]!;
        if (!isNodeEqual(exprA, exprB)) {
          return false;
        }
      }
      return true;
    }
    case a.type === AST.Identifier
      && b.type === AST.Identifier:
      return a.name === b.name;
    case a.type === AST.PrivateIdentifier
      && b.type === AST.PrivateIdentifier:
      return a.name === b.name;
    case a.type === AST.MemberExpression
      && b.type === AST.MemberExpression:
      return isNodeEqual(a.property, b.property) && isNodeEqual(a.object, b.object);
    case a.type === AST.JSXAttribute
      && b.type === AST.JSXAttribute: {
      if (a.name.name !== b.name.name) {
        return false;
      }
      if (a.value == null || b.value == null) {
        return a.value === b.value;
      }
      return isNodeEqual(a.value, b.value);
    }
    case a.type === AST.ThisExpression
      && b.type === AST.ThisExpression:
      return true;
    default:
      return false;
  }
});
