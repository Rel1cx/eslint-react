import { dual } from "@local/eff";
import { AST_NODE_TYPES as AST, type TSESTree } from "@typescript-eslint/types";

import * as Check from "./check";
import * as Extract from "./extract";

/**
 * Check if two nodes are equal
 * @param a node to compare
 * @param b node to compare
 * @returns `true` if node equal
 * @see https://github.com/typescript-eslint/typescript-eslint/blob/main/packages/eslint-plugin/src/util/isNodeEqual.ts
 */
export const areEqual: {
  (a: TSESTree.Node): (b: TSESTree.Node) => boolean;
  (a: TSESTree.Node, b: TSESTree.Node): boolean;
} = dual(2, (a: TSESTree.Node, b: TSESTree.Node): boolean => {
  a = Check.isTypeExpression(a) ? Extract.unwrapped(a) : a;
  b = Check.isTypeExpression(b) ? Extract.unwrapped(b) : b;
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
        const exprA = a.expressions[i]!;
        const exprB = b.expressions[i]!;
        if (!areEqual(exprA, exprB)) {
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
      return areEqual(a.property, b.property)
        && areEqual(a.object, b.object);
    case a.type === AST.JSXIdentifier
      && b.type === AST.JSXIdentifier:
      return a.name === b.name;
    case a.type === AST.JSXNamespacedName
      && b.type === AST.JSXNamespacedName:
      return areEqual(a.namespace, b.namespace)
        && areEqual(a.name, b.name);
    case a.type === AST.JSXMemberExpression
      && b.type === AST.JSXMemberExpression:
      return areEqual(a.object, b.object)
        && areEqual(a.property, b.property);
    case a.type === AST.JSXAttribute
      && b.type === AST.JSXAttribute: {
      if (!areEqual(a.name, b.name)) {
        return false;
      }
      if (a.value == null || b.value == null) {
        return a.value === b.value;
      }
      return areEqual(a.value, b.value);
    }
    case a.type === AST.ThisExpression
      && b.type === AST.ThisExpression:
      return true;
    default:
      return false;
  }
});
